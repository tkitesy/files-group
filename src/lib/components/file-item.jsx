import React, { useState, useEffect, useContext } from "react";
import { css, cx } from "emotion";
import { IoIosClose } from "react-icons/io";
import { FilesContext } from "./common";
export default function FileItem({ file: fileObj }) {
  const { dispatch } = useContext(FilesContext);
  const [url, setUrl] = useState(null);
  const { file, id } = fileObj;
  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ev => {
      setUrl(reader.result);
    };
  }, [file]);
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
      font-size: 30px;
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
      {url ? <img src={url} width={80} height={120} /> : "loading"}
      <span className="close-btn" onClick={removeFile}>
        <IoIosClose />
      </span>
    </div>
  );
}
