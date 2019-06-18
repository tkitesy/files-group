import React from "react";
import Example from "../lib";

const groups = [
  {
    required: true, 
    groupName: "jpg",
    groupTitle: "jpg图片",
    groupDesc: "jpg files",
    validate(files) {
      if (files.length === 0) {
        return "至少包含一个文件";
      }
      return true;
    }
  },
  { groupName: "png", groupTitle: "png图片", groupDesc: "png files" }
];

const App = () => (
  <div>
    <Example
      groups={groups}
      option={{
        onChange: (files, errors) => {
          console.log(files);
          console.log(errors);
        }
      }}
    />
  </div>
);

export default App;
