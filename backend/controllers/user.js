import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

import user from "../models/user.js";
import role from "../models/role.js";

const register = async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).send({ message: "Incomplete data" });

  const existingUser = await user.findOne({ email });

  if (existingUser)
    return res.status(400).send({ message: "The user is already registered" });

  password = await bcrypt.hash(password, 10);

  const roleId = await role.findOne({ name: "user" });

  if (!roleId) return res.status(500).send({ message: "No role was assigned" });

  const schema = new user({ name, email, password, role: roleId._id });

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

export default { register };
