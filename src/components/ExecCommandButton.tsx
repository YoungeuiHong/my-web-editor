import React, { ReactNode, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { EditorCommand } from "../types";

interface Props {
  command: EditorCommand;
  children: ReactNode;
}

export const ExecCommandButton = ({ command, children }: Props) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    document.execCommand(command, false);
  };

  useEffect(() => {
    const updateCommandStates = () => {
      setActive(document.queryCommandState(command));
    };

    document.addEventListener("selectionchange", updateCommandStates);
    return () => {
      document.removeEventListener("selectionchange", updateCommandStates);
    };
  }, [command]);

  return (
    <StyledIconButton
      onClick={handleClick}
      sx={{ color: active ? "#0063FF" : "#444" }}
    >
      {children}
    </StyledIconButton>
  );
};

export const StyledIconButton = styled(IconButton)({
  color: "#444",
  marginRight: "8px",
  "&:last-child": {
    marginRight: "0",
  },
});
