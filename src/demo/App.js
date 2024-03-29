import React from "react";
import { FilesGroup, SimpleUpload } from "../lib";

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
      let flag = false;
      files.forEach((file) => {
        if (file.file.size > 50 * 1024) {
          flag = true;
          document.getElementById(
            `img-container-${file.id}`
          ).style.borderColor = "red";
        }
      });
      if (flag) {
        return "文件大小必须小于500k";
      }
      return true;
    },
    getFileProps(file) {
      if (file.file.size > 2 * 1024) {
        return {
          style: {
            border: "1px solid red",
          },
          className: "file-has-error",
        };
      }
    },
  },
  { groupName: "png", groupTitle: "png图片", groupDesc: "png files" },
  { groupName: "gif", groupTitle: "gif图片", groupDesc: "gif files" },
  { groupName: "mp4", groupTitle: "mp4图片", groupDesc: "mp4 files" },
];

const initFiles = [
  {
    groupName: "jpg",
    size: 2095,
    name: "77x77.jpg",
    type: "image/jpeg",
    base64:
      "data:image/jpeg;base64,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",
  },
  {
    groupName: "png",
    size: 2095,
    name: "77x77.jpg",
    type: "image/jpeg",
    base64:
      "data:image/jpeg;base64,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",
  },
  {
    groupName: "null",
    size: 2534,
    name: "147x56.jpg",
    type: "image/jpeg",
    base64:
      "data:image/jpeg;base64,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",
  },
  {
    groupName: "jpg",
    size: 2534,
    name: "147x56.jpg",
    type: "image/jpeg",
    base64:
      "data:image/jpeg;base64,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",
  },
  {
    groupName: "png",
    size: 2095,
    name: "77x77.jpg",
    type: "image/jpeg",
    base64:
      "data:image/jpeg;base64,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",
  },
  {
    groupName: "jpg",
    size: 2534,
    name: "147x56.jpg",
    type: "image/jpeg",
    base64:
      "data:image/jpeg;base64,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",
  },
];

const App = () => (
  <div>
    <h1>hq1</h1>
    <h1>hq</h1>
    <div style={{ height: 500 }}>
      <FilesGroup
        groups={groups}
        option={{
          needRemoveAll: true,
          editable: { jpg: true },
          onChange: (files, errors) => {
            console.log(files);
            console.log(errors);
          },
          onPdfClick: (f) => console.log(f),
          uploadAddon: "拍照",
          onUploadAddonClick: function () {
            console.log("onUploadAddonClick");
          },
          accept: "*/*",
          getNullFileProps: function (file) {
            if (file.file.size > 2 * 1024) {
              return {
                style: {
                  border: "1px solid red",
                },
                className: "file-has-error",
              };
            }
          },
        }}
        initFiles={initFiles}
      />
    </div>
    <h1>hq</h1>
    <FilesGroup
      groups={groups}
      option={{
        needRemoveAll: true,
        editable: false,
        onChange: (files, errors) => {
          console.log(files);
          console.log(errors);
        },
        uploadAddon: "拍照",
        onUploadAddonClick: function () {
          console.log("onUploadAddonClick");
        },
      }}
      initFiles={initFiles}
    />
    <SimpleUpload
      option={{
        needRemoveAll: true,
        editable: true,
        onChange: (files, errors) => {
          console.log(files);
          console.log(errors);
        },
      }}
      initFiles={initFiles}
    />
    <h1>hq</h1>
  </div>
);

export default App;
