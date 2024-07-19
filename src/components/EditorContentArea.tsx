import React, { useContext, useEffect, useState } from "react";
import { EditorContext } from "../context";

interface Props {
  initialHtml?: string;
}

export const EditorContentArea = ({ initialHtml }: Props) => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("EditorContent must be used within an EditorProvider");
  }

  const { editorRef } = context;

  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (initialHtml) {
      setContent(initialHtml);
      console.log(initialHtml);
    }
  }, [initialHtml]);

  const handleBlur = () => {
    setContent(editorRef.current?.innerHTML ?? "");
  };

  return (
    <div
      id="editor"
      contentEditable="true"
      ref={editorRef}
      dangerouslySetInnerHTML={{ __html: content }}
      onBlur={handleBlur}
      style={{
        minHeight: "400px",
        width: "100%",
        padding: "20px",
        outline: "none",
        boxSizing: "border-box",
      }}
    />
  );
};
