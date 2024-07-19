import React, {
  createContext,
  useRef,
  MutableRefObject,
  ReactNode,
} from "react";

interface EditorContextType {
  editorRef: MutableRefObject<HTMLDivElement | null>;
}

const EditorContext = createContext<EditorContextType | null>(null);

interface EditorProviderProps {
  children: ReactNode;
}

const EditorProvider = ({ children }: EditorProviderProps) => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  return (
    <EditorContext.Provider value={{ editorRef }}>
      {children}
    </EditorContext.Provider>
  );
};

export { EditorContext, EditorProvider };
