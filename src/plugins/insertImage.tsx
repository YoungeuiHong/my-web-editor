import React, { useContext, useEffect, useRef, MutableRefObject } from "react";
import CollectionsIcon from "@mui/icons-material/Collections";
import { EditorPlugin } from "../types";
import { EditorContext } from "../context";
import { StyledIconButton } from "../components";

const InsertImageButton = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("InsertImageButton must be used within an EditorProvider");
  }

  const { editorRef } = context;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgBase64 = e.target?.result as string;
        insertImage(imgBase64, "alt", "이미지 설명을 적어주세요");
      };
      reader.readAsDataURL(file);
    }
  };

  const insertImage = (image: string, alt: string, caption: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();

    const selection = window.getSelection();
    let range: Range;
    if (!selection || !selection.rangeCount) {
      range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);
    } else {
      range = selection.getRangeAt(0);
      range.deleteContents();
    }

    const figure = document.createElement("figure");
    figure.style.position = "relative";
    figure.style.display = "inline-block";
    figure.style.boxSizing = "border-box";
    figure.contentEditable = "false";
    figure.classList.add("editable-figure");

    const img = document.createElement("img");
    img.src = image;
    img.alt = alt;
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.border = "none";
    img.style.cursor = "pointer";
    img.style.position = "relative";
    img.classList.add("editable-img");

    const resizeHandle = document.createElement("div");
    resizeHandle.className = "resize-handle";
    resizeHandle.style.width = "10px";
    resizeHandle.style.height = "10px";
    resizeHandle.style.backgroundColor = "#3170EE";
    resizeHandle.style.position = "absolute";
    resizeHandle.style.right = "-10px";
    resizeHandle.style.bottom = "-10px";
    resizeHandle.style.cursor = "se-resize";
    resizeHandle.style.visibility = "hidden";
    resizeHandle.style.zIndex = "10";

    figure.appendChild(img);
    figure.appendChild(resizeHandle);

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = caption;
    figcaption.style.textAlign = "center";
    figcaption.style.fontStyle = "italic";
    figcaption.contentEditable = "true";

    figcaption.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const newParagraph = document.createElement("p");
        newParagraph.innerHTML = "<br>";
        figure.insertAdjacentElement("afterend", newParagraph);
        const range = document.createRange();
        range.setStart(newParagraph, 0);
        range.setEnd(newParagraph, 0);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    });

    figure.appendChild(figcaption);

    range.insertNode(figure);
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG") {
        const figure = target.closest("figure") as HTMLElement;
        figure.style.outline = "10px solid #C8E1FF";
        const resizeHandle = figure.querySelector(
          ".resize-handle",
        ) as HTMLElement;
        if (resizeHandle) {
          resizeHandle.style.visibility = "visible";
        }
      }
    };

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const figures = editor.querySelectorAll(".editable-figure");
      figures.forEach((figure) => {
        const fig = figure as HTMLElement; // Cast figure to HTMLElement
        const img = fig.querySelector("img");
        const resizeHandle = fig.querySelector(".resize-handle") as HTMLElement;
        if (target !== img && target !== resizeHandle) {
          fig.style.outline = "none";
          resizeHandle.style.visibility = "hidden";
        }
      });
    };

    const handleResizeMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      let isResizing = true;
      const target = e.target as HTMLElement;
      const img = target
        .closest("figure")
        ?.querySelector("img") as HTMLImageElement;
      const originalWidth = img.offsetWidth;
      const originalHeight = img.offsetHeight;
      const originalX = e.clientX;
      const originalY = e.clientY;

      const resizeImage = (e: MouseEvent) => {
        if (isResizing) {
          const deltaX = e.clientX - originalX;
          const newWidth = originalWidth + deltaX;
          const aspectRatio = originalWidth / originalHeight;
          img.style.width = `${newWidth}px`;
          img.style.height = `${newWidth / aspectRatio}px`;
        }
      };

      const stopResize = () => {
        if (isResizing) {
          isResizing = false;
          document.removeEventListener("mousemove", resizeImage);
          document.removeEventListener("mouseup", stopResize);
        }
      };

      document.addEventListener("mousemove", resizeImage);
      document.addEventListener("mouseup", stopResize);
    };

    editor.addEventListener("click", handleClick);
    document.addEventListener("click", handleDocumentClick);
    editor.addEventListener("mousedown", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("resize-handle")) {
        handleResizeMouseDown(e);
      }
    });

    return () => {
      editor.removeEventListener("click", handleClick);
      document.removeEventListener("click", handleDocumentClick);
      editor.removeEventListener("mousedown", handleResizeMouseDown);
    };
  }, [editorRef]);

  return (
    <>
      <StyledIconButton onClick={() => fileInputRef.current?.click()}>
        <CollectionsIcon />
      </StyledIconButton>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export const insertImagePlugin: EditorPlugin = {
  command: "insertImage",
  button: <InsertImageButton />,
};
