import { css } from "@emotion/react";
import { getColorShades } from "../util/utilityFunctions";

/* export const gradient1 = css`
  background-color: #485461;
  background-image: linear-gradient(315deg, #485461 0%, #28313b 74%);
  background-attachment: fixed;
`;

export const gradient4 = css`
  background-image: linear-gradient(0deg, #253855 20%, #224669 100%);
  background-attachment: fixed;
`; */
const root = document.documentElement;
root.style.setProperty(
  "grad1",
  "linear-gradient(315deg, var(--color1D1) 0%, --color3L1 74%);"
);

export const gradientFrame = css`
  background: linear-gradient(to bottom, var(--color1), var(--color2))
  background-attachment: fixed;
`;

export const shadow1 = css`
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

export const shadow2 = css`
  box-shadow: 1.3px 1.1px 6.9px rgba(0, 0, 0, 0.08),
    2.8px 2.5px 7.4px rgba(0, 0, 0, 0.077),
    4.7px 4.2px 7.8px rgba(0, 0, 0, 0.073),
    7.1px 6.3px 8.5px rgba(0, 0, 0, 0.069),
    10.3px 9.1px 10.2px rgba(0, 0, 0, 0.065),
    14.5px 12.9px 13.1px rgba(0, 0, 0, 0.06),
    20.6px 18.3px 18px rgba(0, 0, 0, 0.054),
    29.9px 26.6px 26px rgba(0, 0, 0, 0.047),
    46.1px 41.1px 40.4px rgba(0, 0, 0, 0.038),
    82px 73px 93px rgba(0, 0, 0, 0.024);
`;

export const shadow2inner = css`
  box-shadow: 1.3px 1.1px 6.9px rgba(0, 0, 0, 0.08) inset,
    2.8px 2.5px 7.4px rgba(0, 0, 0, 0.077) inset,
    4.7px 4.2px 7.8px rgba(0, 0, 0, 0.073) inset,
    7.1px 6.3px 8.5px rgba(0, 0, 0, 0.069) inset,
    10.3px 9.1px 10.2px rgba(0, 0, 0, 0.065) inset,
    14.5px 12.9px 13.1px rgba(0, 0, 0, 0.06) inset,
    20.6px 18.3px 18px rgba(0, 0, 0, 0.054) inset,
    29.9px 26.6px 26px rgba(0, 0, 0, 0.047) inset,
    46.1px 41.1px 40.4px rgba(0, 0, 0, 0.038) inset,
    82px 73px 93px rgba(0, 0, 0, 0.024) inset;
`;

export const overlayShadow = css`
  filter: drop-shadow(5px 5px 5px var(--h3))
    drop-shadow(-5px -5px 5px var(--s5));
`;

export const border = css`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  border: 2px solid transparent;
  opacity: 25%;
  background: linear-gradient(145deg, var(--h5), var(--s1)) border-box;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: destination-out;
  mask-composite: exclude;
`;

export const backdrop = css`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: var(--h2);
  backdrop-filter: blur(20px);
  border: 2px solid transparent;
  box-shadow: 10px 10px 20px var(--s2), -10px -10px 20px var(--h1),
    inset 10px 10px 20px var(--h0), inset -30px -30px 60px var(--h2);
`;
