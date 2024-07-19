import React from "react";
import FormatIndentDecreaseIcon from "@mui/icons-material/FormatIndentDecrease";
import { ExecCommandButton } from "../components";
import { EditorPlugin } from "../types";

const OutdentButton = () => {
  return (
    <ExecCommandButton command="outdent">
      <FormatIndentDecreaseIcon />
    </ExecCommandButton>
  );
};

export const outdentPlugin: EditorPlugin = {
  command: "outdent",
  button: <OutdentButton />,
};
