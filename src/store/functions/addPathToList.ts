import { Path } from "../../index";

export const addPathToList = (paths: Path[]): Path[] => {
  return [
    ...paths,
    {
      pathIndex:
        Math.max(
          -1,
          Math.max(
            ...paths.map(({ pathIndex }) => {
              return pathIndex;
            })
          )
        ) + 1,
      position: { current: { x: 0, y: 0 }, previous: { x: 0, y: 0 } },
      data: "",
      previewData: "",
      lines: [],
      markers: {
        start: { show: true },
        mid: { show: true },
        end: { show: true },
      },
      attr: {
        strokeWidth: "1px",
        stroke: "#00ff",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: "transparent",
      },
    },
  ];
};

export default addPathToList;
