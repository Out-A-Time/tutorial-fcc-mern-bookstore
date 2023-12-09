import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import { PORT, mongoDB_URL } from "./config.js";
import { Book } from "./db_models/bookModel.js";

const app = express();

//Middleware for parsing request body
app.use(express.json());

// HTTP methods use for getting a resoursce from server
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack tutorial!");
});

//ROUTES
// Post method
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publisher",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Get all method
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Get by id method
app.get("/books/:id", async (request, response) => {
  try {
    // console.log("request", request.params);
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Update by id method

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
