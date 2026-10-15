"""
Cut out subjects drawn on a flat background (AI prompt packs ask for "plain flat cream background").
Flood-fills the background from the image border; dark ink outlines stop the fill, so white coats survive.
  python -P scripts/cutout.py <src dir> <dst dir> <threshold, e.g. 38> <file.png> [...]
Writes trimmed transparent PNGs. (rembg needs a GitHub model download that is blocked here.)
Add "+holes" to a file name (e.g. t-07-excavator-canal.png+holes) to also clear background patches
enclosed by the drawing (inside an excavator arm). Only for files that need it: big white areas of
the subject (shirts, sails) would go too.
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageChops
src, dst, thresh = Path(sys.argv[1]), Path(sys.argv[2]), int(sys.argv[3])
dst.mkdir(parents=True, exist_ok=True)
KEY = (255, 0, 255)
for arg in sys.argv[4:]:
    name, holes = arg.removesuffix("+holes"), arg.endswith("+holes")
    im = Image.open(src / name).convert("RGB")
    w, h = im.size
    work = im.copy()
    seeds = [(x, y) for x in range(0, w, 40) for y in (0, h - 1)] + [(x, y) for y in range(0, h, 40) for x in (0, w - 1)]
    for s in seeds:
        if work.getpixel(s) != KEY:
            ImageDraw.floodfill(work, s, KEY, thresh=thresh)
    if holes:
        # flood from every remaining pixel that still looks like the background colour
        bgc = im.getpixel((0, 0))
        px = work.load()
        for y in range(0, h, 6):
            for x in range(0, w, 6):
                c = px[x, y]
                if c != KEY and sum(abs(c[i] - bgc[i]) for i in range(3)) < thresh // 2:
                    ImageDraw.floodfill(work, (x, y), KEY, thresh=thresh // 2)
    r, g, b = work.split()
    bg = ImageChops.multiply(ImageChops.multiply(r.point(lambda v: 255 if v == 255 else 0), g.point(lambda v: 255 if v == 0 else 0)), b.point(lambda v: 255 if v == 255 else 0))
    alpha = ImageChops.invert(bg).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
    out = im.convert("RGBA")
    out.putalpha(alpha)
    out = out.crop(alpha.point(lambda v: 255 if v > 20 else 0).getbbox())
    out.save(dst / name)
    print(name, out.size)
