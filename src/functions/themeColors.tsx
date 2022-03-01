import convert from "color-convert";
import { $themeState } from "../store/themeState";

const themeColors = (): void => {
  const themeState = $themeState.getState();
  const { themeIndex, themes } = themeState;
  type HSL = ReturnType<typeof convert.hex.hsl>;
  const HSLArray: HSL[] = [];
  for (let i = 0; i < themes[themeIndex].length; i += 1) {
    const hsl = convert.hex.hsl(themes[themeIndex][i]);
    HSLArray.push(hsl);
  }

  const root = document.documentElement.style;

  for (let i = 0; i < HSLArray.length; i += 1) {
    root.setProperty(`--color${i}H`, ` ${HSLArray[i][0]}deg`);
    root.setProperty(`--color${i}S`, ` ${HSLArray[i][1]}%`);
    root.setProperty(`--color${i}L`, ` ${HSLArray[i][2]}%`);
    root.setProperty(
      `--color${i}`,
      ` hsl(var(--color${i}H), var(--color${i}S), var(--color${i}L)`
    );
  }
};

export default themeColors;
