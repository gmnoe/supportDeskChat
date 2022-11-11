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

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});