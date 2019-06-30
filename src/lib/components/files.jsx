import React, { useRef, useEffect, useContext } from "react";
import { css, cx } from "emotion";
import FileItem from "./file-item";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import { FilesContext, setTransfer } from "./common";
import { Sticky } from "./sticky";

export default function Files({ setDragging, files, needSticky = false }) {
  const { option } = useContext(FilesContext);
  const editable = option.editable !== false;
  const ref = useRef();
  const styles = css`
    min-height: 150px;
    display: flex;
    align-items: center;
    ul {
      margin: 0;
      padding-left: 6px;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
    }
    ul > li {
      list-style: none;
      margin-right: 6px;
      margin-top: 6px;
    }
    .empty {
      text-align: center;
    }
  `;

  function getHandleDragStart(file) {
    return function handleDragStart(e) {
      const dataTransfer = e.dataTransfer;
      dataTransfer.setData("Text", "");
      setTransfer(["move", file.id]);
      setDragging(true);
    };
  }

  function handleDragEnd(e) {
    setDragging(false);
  }
  useEffect(
    function() {
      const viewer = new Viewer(ref.current);
      viewer.update();
      return function() {
        viewer.destroy();
      };
    },
    [files]
  );

  const elements = (
    <ul ref={ref}>
      {files.map(file =>
        editable ? (
          <li
            onDragStart={getHandleDragStart(file)}
            onDragEnd={handleDragEnd}
            draggable
            key={file.id}
          >
            <FileItem file={file} />
          </li>
        ) : (
          <li key={file.id} draggable={false}>
            <FileItem file={file} />
          </li>
        )
      )}
    </ul>
  );

  return needSticky ? (
    <Sticky className={cx(styles, "files-container")}>{elements}</Sticky>
  ) : (
    <div className={cx(styles, "files-container")}>{elements}</div>
  );
}
