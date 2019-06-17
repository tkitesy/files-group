import 'babel-polyfill'
import FilesGroup from './components/files-group';
import React from 'react'
import ReactDOM from 'react-dom'

export default FilesGroup;

window.renderFilesGroup = function(mountNode,groups=[], option={}){
    ReactDOM.render(<FilesGroup groups={groups} option={option} />, mountNode)
}
