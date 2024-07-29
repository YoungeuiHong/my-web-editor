import React, {
  createContext,
  useRef,
  useContext,
  useCallback,
  MutableRefObject,
  ReactNode,
} from "react";

export interface EditorContextType {
  editorRef: MutableRefObject<HTMLElement | null>;
  getHTML: () => string | null;
}

export const EditorContext = createContext<EditorContextType | undefined>(
  undefined,
);

export const useEditor = () => useContext(EditorContext);

interface EditorProviderProps {
  children: ReactNode;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const editorRef = useRef<HTMLElement | null>(null);

  const getHTML = useCallback(() => {
    return editorRef.current ? editorRef.current.innerHTML : null;
  }, []);

  return (
    <EditorContext.Provider value={{ editorRef, getHTML }}>
      {children}
    </EditorContext.Provider>
  );
};
