import {
  resetLinePreview,
  $selectedState,
  setSelectedState,
  $widgetState,
  setWidgetState,
} from "../index";

export const handleRightClick =
  (): // event: React.MouseEvent<SVGSVGElement, globalThis.MouseEvent>
  void => {
    const { mode } = $selectedState.getState();
    const { show } = $widgetState.getState();
    setSelectedState({ mode: "deselected" });
    resetLinePreview();
    if (mode === "deselected") {
      setWidgetState({
        show: show === "none" ? "tool" : "none",
      });
    }
  };
export default handleRightClick;
