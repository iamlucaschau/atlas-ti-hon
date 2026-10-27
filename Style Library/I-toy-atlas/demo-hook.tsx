/**
 * Kit demo (Lucas 2026-10-27, group A of the project review): the new opening of an episode, on the first 5 s of
 * p3-dien-tich-viet-nam. Frame 0 is the wide loop frame; from frame 1 the camera glides into Germany with a low `lift`
 * (no flash of the whole world); a `HookTitle` (3–5 words) carries the first ~3 s and the karaoke subtitles start only
 * after it. Not an episode: no audio.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p3-dien-tich-viet-nam.timing.json";
import words from "../../src/voiceover/p3-dien-tich-viet-nam.words.json";
import { KaraokeSubs } from "../subs";
import { ATLAS, Atlas, AtlasSub, beats, camAt, CountryTag, type GeoCam, HookTitle, Signature, VnIslands } from "./toy-atlas";

const FPS = 30;
const { at } = beats(timing, FPS);
const HOOK_OUT = at("01", 0.95);
const VN = "#DA251D";

const KEYS: GeoCam[] = [
  { at: 0, lon: 62, lat: 46, zoom: 2.5 },
  // opening flight: a straight glide (lift 0.25) instead of the default "plane" climb to a world view
  { at: 1, lon: 10.4, lat: 51.2, zoom: 7, lift: 0.25 },
];

export const KitHookDemo: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, 0.04, 0.08);
  return (
    <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
      <Atlas cam={cam} f={f} fills={[{ name: "Vietnam", color: VN }, { name: "Paracel Is.", color: VN }, { name: "Spratly Is.", color: VN },
        { name: "Germany", color: "#F2B53A" }]} />
      <VnIslands cam={cam} f={f} color={VN} />
      <CountryTag cam={cam} f={f} name="Germany" label="ĐỨC" flag="germany" anchor={[10.4, 52.6]} from={HOOK_OUT} glow={[HOOK_OUT]} />
      <HookTitle setup="TRÊN BẢN ĐỒ" punch="ĐỨC ×2,5" f={f} out={HOOK_OUT} />
      <Signature f={f} cuts={[1]} end={150} spots={[2]} />
      <KaraokeSubs timing={timing} words={words} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} from={HOOK_OUT} />
    </AbsoluteFill>
  );
};
