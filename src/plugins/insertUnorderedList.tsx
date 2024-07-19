import React from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { ExecCommandButton } from "../components";
import { EditorPlugin } from "../types";

const InsertUnorderedListButton = () => {
  return (
    <ExecCommandButton command="insertUnorderedList">
      <FormatListBulletedIcon />
    </ExecCommandButton>
  );
};

export const insertUnorderedListPlugin: EditorPlugin = {
  command: "insertUnorderedList",
  button: <InsertUnorderedListButton />,
};
