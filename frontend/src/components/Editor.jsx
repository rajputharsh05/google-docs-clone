import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import io from "socket.io-client";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";
import { useParams } from "react-router-dom";

const TOOLBAR_OPTIONS = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'font': [] }],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],
  ['clean']
];

const Editor = () => {

  const { ID : documentId} = useParams();
  const [socket, setSocket] = useState(null);
  const quillRef = useRef(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:4000/");
    setSocket(socketInstance);

    const quill = quillRef.current.getEditor();
    quill.disable();

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === null) return;

    const handleEditorChange = (delta) => {
      if (quillRef.current) {
        const quill = quillRef.current.getEditor();
        quill.updateContents(delta);
      }
    };

    socket.on('change', handleEditorChange);

    return () => {
      socket.off('change', handleEditorChange);
    };
  }, [socket]);

  console.log(documentId);



  useEffect(()=>{

    if(socket == null) return;
    const quill = quillRef.current.getEditor();
    const interval = setInterval(()=>{
        socket.emit("save-document",quill.getContents())
    }, 2000)


    return () =>{
        clearInterval(interval)
    }


  },[socket])

  useEffect(() => {

    if(socket == null) return


    socket.on("load-document", (document) => {
        if(quillRef.current){
            const quill = quillRef.current.getEditor();
            console.log(document);
            quill.updateContents(document);
            quill.enable()
        }
    })


    socket.emit('get-document',documentId)

  },[socket,documentId])

  const handleQuillChange = (content, delta, source, editor) => {
    if (source === "user" && socket !== null) {
      socket.emit("send-change", delta);
    }
  };



  return (
    <ReactQuill
      ref={quillRef}
      className="container"
      modules={{ toolbar: TOOLBAR_OPTIONS }}
      onChange={handleQuillChange}
    />
  );
};

export default Editor;
