import React from "react";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import { ExecCommandButton } from "../components";
import { EditorPlugin } from "../types";

const JustifyRightButton = () => {
  return (
    <ExecCommandButton command="justifyRight">
      <FormatAlignRightIcon />
    </ExecCommandButton>
  );
};

export const justifyRightPlugin: EditorPlugin = {
  command: "justifyRight",
  button: <JustifyRightButton />,
};
