import React, { useState, useEffect, useContext } from "react";
import { css, cx } from "emotion";
import { IoIosClose } from "react-icons/io";
import { FilesContext } from "./common";
export default function FileItem({ file: fileObj }) {
  const { dispatch, option } = useContext(FilesContext);
  const { id } = fileObj;
  function removeFile() {
    dispatch({ type: "remove-file", id });
  }
  const styles = css`
    position: relative;
    .close-btn {
      top: 0;
      left: 100%;
      transform: translate(-50%, -50%);
      position: absolute;
      font-size: 24px;
      color: red;
      display: none;
      cursor: pointer;
    }
    &:hover .close-btn {
      display: inline-block;
    }
  `;

  return (
    <div className={cx(styles, "img-container")}>
      {<img src={fileObj.url} width={option.itemWidth || 80} height={option.itemHeight || 120} />}
      <span className="close-btn" onClick={removeFile}>
        <IoIosClose />
      </span>
    </div>
  );
}
