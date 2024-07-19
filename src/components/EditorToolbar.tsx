import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/system";
import { EditorCommand } from "../types";
import { getPlugins } from "../utils";

interface Props {
  plugins: EditorCommand[];
}

export const EditorToolbar = ({ plugins }: Props) => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={1}
      style={{ boxShadow: "0px 1px 3px rgba(0,0,0,0.1)" }}
    >
      <StyledToolbar>
        {getPlugins(plugins).map((plugin) => (
          <div key={plugin.command}>{plugin.button}</div>
        ))}
      </StyledToolbar>
    </AppBar>
  );
};

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: "48px",
  [theme.breakpoints.up("sm")]: {
    paddingLeft: "12px",
    paddingRight: "12px",
  },
}));
