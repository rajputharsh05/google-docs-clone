const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");


const DocsModel = mongoose.Schema({
    _id : String,
    data: Object,
    user : {
      type : "String"
    }
})

const docsModel = mongoose.model('docs',DocsModel);

module.exports = docsModel;
