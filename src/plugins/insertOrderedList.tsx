import React from "react";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { ExecCommandButton } from "../components";
import { EditorPlugin } from "../types";

const InsertOrderedListButton = () => {
  return (
    <ExecCommandButton command="insertOrderedList">
      <FormatListNumberedIcon />
    </ExecCommandButton>
  );
};

export const insertOrderedListPlugin: EditorPlugin = {
  command: "insertOrderedList",
  button: <InsertOrderedListButton />,
};
