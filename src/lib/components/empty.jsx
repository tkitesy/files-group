import React from "react";
export default function Empty({ label = "未选择任何文件" }) {
  return <div className={'empty'}>{label}</div>;
}
