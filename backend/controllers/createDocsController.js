const docsModel = require("../models/docsModel");


const  createDocsController = async (req,res) => {

    const { user , DocsID } = req.body;

    try{
        console.log(DocsID);
        await docsModel.create({
            _id: DocsID,
            data: "",
            user
        })
    }catch(error){
        console.log(error);
        res.status(400).json("Internal server Error");
    }

    res.status(200).json("user created");

}

module.exports = createDocsController;