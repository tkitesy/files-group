import React, { useRef } from "react";

var styles = {
  input: {
   width: 0,
   height: 0,
  }
};

export default function Upload({ children, className, onFiles }) {
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
    }catch(e){
      event = document.createEvent("HTMLEvents");
      event.initEvent("click", false, true);
    }
    ref.current && ref.current.dispatchEvent(event);
  }
  return (
    <div onClick={onClick}>
      {children}
      <input
        ref={ref}
        style={styles.input}
        value={""}
        type="file"
        onChange={onChange}
        multiple
      />
    </div>
  );
}
