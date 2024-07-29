import React, { useContext, useEffect, useState, useRef } from "react";
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
  const lastHtml = useRef<string>(content);
  const isComposing = useRef<boolean>(false);

  useEffect(() => {
    if (initialHtml) {
      setContent(initialHtml);
    }
  }, [initialHtml]);

  // HTML 문자열을 정규화하는 함수
  function normalizeHtml(str: string): string {
    return (
      str &&
      str.replace(/&nbsp;|\u202F|\u00A0/g, " ").replace(/<br \/>/g, "<br>")
    );
  }

  // caret을 요소의 끝에 위치시키는 함수
  function replaceCaret(el: HTMLElement) {
    const target = document.createTextNode("");
    el.appendChild(target);
    const isTargetFocused = document.activeElement === el;
    if (target !== null && target.nodeValue !== null && isTargetFocused) {
      var sel = window.getSelection();
      if (sel !== null) {
        var range = document.createRange();
        range.setStart(target, target.nodeValue.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      if (el instanceof HTMLElement) el.focus();
    }
  }

  useEffect(() => {
    if (initialHtml) {
      setContent(initialHtml);
    }
  }, [initialHtml]);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    if (content !== el.innerHTML && !isComposing.current) {
      // IME 입력 중에는 DOM 조작을 피함
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
    handleInput(); // IME 입력 완료 후 입력 이벤트 호출
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
      ref={editorRef}
      onInput={handleInput}
      onBlur={handleBlur}
      onCompositionStart={handleCompositionStart} // IME 입력 시작 이벤트
      onCompositionEnd={handleCompositionEnd} // IME 입력 완료 이벤트
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
