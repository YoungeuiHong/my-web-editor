import React from "react";
import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";
import { EditorPlugin } from "../types";
import { ExecCommandButton } from "../components";

const IndentButton = () => {
  return (
    <ExecCommandButton command="indent">
      <FormatIndentIncreaseIcon />
    </ExecCommandButton>
  );
};

export const indentPlugin: EditorPlugin = {
  command: "indent",
  button: <IndentButton />,
};
