import moment from "moment";
import jwt from "jsonwebtoken";
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

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          role: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};

const listUser = async (req, res) => {
  let users = await model
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();

  return users.length === 0
    ? res.status(404).send({ message: "No search results found" })
    : res.status(200).send({ users });
};

export default { registerUser, listUser };
