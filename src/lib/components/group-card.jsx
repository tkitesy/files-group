import React, { useState, useContext } from "react";
import Files from "./files";
import { css, cx } from "emotion";
import { FilesContext, getId } from "./common";
import Upload from "./upload";


export default function GroupCard({ group }) {
  const { dispatch } = useContext(FilesContext);
  const [hover, setHover] = useState(false);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e) {
    e.preventDefault();
    const dataTransfer = e.dataTransfer;
    const action = dataTransfer.getData("action");
    if (!action) {
      const toAddFiles = Array.from(e.dataTransfer.files).map(file => ({
        id: getId(),
        file,
        group: group.groupName
      }));
      dispatch({ type: "add-files", files: toAddFiles });
      return;
    }

    if (action === "move") {
      const fileid = dataTransfer.getData("fileid");
      dispatch({
        type: "move-file",
        fileid: fileid,
        targetGroup: group.groupName
      });
    }
  }

  function hanleDragOver(e) {
    e.preventDefault();
  }



  function handleFiles(files){
    const toAddFiles = Array.from(files).map(file => ({
        id: getId(),
        file,
        group: group.groupName
      }));
      dispatch({ type: "add-files", files: toAddFiles });
  }

  const styles = css`
    border: 0.5px solid #223f7e;
    outline: ${ hover ? "1px solid #223f7e" : "none"};
    margin: 8px;
    padding: 6px;
    flex-grow: 1;
    .group-card-name {
      font-size: 18px;
      color: #333;
    }
    .group-card-desc {
      font-size: 12px;
      color: #444;
      padding: 6px 0;
      margin-bottom: 6px;
    }
    .group-card-head {
      border-bottom: 1px solid #223f7e;
    }
    .upload-btn {
      cursor: pointer;
    }
  `;

  return (
    <div
      className={cx(styles, "group-card")}
      onDrop={handleDrop}
      onDragOver={hanleDragOver}
    >
      <div className={"group-card-head"}>
        <div className={"group-card-name"}>{group.groupTitle}</div>
        <div className={"group-card-desc"}>{group.groupDesc}</div>
      </div>
      <div className={"group-card-body"}>
        <div className={"upload-btn-container"}>
          <Upload onFiles={handleFiles}><span className={'upload-btn'}>点击上传</span></Upload>
        </div>
        <Files
          setDragging={setDragging}
          dragging={dragging}
          hover={hover}
          setHover={setHover}
          group={group}
        />
      </div>
    </div>
  );
}
