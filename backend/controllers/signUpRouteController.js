const docUserModel = require("../models/docUserModel");


const signUpRouteController = (req,res) => {

    try {
   
        const {username , password , email} = req.body;

        console.log(username,password,email)

        const NewDocUser =  new docUserModel({
            username,
            email,
            password
        })

        NewDocUser.save();
        
        res.json("User Registred");
        
    }catch(error){

        res.status(400).json("User Not Registred");

    }
}

module.exports = signUpRouteController;