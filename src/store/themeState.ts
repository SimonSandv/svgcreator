import { createEvent, createStore } from "effector";
import { RecursivePartial } from "../util/utilityTypes";
import { removeUndefined } from "../util/utilityFunctions";

console.log("initializing themeState!");

export type ThemeState = {
  themeIndex: number;
  themes: string[][];
};

export const setCurrentTheme = (
  themeState: ThemeState,
  themeIndex: number
): ThemeState => {
  return {
    ...themeState,
    themeIndex,
  };
};

export const addThemeToArray = (
  themeState: ThemeState,
  theme: string[]
): ThemeState => {
  const { themes } = themeState;
  themes.push(theme);
  return { ...themeState, themes };
};

export interface ChangeTheme {
  themeIndex: number;
}
export const changeTheme = createEvent<ChangeTheme>();

export interface AddTheme {
  theme: string[];
}
export const addTheme = createEvent<AddTheme>();
export const nextTheme = createEvent();
export const setThemeState = createEvent<RecursivePartial<ThemeState>>();
export const $themeState = createStore<ThemeState>({
  themeIndex: 0,
  themes: [
    ["#485461", "#28313b", "#11171F", "#587599", "#98E191"],
    ["#232426", "#363E40", "#666D73", "#949FA6", "#F2F2F2"],
    ["#ECF0F3", "#FFFFFF", "#355c7d", "#7ED1F2", "#292D32"],
    ["#395BBF", "#0339A6", "#7ED1F2", "#F2E205", "#F24444"],
    ["#0D0D0D", "#262626", "#595959", "#A6A6A6", "#F2F2F2"],
    ["#f8b195", "#f67280", "#c06c84", "#6c5b7b", "#355c7d"],
    ["#1D2526", "#333E40", "#F2E2C4", "#A69076", "#D9BD9C"],
    ["#2D0140", "#F2E205", "#F2CB05", "#F2A30F", "#D99E6A"],
    ["#0A3B59", "#1E4959", "#F2A663", "#F2BF91", "#D97E6A"],
    ["#2B308C", "#3DC9D9", "#F2DA63", "#F28157", "#BF4136"],
    ["#260119", "#591D4F", "#D9D052", "#BFAB49", "#F2E2C4"],
    ["#F23D91", "#49F2E1", "#84D904", "#84BF04", "#F2D8C9"],
    ["#183B59", "#9BBF63", "#F2CA52", "#F2AA6B", "#8C4D3F"],
    ["#071526", "#F2B950", "#F2A74B", "#BF9663", "#F25244"],
  ],
})
  .on(setThemeState, (state, payload) => {
    return { ...state, ...removeUndefined(payload) };
  })
  .on(addTheme, (state, { theme }) => {
    return {
      ...state,
      theme: addThemeToArray(state, theme),
    };
  })
  .on(changeTheme, (state, { themeIndex }) => {
    return {
      ...state,
      theme: setCurrentTheme(state, themeIndex),
    };
  })
  .on(nextTheme, (state) => {
    return {
      ...state,
      themeIndex:
        state.themeIndex < state.themes.length - 2 ? state.themeIndex + 1 : 0,
    };
  });
