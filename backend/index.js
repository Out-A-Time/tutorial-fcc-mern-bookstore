import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { PORT, mongoDB_URL } from "./config.js";
import { Book } from "./db_models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
//Option 1: Allow all origins with default of CORS (*)
app.use(cors());
//Option 2: Allow custom origins (better option)
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// HTTP methods use for getting a resoursce from server
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack tutorial!");
});

//Routes
app.use("/books", booksRoute);

mongoose
  .connect(mongoDB_URL)
  .then(() => {
    console.log("App connected to database");

    // Server will run only if app sucessfully connected to the database
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
