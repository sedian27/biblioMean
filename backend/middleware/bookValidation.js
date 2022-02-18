import model from "../models/book.js";

const validations = (req, res, next) => {
  validateData(req, res, next);
  next();
};

const validateData = (req, res, next) => {
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
    return res.status(401).send({ message: "Incomplete data" });
};

export default { validations };
