import { Composition, Folder } from "remotion";
import { PVR } from "./series/pvr/theme";
import { ISingapore, iSingaporeDuration } from "../Map/i-singapore/Video";
import { P1BruneiChiaDoi, p1BruneiChiaDoiDuration } from "../Map/p1-brunei-chia-doi/Video";
import { P2DuongSatCaoToc, p2DuongSatCaoTocDuration } from "../Map/p2-duong-sat-cao-toc/Video";
import { P3DbsclSutLun, p3DbsclSutLunDuration } from "../Map/p3-dbscl-sut-lun/Video";
import { P4MalaccaKra, p4MalaccaKraDuration } from "../Map/p4-malacca-kra/Video";
import { P5TrungQuocMuiGio, p5TrungQuocMuiGioDuration } from "../Map/p5-trung-quoc-mui-gio/Video";
import { Cover, COVERS } from "../Map/covers";

/** Every episode is 1080×1920 @ 30 fps; its length comes from the voiceover timing. New episode: add one <Composition> here + one entry in Map/covers.tsx. */
const EPISODES = [
  { id: "Map-Singapore", component: ISingapore, duration: iSingaporeDuration },
  { id: "Map-P1-BruneiChiaDoi", component: P1BruneiChiaDoi, duration: p1BruneiChiaDoiDuration },
  { id: "Map-P2-DuongSatCaoToc", component: P2DuongSatCaoToc, duration: p2DuongSatCaoTocDuration },
  { id: "Map-P3-DbsclSutLun", component: P3DbsclSutLun, duration: p3DbsclSutLunDuration },
  { id: "Map-P4-MalaccaKra", component: P4MalaccaKra, duration: p4MalaccaKraDuration },
  { id: "Map-P5-TrungQuocMuiGio", component: P5TrungQuocMuiGio, duration: p5TrungQuocMuiGioDuration },
];

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="Episodes">
      {EPISODES.map((e) => (
        <Composition key={e.id} id={e.id} component={e.component} width={PVR.width} height={PVR.height} fps={PVR.fps}
          durationInFrames={e.duration(PVR.fps)} />
      ))}
    </Folder>
    <Folder name="Covers">
      {COVERS.map((spec) => (
        <Composition key={spec.slug} id={`Cover-${spec.slug}`} component={Cover} defaultProps={{ slug: spec.slug }}
          width={PVR.width} height={PVR.height} fps={PVR.fps} durationInFrames={1} />
      ))}
    </Folder>
  </>
);
