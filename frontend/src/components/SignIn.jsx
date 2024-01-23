
import "./SignIn.css"
import { TextField, Button, Container, Stack, FormControlLabel, Checkbox, Link, Avatar, Typography } from "@mui/material"
import { LockOpenOutlined }  from "@mui/icons-material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { v4 } from "uuid"
 
const SignIN = () => {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();



    function managePassword(e){
        setPassword(e.target.value);
    }


    function manageEmail(e){
        setEmail(e.target.value);
    }


    async function manageSubmit(){
        
        try {
            console.log(email,password)
            const response = await axios.post("http://localhost:4000/signin",{
                email,
                password 
            },{
                withCredentials : true
            })
            
            if(response.data === "User Verified")
            {
                navigate("/dashboard");
            }
           
        }catch(error){

            console.log(error);

        }



    }

    return (
        <div className="root">
            <Stack style={{ width: "30vw" }} spacing={5} >

               <Stack style={{ width: "30vw" }} spacing={4} alignItems={"center"}>
                <Avatar sx={{ m: 1 , backgroundColor: "blue"}}>
                    <LockOpenOutlined></LockOpenOutlined>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
               </Stack>

                <TextField onChange={ manageEmail } id="outlined-basic" label="Email*" variant="outlined" />
                <TextField onChange={ managePassword } id="outlined-basic" label="Password*" variant="outlined" />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button onClick={manageSubmit} variant="contained">Sign In</Button>
                <Link href="/signup" variant="body2"> Don't Have an Account?</Link>

            </Stack>
        </div>
    )
}

export default SignIN
