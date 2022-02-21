import book from "../models/book.js";

const registerBook = async (req, res) => {
  const schema = new book({
    title: req.body.title,
    description: req.body.description,
    pager: req.body.pages,
    author: req.body.author,
    frontPageUrl: req.body.frontPageUrl,
    publicationDate: req.body.publicationDate,
    category: req.body.category,
  });

  let result = await schema.save();

  if (!result)
    return res.status(500).send({ message: "Failed to register book" });

  return res.status(200).send({ result });
};

const listBook = async (req, res) => {
  let books = await book.find({ name: new RegExp(req.params["name"]) });
  return books.length === 0
    ? res.status(404).send({ message: "No result search" })
    : res.status(200).send({ books });
};

export default { registerBook, listBook };
