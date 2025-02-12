import React, { useContext, useEffect, useRef, ChangeEvent } from "react";
import CollectionsIcon from "@mui/icons-material/Collections";
import { EditorContext, EditorContextType } from "../context";
import { EditorPlugin } from "../types";
import { StyledIconButton } from "../components";

const alignLeftIcon = `
<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 10H16M3 14H21M3 18H16M3 6H21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const alignCenterIcon = `
  <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 6H21M3 14H21M17 10H7M17 18H7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const alignRightIcon = `
  <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 10H21M3 14H21M8 18H21M3 6H21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const deleteIcon = `
  <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const InsertImageButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const context = useContext<EditorContextType | undefined>(EditorContext);

  if (!context) {
    throw new Error("InsertImageButton must be used within an EditorProvider");
  }

  const { editorRef } = context;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  function insertImage(image: string, alt: string, caption: string) {
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
    range.collapse(false);

    const container = document.createElement("div");
    container.style.display = "block";

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
        const newRange = document.createRange();
        newRange.setStart(newParagraph, 0);
        newRange.setEnd(newParagraph, 0);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(newRange);
      }
    });

    figure.appendChild(img);
    figure.appendChild(figcaption);

    container.appendChild(figure);

    range.insertNode(container);
    range.setStartAfter(container);
  }

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG") {
        const figure = target.closest("figure") as HTMLElement;
        if (!figure) return;

        const resizeHandle = document.createElement("div");
        resizeHandle.className = "resize-handle";
        resizeHandle.style.width = "10px";
        resizeHandle.style.height = "10px";
        resizeHandle.style.backgroundColor = "#3170EE";
        resizeHandle.style.position = "absolute";
        resizeHandle.style.right = "-10px";
        resizeHandle.style.bottom = "-10px";
        resizeHandle.style.cursor = "se-resize";
        resizeHandle.style.visibility = "visible";
        resizeHandle.style.zIndex = "10";

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";
        buttonContainer.style.position = "absolute";
        buttonContainer.style.top = "5px";
        buttonContainer.style.right = "5px";
        buttonContainer.style.display = "flex";
        buttonContainer.style.flexDirection = "row";
        buttonContainer.style.visibility = "visible";
        buttonContainer.style.zIndex = "10";

        const createIconButton = (
          iconSvg: string,
          onClick: () => void,
          isGrouped: boolean,
        ) => {
          const button = document.createElement("button");
          button.style.backgroundColor = "#fff";
          button.style.color = "#3170EE";
          button.style.border = "none";
          button.style.borderRadius = isGrouped ? "0" : "3px";
          button.style.borderRight = isGrouped ? "1px solid #ccc" : "none";
          button.style.cursor = "pointer";
          button.style.padding = "2px 5px";
          button.style.display = "flex";
          button.style.alignItems = "center";
          button.style.justifyContent = "center";
          button.innerHTML = iconSvg;
          button.onclick = onClick;
          return button;
        };

        const alignLeft = createIconButton(
          alignLeftIcon,
          () => {
            if (figure.parentElement) {
              figure.parentElement.style.textAlign = "left";
            }
          },
          true,
        );
        const alignCenter = createIconButton(
          alignCenterIcon,
          () => {
            if (figure.parentElement) {
              figure.parentElement.style.textAlign = "center";
            }
          },
          true,
        );
        const alignRight = createIconButton(
          alignRightIcon,
          () => {
            if (figure.parentElement) {
              figure.parentElement.style.textAlign = "right";
            }
          },
          true,
        );
        const deleteImage = createIconButton(
          deleteIcon,
          () => {
            figure.parentElement?.remove();
          },
          false,
        );

        const buttonGroup = document.createElement("div");
        buttonGroup.style.display = "flex";
        buttonGroup.style.flexDirection = "row";
        buttonGroup.style.border = "1px solid #ccc";
        buttonGroup.style.borderRadius = "3px";

        buttonGroup.appendChild(alignLeft);
        buttonGroup.appendChild(alignCenter);
        buttonGroup.appendChild(alignRight);

        buttonContainer.appendChild(buttonGroup);

        const deleteButtonWrapper = document.createElement("div");
        deleteButtonWrapper.style.marginLeft = "8px";
        deleteButtonWrapper.appendChild(deleteImage);

        buttonContainer.appendChild(deleteButtonWrapper);

        figure.appendChild(resizeHandle);
        figure.appendChild(buttonContainer);

        figure.style.outline = "10px solid #C8E1FF";
      }
    };

    const handleDocumentClick = (e: MouseEvent) => {
      const figures = editor.querySelectorAll(".editable-figure");
      figures.forEach((figure) => {
        const figureElement = figure as HTMLElement;
        const img = figureElement.querySelector("img");
        const resizeHandle = figureElement.querySelector(".resize-handle");
        const buttonContainer =
          figureElement.querySelector(".button-container");
        if (
          e.target !== img &&
          e.target !== resizeHandle &&
          (!buttonContainer || !buttonContainer.contains(e.target as Node))
        ) {
          figureElement.style.outline = "none";
          resizeHandle?.remove();
          buttonContainer?.remove();
        }
      });
    };

    const handleResizeMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      let isResizing = true;
      const img = (e.target as HTMLElement)
        .closest("figure")
        ?.querySelector("img") as HTMLElement;
      if (!img) return;
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
      if ((e.target as HTMLElement).classList.contains("resize-handle")) {
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
