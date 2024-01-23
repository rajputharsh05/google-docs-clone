const JWT = require("jsonwebtoken");
const docUserModel = require("../models/docUserModel");
const docsModel = require("../models/docsModel");
const JWT_SECRET = "@Harsh12345";


const CreateToken = ( payload ) => {

    const Token = JWT.sign(payload,JWT_SECRET);

    return Token;
}

const ProtectedRoute = async (req,res,next) => {

    console.log("hey");
    
    try 
    {

        const token = req.cookies.JWT

        if(!token){
            res.status(400).json("User Not Verified");
            throw new Error("Not Verified")
        }
        
        const result = JWT.verify(token,JWT_SECRET);

        const email = result.email;

        
        const IsUserThere =  await docUserModel.findOne( {email} )

        
        if(IsUserThere)
        {

            const user = (IsUserThere._id).toString();

            req.body.user = user;
            req.body.name = IsUserThere.username;

            next();

        }else{

            res.status(401).json("User Not Verified");

        }

    }catch(error){
        console.log(error);
    }
    
}


module.exports = {
    CreateToken,
    ProtectedRoute
}