import React from "react";
import { resolve } from "q";
export const FilesContext = React.createContext({});
let id = 0;

export function getId() {
  return "" + id++;
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
            url: reader.result
        });
      };
    });
  });
}
