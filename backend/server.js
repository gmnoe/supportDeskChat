import http from "http";
import path from "path";
import { Server } from "socket.io";
import express from "express";

const app = express();
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get("*"), (req, res) => {
    res.sendFile(path.join(_dirname, "/frontend/build/index.html"));
}

const httpServer = http.Server(app);

const io = new Server(httpServer, { cors: { origin: "*"} });
const users = [];

io.on("connection", (socket) => {
    socket.on("disconnect", () => {

    });
    socket.on("onLogin", (user) => {

    });
    socket.on("onUserSelected", (user) => {

    });
    socket.on("onMessage", (message) => {

    });
})

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});