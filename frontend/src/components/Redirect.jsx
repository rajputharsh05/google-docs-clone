import { useNavigate } from "react-router-dom";
import {v4 as uuidV4, v4} from 'uuid'
const { useEffect } = require("react");


const RedirectToDocs = () => {
  
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/signin`)
    })


   return null
  
  }

  export default RedirectToDocs;