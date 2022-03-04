import { css, SerializedStyles } from "@emotion/react";

const fonts = [
  css`
    font-family: "IBM Plex Serif" serif;
  `,
  css`
    font-family: "Inter" sans-serif;
  `,
  css`
    font-family: "Lato", sans-serif;
  `,
  css`
    font-family: "Ubuntu", sans-serif;
  `,
  css`
    font-family: "Poppins", sans-serif;
  `,
  css`
    font-family: "Playfair Display", serif;
  `,
  css`
    font-family: "Zilla Slab", serif;
  `,
  css`
    font-family: "Space Grotesk", sans-serif;
  `,
  css`
    font-family: "Source Sans Pro", sans-serif;
  `,
];

const getFont = (fontNumber: number, weight: number): SerializedStyles => {
  return css`
    ${fonts[fontNumber]};
    font-weight: ${weight};
  `;
};

export default getFont;
