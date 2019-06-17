import React from 'react';
import Example from '../lib';

const groups = [
  {groupName: "jpg", groupTitle:"jpg图片", groupDesc: 'jpg files'},
  {groupName: "png", groupTitle: "png图片", groupDesc: 'png files'},
  {groupName: "null", groupTitle:"未分类", groupDesc: 'html files'},
]

const App = () => (
  <div>
    <Example groups={groups} option={{onChange: files=> console.log(files)}} />
  </div>
);

export default App;
