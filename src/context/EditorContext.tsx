import React, {
  createContext,
  useRef,
  useContext,
  useCallback,
  MutableRefObject,
} from "react";

interface EditorContextType {
  editorRef: MutableRefObject<HTMLElement | null>;
  getHTML: () => string;
}

export const EditorContext = createContext<EditorContextType | undefined>(
  undefined,
);

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const editorRef = useRef(null);

  const getHTML = useCallback(() => {
    return editorRef.current ? editorRef.current.innerHTML : null;
  }, []);

  return (
    <EditorContext.Provider value={{ editorRef, getHTML }}>
      {children}
    </EditorContext.Provider>
  );
};
