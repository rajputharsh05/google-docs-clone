const { createServer } = require("http")
const cors = require("cors");

const { Server } = require('socket.io')

const httpServer = createServer();

const io = new Server(httpServer, {
    cors : {
        origin: "http://localhost:3000"
    }
})



io.on("connection" , (socket) => {
    console.log("User Connected")

    socket.on("send-change", (delta) => {    
        const data = delta.ops[0].insert;
        console.log(data);
        socket.emit("change",data);
    })

    socket.on('disconnect' , () => {
        console.log("A user disconnected")
    })
})




httpServer.listen(4000 , ()=> {
    console.log("Server Running on 4000")
})


// io.use((req,res,next) => {

//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

//     next();
// })
