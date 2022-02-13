import book from "../models/book.js";

const registerBook = (req, res) => {
  let {
    title,
    description,
    pages,
    author,
    frontPageUrl,
    publicationDate,
    category,
  } = req.body;

  if (
    !title ||
    !description ||
    !pages ||
    !frontPageUrl ||
    !publicationDate ||
    !category
  )
    return res.status(401).send({ message: "Bad" });

  const schema = new book({
    title,
    description,
    pages,
    author,
    frontPageUrl,
    publicationDate,
    category,
  });

  let result = schema.save();

  if (!result) return res.status(500).send({ message: "Failed" });

  return res.status(200).send({ result });  
};

export default { registerBook };
