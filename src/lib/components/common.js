import React from "react";
import uuid from "uuid/v4"
export const FilesContext = React.createContext({});
let id = 0;

let transfer = [];

export function setTransfer(data) {
  transfer = data;
}
export function getTransfer() {
  return transfer;
}

export function getId() {
  return uuid();
}

export function addFilesLater(files) {
  return files.map(fileObj => {
    const { file } = fileObj;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ev => {
        resolve({
          ...fileObj,
          base64: reader.result
        });
      };
    });
  });
}
