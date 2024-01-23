import { useEffect, useState } from "react";
import "./UserDashboard.css"
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import Cards from "./Cards";


const UserDashBoard = () => {

    const [docs, setDocs] = useState([""]);
    const [user, setUser] = useState();
    const navigate = useNavigate();



    function handleclick(e){
        console.log(e.target.value);
    }

    async function handleNewDocs(){

        const DocsID = v4();

        const response = await axios.post("http://localhost:4000/createdocs",{
            DocsID
        },{
            withCredentials:true
        })

        navigate(`/document/${DocsID}`);

    }


    useEffect(  () => {
       
       async function getdata(){

        const response = await axios.get("http://localhost:4000/dashboard",{
            withCredentials: true,
        });

        const ResponseFromDataBase = JSON.parse(response.data);
        const UserName = ResponseFromDataBase.name;
        const DocsFromDatabase = ResponseFromDataBase.data;


        let Infromation = [];

        DocsFromDatabase.map( (doc) => {
            Infromation.push(doc._id);
        })

        setDocs(Infromation);
        setUser(UserName.toUpperCase())

        
        console.log(JSON.parse(response.data));
       }

       getdata();

    }, [] )

    return (
        <div className="root">
            <div className="nav">
                <h1>{user}</h1>
            </div>
                <Button onClick={handleNewDocs}>Create New Docs</Button>
            <h1>Your Docs</h1>
            <div className="docs">
                {
                    docs.map( (doc) =>
                       <Cards doc={doc}></Cards>
                    )
                }
            </div>
        </div>
    )
}

export default UserDashBoard;