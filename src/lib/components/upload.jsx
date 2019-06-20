import React, { useRef } from "react";
import { css, cx } from "emotion";

export default function Upload({
  children,
  accept = "image/*",
  className,
  onFiles
}) {
  const ref = useRef();
  function onChange(event) {
    const { target } = event;
    if (target.files && onFiles) {
      onFiles(target.files);
    }
  }
  function onClick() {
    let event;
    try {
      event = new MouseEvent("click");
    } catch (e) {
      event = document.createEvent("HTMLEvents");
      event.initEvent("click", false, true);
    }
    ref.current && ref.current.dispatchEvent(event);
  }

  const styles = css`
    display: inline;
    input {
      width: 0;
      height: 0;
    }
  `;

  return (
    <div onClick={onClick} className={cx(styles, "upload-container", className)}>
      {children}
      <input
        ref={ref}
        value={""}
        type="file"
        accept={accept}
        onChange={onChange}
        multiple
      />
    </div>
  );
}
