
import "./SignUp.css"
import { TextField, Button, Container, Stack, FormControlLabel, Checkbox, Link, Avatar, Typography } from "@mui/material"
import { LockOpenOutlined }  from "@mui/icons-material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

 
const SignUP = () => {

    const navigate = useNavigate();

    const [username , setUsername] = useState();
    const [email , setEmail] = useState();
    const [password , setPassword] = useState();


    function managePassword(e){
        setPassword(e.target.value);
    }


    function manageUsername(e){
        setUsername(e.target.value);
    }


    function manageEmail(e){
        setEmail(e.target.value);
    }


    async function manageSubmit(){
        
        try {
            const response = await axios.post("http://localhost:4000/signup",{
                email,
                password,
                username,
            },{
                withCredentials : true
            })
            
            if(response.data === "User Registred")
            {
                navigate("/signin");
            }
           
        }catch(error){

            console.log(error);

        }

    }


    return (
        <div className="root">
            <Stack style={{ width: "30vw" }} spacing={4} >

               <Stack style={{ width: "30vw" }} spacing={4} alignItems={"center"}>
                <Avatar sx={{ m: 1 , backgroundColor: "blue"}}>
                    <LockOpenOutlined></LockOpenOutlined>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
               </Stack>

                <TextField onChange={manageEmail} id="outlined-basic" label="Email*" variant="outlined" />
                <TextField onChange={manageUsername} id="outlined-basic" label="Username*" variant="outlined" />
                <TextField onChange={managePassword} id="outlined-basic" label="Password*" variant="outlined" />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button onClick={manageSubmit} variant="contained">Create Account</Button>
                <Link href="signin" variant="body2"> Already Have an Account?</Link>

            </Stack>
        </div>
    )
}

export default SignUP
