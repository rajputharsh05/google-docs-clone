const docUserModel = require("../models/docUserModel");
const bcrypt = require("bcrypt");



const VerifyUserPassword = async (req,res,next) => {
    try {

        const { email , password } = req.body;

        const UserInformationFromDatabase = await docUserModel.findOne({ email });

        

        if(UserInformationFromDatabase){

            const UserPasswordFromDatabase = UserInformationFromDatabase.password;

            const result = await bcrypt.compare(password,UserPasswordFromDatabase);


            if(result === true){

                next();

            }else{

                res.status(400).json("Wrong PassWord");

            }

        }else{

            res.status(400).json("User Not Found");

        }

    }catch(error){

        res.json(error);

    }
}

module.exports = VerifyUserPassword;