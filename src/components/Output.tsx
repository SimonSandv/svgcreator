import React, { useState } from "react";
import { useStore } from "effector-react";
import ReactDOMServer from "react-dom/server";
import styled from "@emotion/styled";
import { $store, $viewBoxState } from "../index";

const Output = (): JSX.Element => {
  const [title, titleSet] = useState("");
  const store = useStore($store);
  const viewBox = useStore($viewBoxState);
  const xml = `<?xml version="1.0" encoding="utf-8" standalone="no"?>\r\n`;
  const head = `<svg id="${title}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" viewBox="${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}">\r\n`;
  const styleSrc = "";
  const style = `<style type="text/css">${styleSrc}</style>\r\n`;
  const paths = store.paths.map((path) => {
    const p = <path d={path.data} {...path.attr} />;
    return ReactDOMServer.renderToStaticMarkup(p);
    // return `<path d="${path.data}"></path>\r\n`;
  });
  const closeTag = `</svg>`;
  const source = `${xml}${head}${style}${paths}${closeTag}`;

  // const serializer = new XMLSerializer();
  // const source = serializer.serializeToString(svgElement);

  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`;

  const Download = (): JSX.Element => {
    const onClick = (): void => {
      const download = document.createElement("a");
      download.href = url;
      download.download = `${title}.svg`;
      document.body.appendChild(download);
      download.click();
      document.body.removeChild(download);
    };
    const DownloadBtnContainer = styled.div``;
    const DownloadBtn = styled.button``;
    const TitleInput = styled.input``;
    return (
      <DownloadBtnContainer className="downloadBtnContainer">
        <TitleInput
          type="text"
          defaultValue="MySVG"
          onChange={(e) => {
            titleSet(e.target.value);
          }}
        />
        <DownloadBtn type="button" onClick={onClick}>
          Download
        </DownloadBtn>
      </DownloadBtnContainer>
    );
  };
  const Container = styled.div`
    height: var(--outputHeight);
    max-height: var(--outputHeight);
  `;
  const CodeContainer = styled.div``;
  return (
    <Container className="downloadContainer">
      <Download />
      <CodeContainer className="codeContainer">
        <pre>
          <code>
            {source}
            {/* {`<svg xmlns="http://www.w3.org/2000/svg"> viewBox="${store.viewBox.position.x} ${store.viewBox.position.y} ${store.viewBox.width} ${store.viewBox.height}">\n`}
          {`<style></style>`}
          {store.paths.map((path) => {
            return `\n<path d="${path.data}"></path>\n`;
          })}
          {`</svg>`} */}
          </code>
        </pre>
      </CodeContainer>
    </Container>
  );
};

export default Output;
