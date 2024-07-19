import { ReactNode } from "react";
import { EditorCommand } from "./EditorCommand";

export interface EditorPlugin {
  command: EditorCommand;
  button: ReactNode;
}
