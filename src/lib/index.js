import "babel-polyfill";
import FilesGroup from "./components/files-group";
import SimpleUpload from "./components/simple-upload";
import React from "react";
import ReactDOM from "react-dom";
import { getId } from "./components/common";
import "viewerjs/dist/viewer.css";
export { FilesGroup, SimpleUpload };

window.renderFilesGroup = function(
  mountNode,
  groups = [],
  option = {},
  initFiles = []
) {
  let files = [];
  let errors = {};
  let _dispatch = null;
  let toAddFiles = [];
  function onChange(fs, errs) {
    try {
      option.onChange && option.onChange(fs, errs);
    } finally {
      files = fs;
      errors = errs;
    }
  }
  function onReady(dispatch) {
    _dispatch = dispatch;
    dispatch({ type: "add-files", files: toAddFiles });
    // toAddFiles = [];
    option.onReady && option.onReady();
  }

  function getGroupedFiles() {
    return files;
  }
  function getErrors() {
    return errors;
  }

  function addFile(file) {
    addFiles([file]);
  }

  function addFiles(files) {
    files = files.map(file => {
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
    if (_dispatch !== null) {
      _dispatch({ type: "add-files", files: files });
    } else {
      toAddFiles = toAddFiles.concat(files);
    }
  }

  ReactDOM.render(
    <FilesGroup
      groups={groups}
      option={{ ...option, onChange, onReady }}
      initFiles={initFiles}
    />,
    mountNode
  );
  return {
    getGroupedFiles,
    getErrors,
    addFile,
    addFiles
  };
};

window.renderSimpleUpload = function(mountNode, option = {}, initFiles = []) {
  let files = [];
  let errors = null;
  let _dispatch = null;
  let toAddFiles = [];
  function onChange(fs, errs) {
    try {
      option.onChange && option.onChange(fs, errs);
    } finally {
      files = fs;
      errors = errs;
    }
  }
  function onReady(dispatch) {
    _dispatch = dispatch;
    dispatch({ type: "add-files", files: toAddFiles });
    // toAddFiles = [];
    option.onReady && option.onReady();
  }

  function getFiles() {
    return files;
  }
  function getErrors() {
    return errors;
  }

  function addFile(file) {
    addFiles([file]);
  }

  function addFiles(files) {
    files = files.map(file => {
      return {
        base64: file.base64,
        id: file.id || getId(),
        file: {
          size: file.size,
          name: file.name,
          type: file.type
        }
      };
    });
    if (_dispatch !== null) {
      _dispatch({ type: "add-files", files: files });
    } else {
      toAddFiles = toAddFiles.concat(files);
    }
  }

  ReactDOM.render(
    <SimpleUpload
      option={{ ...option, onChange, onReady }}
      initFiles={initFiles}
    />,
    mountNode
  );
  return {
    getFiles,
    getErrors,
    addFile,
    addFiles
  };
};
