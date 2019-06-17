import React from 'react';
export const FilesContext = React.createContext({});
let id = 0;

export function getId() {
    return "" + id++ ;
}