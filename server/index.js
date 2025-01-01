import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import AuthRoute from "./Routes/AuthRoute.js";
import dotenv from 'dotenv';
import cors from 'cors';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import ChatRoute from './Routes/ChatRoute.js';
import MessageRoute from './Routes/MessageRoute.js';
import NotificationRoute from './Routes/NotificationRoute.js';

const app = express();

// Middleware to serve static files like images
app.use(express.static('public')); // Serve static files from 'public' directory
app.use('/images', express.static('public/images')); // Serve images from 'public/images' directory

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on port ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));

// Root Route
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);
app.use('/chat',ChatRoute);
app.use('/message',MessageRoute);
app.use('/notification', NotificationRoute);

