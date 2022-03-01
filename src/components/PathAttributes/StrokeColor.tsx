import React from "react";
import { useStore } from "effector-react";
import { $store, updatePathAttribute, updatePathProps } from "../../index";
import { Stroke } from "../../store/typeDeclarations";

interface props {
  pathIndex: number;
}
const StrokeColor = ({ pathIndex }: props): JSX.Element => {
  const store = useStore($store);
  return (
    <div>
      <label>
        StrokeColor:
        <input
          defaultValue="#00ff"
          onChange={(e) => {
            updatePathProps({ pathIndex, stroke: e.target.value });
            /* updatePathAttribute({
              pathIndex,
              strokeColor: e.target.value.toString(),
            }); */
          }}
        />
      </label>
      <div
        style={{
          backgroundColor: store.paths[pathIndex].attr.stroke,
          width: "25px",
          height: "25px",
        }}
      />
    </div>
  );
};
export default StrokeColor;
