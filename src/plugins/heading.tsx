import React, { useEffect, useState, ChangeEvent } from "react";
import { styled } from "@mui/system";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { EditorPlugin } from "../types";

type BlockType = "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "p" | "선택";

const HeadingButton = () => {
  const [value, setValue] = useState<BlockType>("선택");

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const newValue = event.target.value as BlockType;
    setValue(newValue);
    document.execCommand("formatBlock", false, newValue);
  };

  const updateBlockType = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const parentElement = range.startContainer.parentElement;
      if (parentElement) {
        const tagName = parentElement.tagName.toUpperCase();
        switch (tagName) {
          case "H1":
          case "H2":
          case "H3":
          case "H4":
          case "H5":
          case "H6":
          case "P":
            setValue(tagName as BlockType);
            break;
          default:
            setValue("p");
        }
      }
    }
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      updateBlockType();
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <FormControl size="small">
      <StyledSelect
        id="block-type-select"
        value={value}
        onChange={handleChange}
        MenuProps={MenuProps}
      >
        <StyledMenuItem value="선택">선택</StyledMenuItem>
        <StyledMenuItem value="p">본문</StyledMenuItem>
        <StyledMenuItem value="H1">제목1</StyledMenuItem>
        <StyledMenuItem value="H2">제목2</StyledMenuItem>
        <StyledMenuItem value="H3">제목3</StyledMenuItem>
        <StyledMenuItem value="H4">제목4</StyledMenuItem>
        <StyledMenuItem value="H5">제목5</StyledMenuItem>
        <StyledMenuItem value="H6">제목6</StyledMenuItem>
      </StyledSelect>
    </FormControl>
  );
};

const StyledSelect = styled(Select)({
  width: "85px",
  fontSize: "15px",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

const StyledMenuItem = styled(MenuItem)({
  fontSize: "15px",
});

const MenuProps = {
  PaperProps: {
    style: {
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    },
  },
};

export const headingPlugin: EditorPlugin = {
  command: "heading",
  button: <HeadingButton />,
};
