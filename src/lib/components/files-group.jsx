import React, { useReducer, useEffect } from "react";
import GroupCard from "./group-card";
import { css, cx } from "emotion";
import { FilesContext } from "./common";

function reducer(state = [], action) {
  switch (action.type) {
    case "add-files":
      return state.concat(action.files);
    case "move-file":
      const { fileid, targetGroup } = action;
      const movingFile = state.find(file => file.id === fileid);
      return state
        .filter(file => file.id !== fileid)
        .concat({
          ...movingFile,
          group: targetGroup
        });
    case "remove-file":
      const { id } = action;
      return state.filter(file => file.id !== id);
  }
  return state;
}

export default function FilesGroup({ groups, option = {} }) {
  const [files, dispatch] = useReducer(reducer, []);
  const styles = css`
    display: flex;
    border: 0.5px solid #223f7e;
    .files-group-container {
      display: flex;
      flex-direction: column;
      width: 70%;
    }
    .null-group-container {
      width: 30%;
    }
  `;

  useEffect(() => {
    const { onChange } = option;
    const ret = {};
    files.forEach(file => {
      if(file.group=== 'null') {
        return;
      }
      ret[file.group] = ret[file.group] || [];
      ret[file.group].push(file.file);
    })
    const errs = {}
    groups.forEach(group => {
      if(group.validate){
        const groupedFiles = ret[group.groupName] || [];
        const es = group.validate(groupedFiles)
        if(es !== true) {
          errs[group.groupName] = es;
        }
      } 
    })
    onChange && onChange(ret, errs);
  }, [files, option, groups]);

  return (
    <FilesContext.Provider value={{ dispatch, files, option }}>
      <div className={cx(styles, "files-group")}>
        <div className={'files-group-container'}>
          {groups.map(group => (
            <GroupCard key={group.groupName} group={group} />
          ))}
        </div>
        <div className={'null-group-container'}>
            <GroupCard key={'null'} onlyBody={true} group={{groupName:'null'}} />
        </div>
      </div>
    </FilesContext.Provider>
  );
}
