import React, { useRef, useContext } from "react";
import { css, cx } from "emotion";
import { FaTrashAlt as RemoveIcon } from "react-icons/fa";
import { FilesContext } from "./common";
export default function FileItem({ file: fileObj, group, index }) {
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
    .file-item-num {
      display: inline-block;
      background-color: steelblue;
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 12px;
      line-height: 12px;
      padding: 2px;
    }
    .close-btn {
      bottom: 0;
      /* left: 50%; */
      /* transform: translate(-50%, -50%);
      position: absolute; */
      font-size: 12px;
      color: #ddd;
      display: none;
      cursor: pointer;
    }
    &:hover .close-btn {
      display: inline-block;
    }
    .close-btn:hover {
      color: skyblue;
    }
    &:hover .drag-fix {
      position: absolute;
      height: 100%;
      width: 100%;
      opacity: 0;
      background-color: red;
    }
    &:hover .img-mask {
      display: block;
    }
    .img-mask {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      /* height: 36px; */
      /* transition: height 0.5s; */
      background-color: rgba(0, 0, 0, 0.8);
      display: none;
    }
  `;

  function dispatchClick(e) {
    e.stopPropagation();
    e.preventDefault();
    ref.current.click();
  }

  function dispatchFixClick(e) {
    ref.current.click();
  }

  let fileProps = {};
  if(group && group.getFileProps) {
     fileProps = group.getFileProps(fileObj) || {};
  }

  const {className, ...rest} = fileProps;

  return (
    <div className={cx(styles, "img-container", className)}  id={`img-container-${id}`} {...rest}>
      {index >= 0 && <span className={'file-item-num'}>{index + 1}</span>}
      <img id={`img-${id}`} ref={ref} alt="empty" src={fileObj.url || fileObj.base64} />
      <div className="drag-fix" onClick={dispatchFixClick}></div>
      {editable && (
        <div className="img-mask" onClick={dispatchClick} >
          <span className="close-btn" onClick={removeFile} title="删除">
            <RemoveIcon />
          </span>
        </div>
      )}
    </div>
  );
}
