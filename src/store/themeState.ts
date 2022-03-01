import { createEvent, createStore } from "effector";
import { RecursivePartial } from "../util/utilityTypes";
import { removeUndefined } from "../util/utilityFunctions";

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

export const setThemeState = createEvent<RecursivePartial<ThemeState>>();
export const $themeState = createStore<ThemeState>({
  themeIndex: 0,
  themes: [["#232426", "#363E40", "#666D73", "#949FA6", "#F2F2F2"]],
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
  });
