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

export default function FilesGroup({ groups, option ={} }) {
  const [files, dispatch] = useReducer(reducer, []);
  const styles = css`
    display: flex-column;
  `;

  useEffect(() => {
    const {onChange} = option;
    onChange && onChange(files);
  }, [files, option]);

  return (
    <FilesContext.Provider value={{ dispatch, files, option }}>
      <div className={cx(styles, "files-group")}>
        {groups.map(group => (
          <GroupCard key={group.groupName} group={group} />
        ))}
      </div>
    </FilesContext.Provider>
  );
}
