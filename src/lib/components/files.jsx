import React, {  useRef, useEffect } from "react";
import { css, cx } from "emotion";
import FileItem from "./file-item";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

export default function Files({ setDragging, files }) {
  const ref = useRef();
  const styles = css`
    ul {
      margin: 0;
      padding-left: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
    }
    ul > li {
      list-style: none;
      margin-right: 6px;
      margin-top: 6px;
    }
    .empty{
      text-align: center;
    }
  `;


  function getHandleDragStart(file) {
    return function handleDragStart(e) {
      const dataTransfer = e.dataTransfer;
      dataTransfer.setData("Text", "move," + file.id);
      // dataTransfer.setData("fileid", file.id);
      setDragging(true);
    };
  }

  function handleDragEnd(e) {
    setDragging(false);
  }
  useEffect(
    function() {
      const viewer = new Viewer(ref.current);
      setTimeout(() => {
        viewer.update();
      }, 500);
      return function() {
        viewer.destroy();
      };
    },
    [files]
  );

  return (
    <div className={cx(styles, "files-container")}>
      <ul ref={ref}>
        {files.map(file => (
          <li
            onDragStart={getHandleDragStart(file)}
            onDragEnd={handleDragEnd}
            draggable
            key={file.id}
          >
            <FileItem file={file} />
          </li>
        ))}
      </ul>
    </div>
  );
}
