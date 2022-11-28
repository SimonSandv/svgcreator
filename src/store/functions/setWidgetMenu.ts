import type { WidgetMenuState } from "types";

const setWidgetMenu = (
  widgetMenu: WidgetMenuState,
  show?: "none" | "tool"
): WidgetMenuState => {
  return {
    show: show !== undefined ? show : widgetMenu.show,
  };
};

export default setWidgetMenu;
