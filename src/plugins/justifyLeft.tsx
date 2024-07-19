import React from "react";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import { ExecCommandButton } from "../components";
import { EditorPlugin } from "../types";

const JustifyLeftButton = () => {
  return (
    <ExecCommandButton command="justifyLeft">
      <FormatAlignLeftIcon />
    </ExecCommandButton>
  );
};

export const justifyLeftPlugin: EditorPlugin = {
  command: "justifyLeft",
  button: <JustifyLeftButton />,
};
