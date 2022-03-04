import jwt from "../lib/jwt.js";
import bcrypt from "bcrypt";

import model from "../models/user.js";

const registerUser = async (req, res) => {
  let { name, email, password, role } = req.body;

  password = await bcrypt.hash(password, 10);

  const schema = new model({
    name,
    email,
    password,
    role,
  });

  const result = await schema.save();

  if (!result)
    return res.status(500).send({ message: "Failed to register user" });

  const token = await jwt.generateToken(result);
  return !token
    ? res.status(500).send({ message: "Failed to register user" })
    : res.status(200).send({ token });
};

const listUserAdmin = async (req, res) => {
  let users = await model
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();

  return users.length === 0
    ? res.status(404).send({ message: "No search results found" })
    : res.status(200).send({ users });
};

const listUser = async (req, res) => {
  let users = await model
    .find({
      $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: true }],
    })
    .populate("role")
    .exec();

  return users.length === 0
    ? res.status(404).send({ message: "No search results found" })
    : res.status(200).send({ users });
};

const login = async (req, res) => {
  const userLogin = await model.findOne({ email: req.body.email });

  if (!userLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  if (!userLogin.dbStatus)
    return res.status(400).send({ message: "User not found" });

  const passHash = await bcrypt.compare(req.body.password, userLogin.password);

  if (!passHash)
    return res.status(400).send({ message: "Wrong email or password" });

  const token = await jwt.generateToken(userLogin);
  return !token
    ? res.status(500).send({ message: "Failed to login" })
    : res.status(200).send({ token });
};

const updateUser = async (req, res) => {
  if (!req.body._id)
    return res.status(400).send({ message: "Incomplete Data" });

  let pass = "";

  if (!req.body.password) {
    const findUser = await model.findOne({ email: req.body.email });
    pass = findUser.password;
  } else {
    pass = await bcrypt.hash(req.body.password, 10);
  }

  const updated = await model.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    password: pass,
    role: req.body.role,
  });

  return !updated
    ? res.status(500).send({ message: "Error editing user" })
    : res.status(200).send({ message: "User updated" });
};

const deleteUser = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const deleted = await model.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });

  return !deleted
    ? res.status(500).send({ message: "Error deleting user" })
    : res.status(200).send({ message: "User deleted" });
};

export default {
  registerUser,
  listUser,
  login,
  updateUser,
  deleteUser,
  listUserAdmin,
};
