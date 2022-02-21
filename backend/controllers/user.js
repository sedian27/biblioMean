import moment from "moment";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import model from "../models/user.js";
import user from "../models/user.js";

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

const login = async (req, res) => {
  const userLogin = await model.findOne({ email: req.body.email });

  // if (!userLogin)
  //   return res.status(400).send({ message: "Wrong email or password" });

  if (!userLogin.dbStatus)
    return res.status(400).send({ message: "Use not found" });

  const passHash = await bcrypt.compare(req.body.password, userLogin.password);

  if (!passHash) return res.status(400).send({ message: "Password not found" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          role: userLogin.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};
export default { registerUser, listUser, login };
