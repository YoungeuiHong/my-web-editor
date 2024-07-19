import React from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import { EditorPlugin } from "../types";
import { ExecCommandButton } from "../components";

const BoldButton = () => {
  return (
    <ExecCommandButton command="bold">
      <FormatBoldIcon />
    </ExecCommandButton>
  );
};

export const boldPlugin: EditorPlugin = {
  command: "bold",
  button: <BoldButton />,
};
