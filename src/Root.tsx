import { Composition, Folder } from "remotion";
import { PVR } from "./series/pvr/theme";
import { ISingapore, iSingaporeDuration } from "../Map/i-singapore/Video";
import { P1BruneiChiaDoi, p1BruneiChiaDoiDuration } from "../Map/p1-brunei-chia-doi/Video";
import { P2DuongSatCaoToc, p2DuongSatCaoTocDuration } from "../Map/p2-duong-sat-cao-toc/Video";
import { P2CatMienTay, p2CatMienTayDuration } from "../Map/p2-cat-mien-tay/Video";
import { P2FunanTecho, p2FunanTechoDuration } from "../Map/p2-funan-techo/Video";
import { P3DbsclSutLun, p3DbsclSutLunDuration } from "../Map/p3-dbscl-sut-lun/Video";
import { P4MalaccaKra, p4MalaccaKraDuration } from "../Map/p4-malacca-kra/Video";
import { P5TrungQuocMuiGio, p5TrungQuocMuiGioDuration } from "../Map/p5-trung-quoc-mui-gio/Video";
import { P1TayNguyenCoBien, p1TayNguyenCoBienDuration } from "../Map/p1-tay-nguyen-co-bien/Video";
import { P3BachMa, p3BachMaDuration } from "../Map/p3-bach-ma/Video";
import { P2LongThanh, p2LongThanhDuration } from "../Map/p2-long-thanh/Video";
import { P2DienHatNhan, p2DienHatNhanDuration } from "../Map/p2-dien-hat-nhan/Video";
import { P4DuongBayCong, p4DuongBayCongDuration } from "../Map/p4-duong-bay-cong/Video";
import { P5ChoHepNhat, p5ChoHepNhatDuration } from "../Map/p5-cho-hep-nhat/Video";
import { P4LaoRaBien, p4LaoRaBienDuration } from "../Map/p4-lao-ra-bien/Video";
import { P5TphcmBaTheGioi, p5TphcmBaTheGioiDuration } from "../Map/p5-tphcm-ba-the-gioi/Video";
import { P1PhuQuocBrevie, p1PhuQuocBrevieDuration } from "../Map/p1-phu-quoc-brevie/Video";
import { P2BacNinhXuatKhau, p2BacNinhXuatKhauDuration } from "../Map/p2-bac-ninh-xuat-khau/Video";
import { P4MekongVoiNuoc, p4MekongVoiNuocDuration } from "../Map/p4-mekong-voi-nuoc/Video";
import { P2EvnGiaDien, p2EvnGiaDienDuration } from "../Map/p2-evn-gia-dien/Video";
import { P2MetVuongBacTy, p2MetVuongBacTyDuration } from "../Map/p2-met-vuong-bac-ty/Video";
import { P1ThuySiLinhThue, p1ThuySiLinhThueDuration } from "../Map/p1-thuy-si-linh-thue/Video";
import { P5SonDoong, p5SonDoongDuration } from "../Map/p5-son-doong/Video";
import { P3DienTichVietNam, p3DienTichVietNamDuration } from "../Map/p3-dien-tich-viet-nam/Video";
import { Cover, COVERS } from "../Map/covers";
import { KitFaceDemo } from "../Style Library/I-toy-atlas/demo-faces";
import { KitHookDemo } from "../Style Library/I-toy-atlas/demo-hook";

/** Every episode is 1080×1920 @ 30 fps; its length comes from the voiceover timing. New episode: add one <Composition> here + one entry in Map/covers.tsx. */
const EPISODES = [
  { id: "Map-Singapore", component: ISingapore, duration: iSingaporeDuration },
  { id: "Map-P1-BruneiChiaDoi", component: P1BruneiChiaDoi, duration: p1BruneiChiaDoiDuration },
  { id: "Map-P2-DuongSatCaoToc", component: P2DuongSatCaoToc, duration: p2DuongSatCaoTocDuration },
  { id: "Map-P2-CatMienTay", component: P2CatMienTay, duration: p2CatMienTayDuration },
  { id: "Map-P2-FunanTecho", component: P2FunanTecho, duration: p2FunanTechoDuration },
  { id: "Map-P3-DbsclSutLun", component: P3DbsclSutLun, duration: p3DbsclSutLunDuration },
  { id: "Map-P4-MalaccaKra", component: P4MalaccaKra, duration: p4MalaccaKraDuration },
  { id: "Map-P5-TrungQuocMuiGio", component: P5TrungQuocMuiGio, duration: p5TrungQuocMuiGioDuration },
  { id: "Map-P1-TayNguyenCoBien", component: P1TayNguyenCoBien, duration: p1TayNguyenCoBienDuration },
  { id: "Map-P3-BachMa", component: P3BachMa, duration: p3BachMaDuration },
  { id: "Map-P2-LongThanh", component: P2LongThanh, duration: p2LongThanhDuration },
  { id: "Map-P2-DienHatNhan", component: P2DienHatNhan, duration: p2DienHatNhanDuration },
  { id: "Map-P4-DuongBayCong", component: P4DuongBayCong, duration: p4DuongBayCongDuration },
  { id: "Map-P5-ChoHepNhat", component: P5ChoHepNhat, duration: p5ChoHepNhatDuration },
  { id: "Map-P4-LaoRaBien", component: P4LaoRaBien, duration: p4LaoRaBienDuration },
  { id: "Map-P5-TphcmBaTheGioi", component: P5TphcmBaTheGioi, duration: p5TphcmBaTheGioiDuration },
  { id: "Map-P1-PhuQuocBrevie", component: P1PhuQuocBrevie, duration: p1PhuQuocBrevieDuration },
  { id: "Map-P2-BacNinhXuatKhau", component: P2BacNinhXuatKhau, duration: p2BacNinhXuatKhauDuration },
  { id: "Map-P4-MekongVoiNuoc", component: P4MekongVoiNuoc, duration: p4MekongVoiNuocDuration },
  { id: "Map-P2-EvnGiaDien", component: P2EvnGiaDien, duration: p2EvnGiaDienDuration },
  { id: "Map-P2-MetVuongBacTy", component: P2MetVuongBacTy, duration: p2MetVuongBacTyDuration },
  { id: "Map-P1-ThuySiLinhThue", component: P1ThuySiLinhThue, duration: p1ThuySiLinhThueDuration },
  { id: "Map-P5-SonDoong", component: P5SonDoong, duration: p5SonDoongDuration },
  { id: "Map-P3-DienTichVietNam", component: P3DienTichVietNam, duration: p3DienTichVietNamDuration },
];

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="Episodes">
      {EPISODES.map((e) => (
        <Composition key={e.id} id={e.id} component={e.component} width={PVR.width} height={PVR.height} fps={PVR.fps}
          durationInFrames={e.duration(PVR.fps)} />
      ))}
    </Folder>
    <Folder name="Kit">
      <Composition id="Kit-MapFace" component={KitFaceDemo} width={PVR.width} height={PVR.height} fps={PVR.fps} durationInFrames={360} />
      <Composition id="Kit-HookOpen" component={KitHookDemo} width={PVR.width} height={PVR.height} fps={PVR.fps} durationInFrames={150} />
    </Folder>
    <Folder name="Covers">
      {COVERS.map((spec) => (
        <Composition key={spec.slug} id={`Cover-${spec.slug}`} component={Cover} defaultProps={{ slug: spec.slug }}
          width={PVR.width} height={PVR.height} fps={PVR.fps} durationInFrames={1} />
      ))}
    </Folder>
  </>
);
