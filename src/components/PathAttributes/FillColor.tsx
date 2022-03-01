import React from "react";
import { useStore } from "effector-react";
import { $store, updatePathProps } from "../../index";

interface Props {
  pathIndex: number;
}
const FillColor = ({ pathIndex }: Props): JSX.Element => {
  const store = useStore($store);
  console.log(pathIndex);
  // const { color } = store.paths[pathIndex].attr.fill;
  return (
    <div>
      <label>
        FillColor:
        <input
          // defaultValue="transparent"
          onChange={(e) => {
            updatePathProps({ pathIndex, fill: e.target.value });
          }}
        />
      </label>
      <div
        style={{
          backgroundColor:
            store.paths[pathIndex].attr.fill !== undefined
              ? store.paths[pathIndex].attr.fill
              : "transparent",
          width: "25px",
          height: "25px",
        }}
      />
    </div>
  );
};
export default FillColor;
