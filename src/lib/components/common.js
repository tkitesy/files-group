import React from "react";
import uuid from "uuid/v4";
export const FilesContext = React.createContext({});
export function getId() {
  return uuid();
}

export function useEditable(group) {
  const { option } = React.useContext(FilesContext);
  const editable = option.editable;
  if (!group) return false;
  if (group.groupName === "null") return true;
  if (editable === undefined) {
    return true;
  }
  if (editable === false) {
    return false;
  }
  if (editable === true) {
    return true;
  }
  if (editable instanceof Object && editable) {
    if (editable[group.groupName] === true) {
      return true;
    }
    return false;
  }
  return true;
}

export function addFilesLater(files) {
  return files.map((fileObj) => {
    const { file } = fileObj;
    console.log(file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (ev) => {
        resolve({
          ...fileObj,
          base64: reader.result,
        });
      };
    });
  });
}
