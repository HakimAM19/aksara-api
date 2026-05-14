"use client";

import {
  useEditor,
  EditorContent,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

export default function Editor({
  content,
  setContent,
}) {

  const editor = useEditor({

    extensions: [
      StarterKit,
    ],

    content,

    editorProps: {

      attributes: {

        class:
          "min-h-[300px] bg-white text-black p-6 outline-none",

      },
    },

    onUpdate({ editor }) {

      setContent(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (

    <div className="rounded-xl overflow-hidden border border-gray-700">

      <div className="flex gap-2 flex-wrap bg-gray-100 p-3 border-b">

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className="px-4 py-2 bg-black text-white rounded"
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className="px-4 py-2 bg-black text-white rounded"
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="px-4 py-2 bg-black text-white rounded"
        >
          List
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="px-4 py-2 bg-black text-white rounded"
        >
          H1
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="px-4 py-2 bg-black text-white rounded"
        >
          H2
        </button>

      </div>

      <EditorContent editor={editor} />

    </div>
  );
}