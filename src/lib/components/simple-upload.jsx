import React, { useEffect, useState, useRef, useReducer } from "react";
import { FilesContext, getId, addFilesLater } from "./common";
import Upload from "./upload";
import FileItem from "./file-item";
import Viewer from "viewerjs";
import { css, cx } from "emotion";

function reducer(state = [], action) {
  switch (action.type) {
    case "add-files":
      return state.concat(action.files);
    case "remove-file":
      const { id } = action;
      return state.filter((file) => file.id !== id);
    case "reset-files":
      const { files } = action;
      return files.slice();
    case "remove-all-null":
      return [];
    default:
      return files;
  }
}

export default function SimpleUpload({ initFiles, option }) {
  const editable = option.editable !== false;
  const [files, dispatch] = useReducer(reducer, []);
  const [errs, setErrs] = useState(null);
  const ref = useRef();
  const styles = css`
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
      text-align: center;
    }
    .empty {
      text-align: center;
    }
  `;

  useEffect(() => {
    option.onReady && option.onReady(dispatch);
  }, [option]);

  useEffect(
    function () {
      const viewer = new Viewer(ref.current);
      viewer.update();
      return function () {
        viewer.destroy();
      };
    },
    [files]
  );

  useEffect(() => {
    const files = initFiles.map((file) => {
      return {
        base64: file.base64,
        id: file.id || getId(),
        file: {
          size: file.size,
          name: file.name,
          type: file.type,
        },
      };
    });

    dispatch({ type: "add-files", files });
  }, [initFiles]);

  useEffect(() => {
    const { onChange } = option;
    const ret = {};
    const nRet = [];
    files.forEach((file) => {
      ret[file.group] = ret[file.group] || [];
      ret[file.group].push(file);
      nRet.push({
        size: file.file.size,
        name: file.file.name,
        type: file.file.type,
        base64: file.base64,
        url: file.url,
        id: file.id,
      });
    });
    let errs = null;
    const validate = option.validate || (() => true);
    const es = validate(files);
    if (es !== true) {
      errs = es;
    }
    setErrs(errs);
    onChange && onChange(nRet, errs);
  }, [files, option]);

  function handleFiles(files) {
    const toAddFiles = Array.from(files).map((file) => ({
      id: getId(),
      file,
    }));
    Promise.all(addFilesLater(toAddFiles)).then((resolveFiles) => {
      dispatch({ type: "add-files", files: resolveFiles });
    });
  }

  function handleUploadDescClick(e) {
    e.stopPropagation();
    option.onUploadDescClick && option.onUploadDescClick(e);
  }

  function handleUploadAddonClick(e) {
    e.stopPropagation();
    option.onUploadAddonClick && option.onUploadAddonClick(e);
  }

  function handleRemoveAll(e) {
    e.stopPropagation();
    dispatch({ type: "remove-all-null" });
  }

  return (
    <FilesContext.Provider value={{ dispatch, files, option }}>
      <div className={cx(styles, "files-container")}>
        {editable && (
          <Upload onFiles={handleFiles} accept={option.accept}>
            <span className={"upload-btn"}>
              {option.uploadLabel || "选择文件"}
            </span>
            {option.uploadDesc && (
              <span onClick={handleUploadDescClick} className={"upload-desc"}>
                {option.uploadDesc || "按住Ctrl可多选"}
              </span>
            )}
            {option.needRemoveAll && (
              <span className={"remove-all-btn"} onClick={handleRemoveAll}>
                {option.removeAll || "清除全部"}
              </span>
            )}
            {option.uploadAddon && (
              <span className={"upload-addon"} onClick={handleUploadAddonClick}>
                {option.uploadAddon}
              </span>
            )}
          </Upload>
        )}
        <div className="file-list">
          <div className="error">{errs}</div>
          <ul ref={ref}>
            {files.map((file) => (
              <li key={file.id}>
                <FileItem group={{}} file={file} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FilesContext.Provider>
  );
}
