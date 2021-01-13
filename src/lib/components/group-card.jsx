import React, { useContext } from "react";
import Files from "./files";
import { css, cx } from "emotion";
import { FilesContext, useEditable } from "./common";
import { useDrop } from "react-dnd";

export default function GroupCard({ group, groupCount, onlyBody = false }) {
  const { dispatch, files } = useContext(FilesContext);
  const groupedFiles = files.filter((file) => file.group === group.groupName);
  const editable = useEditable(group);
  let error = null;
  if (group.validate) {
    error = group.validate(groupedFiles);
    error = error === true ? null : error;
  }

  function handleDrop(item) {
    if (editable) {
      dispatch({
        type: "move-file",
        fileid: item.file.id,
        targetGroup: group.groupName,
      });
    }
  }

  const [, drop] = useDrop({
    accept: "move",
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop() && editable,
    }),
  });

  const [, drop1] = useDrop({
    accept: "move",
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop() && editable,
    }),
  });

  const [, drop2] = useDrop({
    accept: "move",
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop() && editable,
    }),
  });

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
    &.null-group-card {
      vertical-align: top;
      overflow-y: auto;
    }
  `;

  return onlyBody ? (
    <td
      className={cx(styles, "group-card null-group-card last-td")}
      ref={drop}
      rowSpan={groupCount}
    >
      <div className={"error-message"}>{error || ""}</div>
      <Files needSticky={true} files={groupedFiles} group={group} />
      <div className={"error-message"}>{""}</div>
    </td>
  ) : (
    <>
      <td className={cx(styles, "group-card first-td")} ref={drop}>
        <div className={"group-card-name"}>
          <span className="req">{group.required && "*"}</span>
          {group.groupTitle}
        </div>
      </td>
      <td className={cx(styles, "group-card")} ref={drop1}>
        <div className={"group-card-desc"}>{group.groupDesc}</div>
      </td>
      <td className={cx(styles, "group-card")} ref={drop2}>
        <div className={"error-message"}>{error || ""}</div>
        <Files files={groupedFiles} group={group} />
        <div className={"error-message"}>{""}</div>
      </td>
    </>
  );
}
