# files group

build 中为以构建文件
index.html 中为基本例子

# 用法

导入组件库文件

```html
<link rel="stylesheet" type="text/css" href="build/index.css" />
<script src="build/index.js"></script>
```

初始化组件

```javascript
var ret = renderFilesGroup(
  document.getElementById("root"),
  groups,
  option,
  initFiles
);
```

## groups

> 为分组定义

## option

> 配置项

<table>
<thead>
<tr><th>描述</th><th>名称</th><th>类型</th><th>默认值</th></tr>
</thead>
<tbody>
<tr>
<td>表格边框样式 </td><td>borderStyle</td><td> string </td><td> '1px solid #555'</td>
</tr>
<tr>
<td>分类列宽</td><td> groupWidth</td><td> string </td><td>"10%"</td>
</tr>
<tr>
<td>
说明列宽</td><td>  descWidth</td><td> string</td><td> "20%"</td>
</tr>
<tr>
<td>文件列宽</td><td>  dropWidth</td><td> string </td><td>"35%"</td>
</tr>
<tr>
<td>上传共享区列宽 </td><td> uploadWidth </td><td>string </td><td>"35%"</td>
</tr>
<tr>
<td>分类列文本</td><td>groupLabel</td><td> string</td><td> "要件类别"</td>
</tr>
<tr>
<td>说明列文本</td><td>descLabel</td><td> string </td><td>"说明"</td>
</tr>
<tr>
<td>文件列文本</td><td> dropLabel</td><td> string</td><td> "拖放选择"</td><td>
<tr>
<td>上传列文本</td><td>uploadLabel </td><td>string</td><td> "点击上传"</td><td>
</tr>
<tr>
<td>可选的文件类型</td><td>accept</td><td> string</td><td> 'image/*'</td>
</tr>
<tr>
<td>
文件项的宽度</td><td> itemWidth</td><td> number</td><td> 80</td>
</tr>
<tr>
<td>文件项的高度</td><td>itemHeight</td><td> number</td><td> 120</td>
</tr>
<tr>
<td>变化检测</td><td>onChange</td><td> function</td><td> function(files, errors) {}</td>
</tr>
</tbody>
<table>

## initFiles

> 为初始化的已经分组文件

## 渲染返回对象

> getGroupedFiles 获取已分组文件

> getErrors 获取校验结果
