import React from "react";
import { EditorPlugin } from "../types";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { ExecCommandButton } from "../components";

const UnderlineButton = () => {
  return (
    <ExecCommandButton command="underline">
      <FormatUnderlinedIcon />
    </ExecCommandButton>
  );
};

export const underlinePlugin: EditorPlugin = {
  command: "underline",
  button: <UnderlineButton />,
};
