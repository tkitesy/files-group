import React, { useReducer, useEffect } from "react";
import GroupCard from "./group-card";
import { css, cx } from "emotion";
import { FilesContext, getId, addFilesLater } from "./common";
import Upload from "./upload";

function reducer(state = [], action) {
  switch (action.type) {
    case "add-files":
      return state.concat(action.files);
    case "move-file":
      const { fileid, targetGroup } = action;
      const movingFile = state.find(file => file.id === fileid);
      return state
        .filter(file => file.id !== fileid)
        .concat({
          ...movingFile,
          group: targetGroup
        });
    case "remove-file":
      const { id } = action;
      return state.filter(file => file.id !== id);
  }
  return state;
}

export default function FilesGroup({ groups, option = {} }) {
  const [files, dispatch] = useReducer(reducer, []);
  const { borderStyle = "1px solid #555" } = option;
  const styles = css`
    display: flex;
    table {
      width: 100%;
      text-align: center;
      td,
      th {
        border-right: ${borderStyle};
        font-weight: normal;
        border-bottom: ${borderStyle};
      }
      td.first-td {
        border-left: ${borderStyle};
      }
      th.first-th {
        border-left:${borderStyle};
      }
      tr.first-tr th {
        border-top: ${borderStyle};
      }
    }
    .upload-btn {
      cursor: pointer;

    }
    .upload-btn:hover {
      color: blue;
      text-decoration: underline;
    }
  `;

  function handleFiles(files) {
    const toAddFiles = Array.from(files).map(file => ({
      id: getId(),
      file,
      group: "null"
    }));
    Promise.all(addFilesLater(toAddFiles)).then(resolveFiles => {
      dispatch({ type: "add-files", files: resolveFiles });
    });
  }

  useEffect(() => {
    const { onChange } = option;
    const ret = {};
    files.forEach(file => {
      if (file.group === "null") {
        return;
      }
      ret[file.group] = ret[file.group] || [];
      ret[file.group].push({
        file: file.file,
        base64: file.url
      });
    });
    const errs = {};
    groups.forEach(group => {
      if (group.validate) {
        const groupedFiles = ret[group.groupName] || [];
        const es = group.validate(groupedFiles);
        if (es !== true) {
          errs[group.groupName] = es;
        }
      }
    });
    onChange && onChange(ret, errs);
  }, [files, option, groups]);

  const nullGroup = (
    <GroupCard
      key={"null"}
      onlyBody={true}
      groupCount={groups.length}
      group={{ groupName: "null" }}
    />
  );

  const groupElements = groups.map((group, i) => (
    <>
      <GroupCard key={group.groupName} group={group} />
      {i === 0 && nullGroup}
    </>
  ));

  return (
    <FilesContext.Provider value={{ dispatch, files, option }}>
      <div className={cx(styles, "files-group")}>
        <table cellSpacing="0">
          <colgroup>
            <col width="10%" />
            <col width="20%" />
            <col width="35%" />
            <col width="35%" />
          </colgroup>
          <thead>
            <tr className="first-tr">
              <th key="group" className="first-th">要件类别</th>
              <th key="desc">说明</th>
              <th key="drop">拖放选择</th>
              <th key="upload">
                <Upload onFiles={handleFiles} accept={option.accept}>
                  <span className={"upload-btn"}>点击上传</span>
                </Upload>
              </th>
            </tr>
          </thead>
          <tbody>
            {groupElements.map((group, i) => (
              <tr key={i}>{group}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </FilesContext.Provider>
  );
}
