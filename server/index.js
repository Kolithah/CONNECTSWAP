import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { sendMessage } from "./controllers/requests.js";
//import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import requestRouter from "./routes/requests.js";
import postRoutes from "./routes/posts.js";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/posts", postRoutes);
app.use("/user", userRouter);
app.use("/requests", requestRouter);
const CONNECTION_URL =
  "mongodb+srv://**For the URL**";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("successfully connected to MongoDB"))
  .catch((error) => console.log(error.message));

// const server =()=> app.listen(PORT, () =>console.log('App is listening to port:'+ PORT));
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    // credentials: true,
  },
});

// .then- what to do if the connection is succesful
//.catch() - what do if the connection is unsuccesful
server.listen(PORT, () => console.log("App is listening to port:" + PORT));
io.on("connection", (socket) => {
  // Get nickname and channel.
  const { nickname, channel } = socket.handshake.query;
  console.log(`${nickname} connected`);
  // Join the user to the channel.
  socket.join(channel);
  //addUser(nickname, socket.id);
  // addUserToChannel(channel, nickname);

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`${nickname} disconnected`);
    //removeUser(nickname);
  });

  socket.on("CHANNEL_SWITCH", (data) => {
    const { prevChannel, channel } = data;
    if (prevChannel) {
      socket.leave(prevChannel);
    }
    if (channel) {
      socket.join(channel);
    }
  });

  socket.on("MESSAGE_SEND", async (data) => {
    //addMessage(data);
    console.log(data);
    const { channel, user, message, time } = data;
    await sendMessage(channel, user, message, time);
    socket.broadcast.to(channel).emit("NEW_MESSAGE", data);
  });
});
