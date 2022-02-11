import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  pages: Number,
  author: String,
  frontPageUrl: String,
  publicationDate: Date,
  category: String,
  copies: Number,
  registerDate: { type: Date, default: Date.now },
  dbStatus: true,
});

const book = mongoose.model("books", bookSchema);

export default book;
