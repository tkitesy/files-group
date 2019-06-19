import React, { useState, useContext } from "react";
import Files from "./files";
import { css, cx } from "emotion";
import { FilesContext, getId, addFilesLater } from "./common";

export default function GroupCard({ group, groupCount, onlyBody = false }) {
  const { dispatch, files } = useContext(FilesContext);
  const [hover, setHover] = useState(false);
  const [dragging, setDragging] = useState(false);
  // const [error, setError] = useState(null);
  const groupedFiles = files.filter(file => file.group === group.groupName);
  let error = null;
  if (group.validate) {
    error = group.validate(groupedFiles);
    error = error === true ? null : error;
  }

  function handleDrop(e) {
    e.preventDefault();
    const dataTransfer = e.dataTransfer;
    const [action, fileid] = dataTransfer.getData("Text")
      ? dataTransfer.getData("Text").split(",")
      : [];
    if (!action) {
      // const toAddFiles = Array.from(e.dataTransfer.files).map(file => ({
      //   id: getId(),
      //   file,
      //   group: group.groupName
      // }));
      // Promise.all(addFilesLater(toAddFiles)).then(resolveFiles => {
      //   dispatch({ type: "add-files", files: resolveFiles });
      // });
      return;
    }

    if (action === "move") {
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

  function handleDragEnter(e) {
    e.preventDefault();
  }

  const styles = css`
     .req {
       color: red;
     }
     .error-message {
       height: 12px;
       font-size: 10px;
       text-align: left;
       line-height: 12px;
       color: red;
       margin-left: 6px;
     }
  `;

  return onlyBody ? (
    <td
      className={cx(styles, "group-card null-group-card last-td")}
      onDrop={handleDrop}
      onDragOver={hanleDragOver}
      onDragEnter={handleDragEnter}
      rowSpan={groupCount}
    >
       <div className={'error-message'}>{error || ''}</div>
      <Files
        files={groupedFiles}
        setDragging={setDragging}
        dragging={dragging}
        hover={hover}
        setHover={setHover}
        group={group}
      />
       <div className={'error-message'}>{''}</div>
    </td>
  ) : (
    <>
      <td
        className={cx(styles, "group-card first-td")}
        onDrop={handleDrop}
        onDragOver={hanleDragOver}
        onDragEnter={handleDragEnter}
      >
        <div className={"group-card-name"}><span className="req">{group.required && "*"}</span>{group.groupTitle}</div>
      </td>
      <td
        className={cx(styles, "group-card")}
        onDrop={handleDrop}
        onDragOver={hanleDragOver}
        onDragEnter={handleDragEnter}
      >
        <div className={"group-card-desc"}>
          {group.groupDesc}
        </div>
      </td>
      <td
        className={cx(styles, "group-card")}
        onDrop={handleDrop}
        onDragOver={hanleDragOver}
        onDragEnter={handleDragEnter}
      >
        <div className={'error-message'}>{error || ''}</div>
        <Files
          files={groupedFiles}
          setDragging={setDragging}
          dragging={dragging}
          hover={hover}
          setHover={setHover}
          group={group}
        />
         <div className={'error-message'}>{''}</div>
      </td>
    </>
  );
}
