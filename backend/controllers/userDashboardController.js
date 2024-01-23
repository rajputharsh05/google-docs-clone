const docsModel = require("../models/docsModel");


const userDashboardController = async (req,res) =>{

    const {user , name} = req.body;


    const Documents = await docsModel.find({user});
    
    const response = {
        name,
        data : Documents
    }
    
    console.log(response);


    res.status(200).json(JSON.stringify(response));
}

module.exports = userDashboardController;