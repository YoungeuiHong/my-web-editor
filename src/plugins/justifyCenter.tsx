import React from "react";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import { ExecCommandButton } from "../components";
import { EditorPlugin } from "../types";

const JustifyCenterButton = () => {
  return (
    <ExecCommandButton command="justifyCenter">
      <FormatAlignCenterIcon />
    </ExecCommandButton>
  );
};

export const justifyCenterPlugin: EditorPlugin = {
  command: "justifyCenter",
  button: <JustifyCenterButton />,
};
