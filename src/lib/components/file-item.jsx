import React, { useRef, useContext } from "react";
import { css, cx } from "emotion";
import { FaTrashAlt as RemoveIcon } from "react-icons/fa";
import { FilesContext } from "./common";
export default function FileItem({ file: fileObj }) {
  const { dispatch, option } = useContext(FilesContext);
  const editable = option.editable !== false;
  const { id } = fileObj;
  const width = option.itemWidth || 80;
  const height = option.itemHeight || 120;
  const ref = useRef();
  function removeFile(e) {
    e.stopPropagation();
    dispatch({ type: "remove-file", id });
  }
  const styles = css`
    position: relative;
    width: ${width}px;
    height: ${height}px;
    overflow: hidden;
    cursor: pointer;
    border: 0.5px solid #ccc;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      max-height: 100%;
    }
    .close-btn {
      bottom: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
      font-size: 12px;
      color: #ddd;
      display: none;
      cursor: pointer;
    }
    &:hover .close-btn {
      display: inline-block;
    }
    &:hover .img-mask {
      display: block;
    }
    .img-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      /* transition: height 0.5s; */
      background-color: rgba(0, 0, 0, 0.8);
      display: none;
    }
  `;
  function dispatchClick(e) {
    ref.current.click();
  }

  return (
    <div className={cx(styles, "img-container")}>
      {<img id={id} ref={ref} src={fileObj.url || fileObj.base64} />}
      {editable && (
        <div className="img-mask" onClick={dispatchClick}>
          <span className="close-btn" onClick={removeFile} title="删除">
            <RemoveIcon />
          </span>
        </div>
      )}
    </div>
  );
}
