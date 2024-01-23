const { CreateToken } = require("../utils/jwt");


const signInController = (req,res) => {

    try{
 
        const { email } = req.body;
         
        const token = CreateToken( {email} );

        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Credentials', true);
        res.cookie("JWT" , token);
        
        res.json("User Verified");

    }catch(error){

        console.log(error);

    }
}

module.exports = signInController;