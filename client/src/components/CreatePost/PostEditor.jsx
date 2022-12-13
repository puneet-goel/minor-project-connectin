import React, { useRef } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const editorConfiguration = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'blockQuote',
      'insertTable',
      'undo',
      'redo',
    ],
    shouldNotGroupWhenFull: true,
  },
};

const PostEditor = ({ postData, setPostData }) => {
  const editorRef = useRef(null);

  const handleEditorChange = (event, editor) => {
    setPostData((prev) => ({ ...prev, message: editor.getData() }));
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      data={postData.message}
      onReady={(editor) => {
        editorRef.current = editor;
      }}
      onChange={handleEditorChange}
    />
  );
};

export default PostEditor;
