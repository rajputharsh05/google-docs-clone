const { createServer } = require("http")
const express = require("express");
const server = express();
const bodyparser = require('body-parser');
const cookieparser = require("cookie-parser")
const cors = require("cors");
const mongoose = require("mongoose");
const docsModel = require("./models/docsModel");
const { Server } = require('socket.io')
const DocsUserRouter = require('./routes/docsUserRoute')
const defaultValue = "";
server.use(cookieparser());

server.use(bodyparser.urlencoded({ extended: false }))
server.use(bodyparser.json());
server.use(cors(
    {
        origin : "http://localhost:3000",
        methods : ["GET", "PUT" , "POST" , "DELETE"],
        credentials : true,
    }
));

mongoose.connect("mongodb+srv://hs7992476139:KOSgem8tijMk0Nws@cluster0.whwoemb.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("Database Connected");
}).catch((error) => {
    console.log(error);
})


const httpServer = createServer(server);

server.use(DocsUserRouter);


const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
})


io.on("connection", (socket) => {
    console.log("User Connected")


    try {


        socket.on("get-document", async documentId => {

            console.log(documentId)
            const document = await findOrCreateDocument(documentId);
            console.log(document);
            socket.join(documentId);
            socket.emit("load-document", document.data);
            socket.on("send-change", (delta) => {
                console.log(delta);
                socket.broadcast.to(documentId).emit("change", delta);
            })

            socket.on("save-document", async data => {
                console.log("Updated !");
                await docsModel.findByIdAndUpdate(documentId, { data });
            })

        })


        socket.on('disconnect', () => {
            console.log("A user disconnected")
        })

    } catch (error) {

        console.log(error);

    }


})


async function findOrCreateDocument(id) {
    if (id == null) return;

    const document = await docsModel.findById(id);

    if (document) return document;

    return await docsModel.create({
        _id: id,
        data: defaultValue,
    })
}


httpServer.listen(4000, () => {
    console.log("Server Running on 4000")
})

