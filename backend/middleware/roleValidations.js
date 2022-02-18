import model from "../models/role.js";

const validations = (req, res, next) => {
  validateData();
  validRole();
};

const validateData = (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description)
    return res.status(400).send({ message: "Incomplete data" });
};

const validRole = async (req, res, next) => {
  const role = await model.findOne({ name: "user" });

  if (role.length === 0)
    return res.status(404).send({ message: "Role not found" });

  req.body.role = role._id;

  next();
};

export default { validRole, validations };
