import {
  boldPlugin,
  headingPlugin,
  indentPlugin,
  insertOrderedListPlugin,
  insertUnorderedListPlugin,
  italicPlugin,
  justifyLeftPlugin,
  justifyCenterPlugin,
  justifyRightPlugin,
  outdentPlugin,
  underlinePlugin,
  insertImagePlugin,
} from "../plugins";
import { EditorCommand, EditorPlugin } from "../types";

const PLUGIN_MAP = new Map<EditorCommand, EditorPlugin>([
  ["bold", boldPlugin],
  ["indent", indentPlugin],
  ["insertOrderedList", insertOrderedListPlugin],
  ["insertUnorderedList", insertUnorderedListPlugin],
  ["italic", italicPlugin],
  ["justifyLeft", justifyLeftPlugin],
  ["justifyCenter", justifyCenterPlugin],
  ["justifyRight", justifyRightPlugin],
  ["underline", underlinePlugin],
  ["outdent", outdentPlugin],
  ["heading", headingPlugin],
  ["insertImage", insertImagePlugin],
]);

export const getPlugins = (commands: EditorCommand[]): EditorPlugin[] => {
  return commands
    .map((command) => PLUGIN_MAP.get(command))
    .filter((plugin) => plugin !== undefined) as EditorPlugin[];
};
