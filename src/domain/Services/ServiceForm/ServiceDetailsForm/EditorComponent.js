import React, { Component } from "react";
import { render } from "react-dom";
import { Editor } from "react-draft-wysiwyg";
import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Note - specllCheck prompter only works in safari
const EditorComponent = () => (
  <Editor
    wrapperStyle={{
      border: "2px solid black",
    }}
    spellCheck={true}
  />
);

export default EditorComponent;
