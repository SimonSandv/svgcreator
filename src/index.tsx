/* eslint-disable max-len */

// UTILS
export { numOnly, getColorShades } from "./util/utilityFunctions";
export { range } from "./util/mathUtils";

// FUNCTIONS
export { default as handleAddPath } from "./functions/handleAddPath";
export { default as handleAddLine } from "./functions/handleAddLine";
export { default as handleSelect } from "./functions/handleSelect";
export { default as handleInput } from "./functions/handleInput";
export { default as handleMouseMove } from "./functions/handleMouseMove";
export { default as handleLeftClick } from "./functions/handleLeftClick";
export { default as handleRightClick } from "./functions/handleRightClick";
export { default as handleToolChange } from "./functions/handleToolChange";
export { default as handlePointDrag } from "./functions/handlePointDrag";
export { default as calculateControlPoints } from "./functions/calculateControlPoints";

export { default as line } from "./functions/line";
export { default as move } from "./functions/move";
export { default as hline } from "./functions/hline";
export { default as vline } from "./functions/vline";
export { default as curve } from "./functions/curve";
export { default as scurve } from "./functions/scurve";
export { default as quad } from "./functions/quad";
export { default as squad } from "./functions/squad";
export { default as arc } from "./functions/arc";

// COMPONENTS
export { default as ToolButtons } from "./components/ToolButtons";
export { default as Editor } from "./components/Editor";
export { default as ViewBoxInput } from "./components/ViewBox";
export { default as PathAttributes } from "./components/PathAttributes";
export { default as LineElements } from "./components/LineElements";
export { default as LineToolSelect } from "./components/LineToolSelect";
export { default as LineInputs } from "./components/LineInputs";
export { default as PointIndicators } from "./components/Cursor";
export { default as Grid } from "./components/Grid";
export { default as LineCapSelector } from "./components/LineCapSelector";
export { default as LineJoinSelector } from "./components/LineJoinSelector";
export { default as IndicatorSelector } from "./components/CursorSelector";
export { default as StrokeWidth } from "./components/PathAttributes/StrokeWidth";
export { default as StrokeColor } from "./components/PathAttributes/StrokeColor";
export { default as FillColor } from "./components/PathAttributes/FillColor";
export { default as Preview } from "./components/Preview";
export { default as Info } from "./components/Info";
export { default as RelToggle } from "./components/RelToggle";
export { default as EndPos } from "./components/SelectorPoints/EndPos";
export { default as StartControl } from "./components/SelectorPoints/StartControl";
export { default as EndControl } from "./components/SelectorPoints/EndControl";
export { default as Arc } from "./components/SelectorPoints/Arc";
export { default as RenderGuides } from "./components/SelectorPoints/RenderGuides";
export { default as ParamGrid } from "./components/ParamGrid";
export { default as Output } from "./components/Output";
export { default as WidgetMenu } from "./components/WidgetMenu";
export { default as MousePosition } from "./components/MousePosition";
export { default as InfoBlock } from "./components/InfoBlock";
export { default as TestBlock } from "./components/TestBlock";
export { default as ToolInfo } from "./components/ToolInfo";
export { default as BottomMenu } from "./components/BottomMenu";
export { default as TopMenu } from "./components/TopMenu";
export { default as LeftMenu } from "./components/LeftMenu";
export { default as RightMenu } from "./components/RightMenu";
export { default as Layers } from "./components/Layers";
export { default as MenuCard } from "./components/MenuCard";
export { default as SelectedInfo } from "./components/SelectedInfo";
export { default as RemoveUndef } from "./components/RemoveUndef";
export { default as ColorTest } from "./components/ColorTest";
export { default as ColorSelector } from "./components/ColorSelector/ColorSelector";

export { default as eventBinder } from "./functions/eventBinder";

export { default as Test } from "./components/Test";

export { toolArray } from "./store/toolArray";

// STORE
export { $selectedState, setSelectedState } from "./store/selectedState";
export { $viewBoxState, setViewBoxState } from "./store/viewBoxState";
export { $guideState, setGuideState } from "./store/guideState";
export { $widgetState, setWidgetState } from "./store/widgetState";
export { $toolState, setToolState, updateTool } from "./store/toolState";
export { $wheelState, setWheelState } from "./store/wheelState";
export {
  $colorState,
  setSelectedColor,
  setColor,
  addColor,
} from "./store/colorState";
export {
  $themeState,
  nextTheme,
  changeTheme,
  addTheme,
} from "./store/themeState";
export {
  $cursorState,
  setCursorState,
  setHover,
  toggleSnap,
} from "./store/cursorState";
export { $mousePos, setMousePos } from "./store/mousePos";
export {
  $debugState,
  setDebugState,
  updateDebugPoint,
} from "./store/debugState";
export {
  $store,
  addLine,
  updateInput,
  updateInputArray,
  updateNumberOfInputs,
  updateLineTool,
  updateLineComplete,
  loadPathData,
  updateRel,
  updateMousePos,
  toggleActive,
  updatePosition,
  updatePreviewStage,
  updateLineParam,
  updateLineData,
  updatePathAttribute,
  updatePathProps,
  resetLinePreview,
} from "./store/store";

// TYPES
export type { Store } from "./store/store";
export type {
  Path,
  Line,
  Coord,
  Tool,
  ToolArray,
  Position,
  LineCap,
  LineJoin,
  Shape,
  Cursor,
  InputArray,
  Selected,
  Param,
  CoordSet,
  DebugPoint,
  Guides,
  WidgetMenuState,
  WidgetButton,
} from "./store/typeDeclarations";

// STORE ACTIONS
export { default as addLineToPath } from "./store/functions/addLineToPath";
export { default as addPathToList } from "./store/functions/addPathToList";
export { default as setRel } from "./store/functions/setRel";
export { default as joinPathData } from "./store/functions/joinPathData";
export { default as removeLineFromPath } from "./store/functions/removeLineFromPath";
export { default as removePathFromList } from "./store/functions/removePathFromList";
export { default as setLineInput } from "./store/functions/setLineInput";
export { default as setLineInputArray } from "./store/functions/setLineInputArray";
export { default as setLineTool } from "./store/functions/setLineTool";
export { default as setLineComplete } from "./store/functions/setLineComplete";
export { default as setNumberOfInputs } from "./store/functions/setNumberOfInputs";
export { default as setLineData } from "./store/functions/setLineData";
export { default as setPathData } from "./store/functions/setPathData";
export { default as setPosition } from "./store/functions/setPosition";
export { default as setPreviewStage } from "./store/functions/setPreviewStage";
export { default as setTool } from "./store/functions/setTool";
export { default as setLineParam } from "./store/functions/setLineParam";
export { default as setLinePreview } from "./store/functions/setLinePreview";
export { default as setWidgetMenu } from "./store/functions/setWidgetMenu";
export { default as setPathProps } from "./store/functions/setPathProps";
