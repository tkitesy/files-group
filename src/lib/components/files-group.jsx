import React, { useReducer, useEffect } from "react";
import GroupCard from "./group-card";
import { css, cx } from "emotion";
import { FilesContext, getId, addFilesLater } from "./common";
import Upload from "./upload";
import {StickyContainer} from './sticky'

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
    case "reset-files":
      const { files } = action;
      return files.slice();
  }
  return state;
}

export default function FilesGroup({ groups, option = {}, initFiles = [] }) {
  const [files, dispatch] = useReducer(reducer, []);
  const { borderStyle = "1px solid #555" } = option;
  const editable = option.editable !== false;

  useEffect(() => {
    option.onReady && option.onReady(dispatch);
  }, []);

  useEffect(() => {
    const files = initFiles.map(file => {
      return {
        group: file.groupName,
        base64: file.base64,
        id: file.id || getId(),
        file: {
          size: file.size,
          name: file.name,
          type: file.type
        }
      };
    });

    dispatch({ type: "add-files", files });
  }, [initFiles]);

  const styles = css`
    display: flex;
    height: 100%;
    table {
      width: 100%;
      text-align: center;
      table-layout: fixed;
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
        border-left: ${borderStyle};
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
    .upload-desc {
      color: #bbb;
      font-size: 8px;
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
    const nRet = [];
    files.forEach(file => {
      if (file.group === "null") {
        return;
      }
      ret[file.group] = ret[file.group] || [];
      ret[file.group].push(file);
      nRet.push({
        groupName: file.group,
        size: file.file.size,
        name: file.file.name,
        type: file.file.type,
        base64: file.base64,
        url: file.url,
        id: file.id
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
    onChange && onChange(nRet, errs);
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
      {editable && i === 0 && nullGroup}
    </>
  ));

  function handleUploadDescClick(e) {
    e.stopPropagation();
    option.onUploadDescClick && option.onUploadDescClick(e);
  }

  function handleUploadAddonClick(e) {
    e.stopPropagation();
    option.onUploadAddonClick && option.onUploadAddonClick(e);
  }

  return (
    <FilesContext.Provider value={{ dispatch, files, option }}>
      <div className={cx(styles, "files-group")}>
       <StickyContainer>
          <table cellSpacing="0">
            <colgroup>
              <col width={option.groupWidth || "10%"} />
              <col width={option.descWidth || "20%"} />
              <col width={editable ? option.dropWidth || "35%" : ""} />
              {editable && <col width={option.uploadWidth || "35%"} />}
            </colgroup>
            <thead>
              <tr className="first-tr">
                <th key="group" className="first-th">
                  {option.groupLabel || "要件类别"}
                </th>
                <th key="desc">{option.descLabel || "说明"}</th>
                <th key="drop">{option.dropLabel || "拖放选择"}</th>
                {editable && (
                  <th key="upload">
                    <Upload onFiles={handleFiles} accept={option.accept}>
                      <span className={"upload-btn"}>
                        {option.uploadLabel || "选择图片"}
                      </span>
                      <span
                        onClick={handleUploadDescClick}
                        className={"upload-desc"}
                      >
                        {option.uploadDesc || "按住Ctrl可多选"}
                      </span>
                      {option.uploadAddon && (
                        <span
                          className={"upload-addon"}
                          onClick={handleUploadAddonClick}
                        >
                          {option.uploadAddon}
                        </span>
                      )}
                    </Upload>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {groupElements.map((group, i) => (
                <tr key={i}>{group}</tr>
              ))}
            </tbody>
          </table>
          </StickyContainer>
      </div>
    </FilesContext.Provider>
  );
}
