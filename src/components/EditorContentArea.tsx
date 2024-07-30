import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
} from "react";
import DOMPurify from "dompurify";
import { EditorContext, EditorContextType } from "../context";

interface Props {
  initialHtml?: string;
}

export const EditorContentArea: React.FC<Props> = ({ initialHtml }) => {
  const context = useContext<EditorContextType | undefined>(EditorContext);

  if (!context) {
    throw new Error("EditorContent must be used within an EditorProvider");
  }

  const { editorRef } = context;

  const [content, setContent] = useState<string>("");
  const lastHtml = useRef<string>(content);
  const isComposing = useRef<boolean>(false);

  useEffect(() => {
    if (initialHtml) {
      setContent(DOMPurify.sanitize(initialHtml));
    }
  }, [initialHtml]);

  function normalizeHtml(str: string): string {
    return (
      str &&
      str.replace(/&nbsp;|\u202F|\u00A0/g, " ").replace(/<br \/>/g, "<br>")
    );
  }

  function replaceCaret(el: HTMLElement) {
    const target = document.createTextNode("");
    el.appendChild(target);
    const isTargetFocused = document.activeElement === el;
    if (target !== null && target.nodeValue !== null && isTargetFocused) {
      const sel = window.getSelection();
      if (sel !== null) {
        const range = document.createRange();
        range.setStart(target, target.nodeValue.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      if (el instanceof HTMLElement) el.focus();
    }
  }

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    if (content !== el.innerHTML && !isComposing.current) {
      el.innerHTML = content;
      lastHtml.current = content;
      replaceCaret(el);
    }
  }, [content, editorRef]);

  const handleCompositionStart = () => {
    isComposing.current = true;
  };

  const handleCompositionEnd = () => {
    isComposing.current = false;
    handleInput();
  };

  const handleBlur = () => {
    emitChange();
  };

  const handleInput = () => {
    emitChange();
  };

  const emitChange = () => {
    const el = editorRef.current;
    if (!el) return;

    const html = el.innerHTML;
    if (normalizeHtml(html) !== normalizeHtml(lastHtml.current)) {
      setContent(html);
      lastHtml.current = html;
    }
  };

  return (
    <div
      id="editor"
      contentEditable={true}
      ref={editorRef as MutableRefObject<HTMLDivElement>}
      onInput={handleInput}
      onBlur={handleBlur}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
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
