import "babel-polyfill";
import FilesGroup from "./components/files-group";
import React from "react";
import ReactDOM from "react-dom";
import { getId } from './components/common'

export default FilesGroup;

window.renderFilesGroup = function(mountNode, groups = [], option = {}, initFiles = []) {
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
  };
  function onReady(dispatch){
    _dispatch = dispatch;
    dispatch({type: 'add-files', files: toAddFiles})
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
  
    addFiles([file])
    
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
      }
    })
    if(_dispatch !== null){
      _dispatch({type: 'add-files', files: files})
    }
    else {
      toAddFiles = toAddFiles.concat(files)
    }
  }

  ReactDOM.render(
    <FilesGroup groups={groups} option={{ ...option, onChange, onReady }} initFiles={initFiles} />,
    mountNode
  );
  return {
    getGroupedFiles,
    getErrors,
    addFile,
    addFiles
  };
};
