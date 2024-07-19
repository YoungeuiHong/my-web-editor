import React from "react";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import { EditorPlugin } from "../types";
import { ExecCommandButton } from "../components";

const ItalicButton = () => {
  return (
    <ExecCommandButton command="italic">
      <FormatItalicIcon />
    </ExecCommandButton>
  );
};

export const italicPlugin: EditorPlugin = {
  command: "italic",
  button: <ItalicButton />,
};
