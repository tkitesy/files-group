import "babel-polyfill";
import FilesGroup from "./components/files-group";
import React from "react";
import ReactDOM from "react-dom";

export default FilesGroup;

window.renderFilesGroup = function(mountNode, groups = [], option = {}) {
  let files = {};
  let errors = {};
  const onChange = function(fs, errs) {
    try {
      option.onChange && option.onChange();
    } finally {
      files = fs;
      errors = errs;
    }
  };
  function getGroupedFiles() {
    return files;
  }
  function getErrors() {
    return errors;
  }
  ReactDOM.render(
    <FilesGroup groups={groups} option={{ ...option, onChange }} />,
    mountNode
  );
  return {
    getGroupedFiles,
    getErrors
  };
};
