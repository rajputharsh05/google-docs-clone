import {Card ,Button} from "@mui/material"
import { useNavigate } from "react-router-dom"

const Cards = ( {doc} )=>{

    const navigate = useNavigate();

    function handleclick(){
        navigate(`/document/${doc}`)
    }


    return (
        <Card sx={{ minWidth: 275 }}>
                        {doc}
            <Button name= {doc} onClick={handleclick} size="medium">view</Button>
        </Card>
    )
}

export default Cards