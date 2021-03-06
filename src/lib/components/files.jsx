import React, { useRef, useEffect, useContext } from "react";
import { css, cx } from "emotion";
import FileItem from "./file-item";
import Viewer from "viewerjs";
import { FilesContext, useEditable } from "./common";
import { Sticky } from "./sticky";
import { useDrag } from "react-dnd";

function DraggableFile({ file, ...rest }) {
  const [{dragging}, drag] = useDrag({
    item: { file, type: "move" },
    collect: monitor => ({
      dragging: monitor.isDragging(),
      
    })
  });
  return (
    <li ref={drag} key={file.id}>
      <FileItem file={file} {...rest} />
    </li>
  );
}

export default function Files({  files,group, needSticky = false }) {
  const { option } = useContext(FilesContext);
  const editable = useEditable(group);
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
    <ul ref={ref} className="files-container">
      {files.map((file, index) =>
        editable ? (
          <DraggableFile group={group} index={index}  key={file.id} file={file} />
        ) : (
          <li key={file.id}  draggable={false}>
            <FileItem index={index} file={file} group={group} />
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
