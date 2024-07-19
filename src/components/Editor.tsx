import React from "react";
import { EditorCommand } from "../types";
import { EditorToolbar } from "./EditorToolbar";
import { EditorContentArea } from "./EditorContentArea";

interface Props {
  plugins: EditorCommand[];
  initialHtml?: string;
}

const Editor = ({ plugins, initialHtml }: Props) => {
  return (
    <div style={{ border: "1px solid #e2e2e2", borderRadius: "10px" }}>
      <EditorToolbar plugins={plugins} />
      <EditorContentArea initialHtml={initialHtml} />
    </div>
  );
};

export default Editor;
