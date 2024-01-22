import { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill"
import Quill from "quill";

import io from "socket.io-client"
import "./Editor.css"

const TOOLBAR_OPTIONS = [
  ['bold', 'italic', 'underline', 'strike'],        
  [{ 'font': [] }],
  [{ 'header': 1 }, { 'header': 2 }],               
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],                                     
  [{ 'size': ['small', false, 'large', 'huge'] }],  
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],          
  [{ 'align': [] }],
  ['clean']         
]

const Editor = ()=>{
  

    const [socket , setSocket] = useState();
    const [value , setValue] = useState("");


    useEffect( () => {

        const s = io("http://localhost:4000/");
        
        setSocket(s)

        return () => {
            s.disconnect();
        } 
    },[])

   

    function handlechange(content , delta , source ,editor){
        if(source === "user" )
        {
            const data = editor.getContents();
            socket.emit("send-change",data);
        }
    }


    useEffect(()=> {
        if(socket == null) return;

        socket.on('change',(delta) => {
            setValue(delta);
        });

        return () => {
            socket.off('change');
        }
    },[socket]);

    return (
        <ReactQuill 
        value={value}
        className = "container" 
        modules = {{ toolbar : TOOLBAR_OPTIONS }}
        onChange={handlechange}
        >
        </ReactQuill>
    )
}

export default Editor;