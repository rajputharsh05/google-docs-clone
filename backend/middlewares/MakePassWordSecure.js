const bcrypt = require("bcrypt");
const salt = 10;

const HashPassword =  async (req,res,next) => {

    try{
    
        const { password } = req.body;
        
        const HasedPassword = await bcrypt.hash(password,salt);

        req.body.password = HasedPassword;

        next();

    }catch(error){

        console.log(error);

    }

}

module.exports = HashPassword;