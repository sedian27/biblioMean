import role from "../models/role.js";

const register = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description)
    return res.status(400).send({ message: "Incomplete data" });

  let schema = new role({ name, description });

  let result = await schema.save();

  if (!result)
    return res.status(500).send({ message: "Failed to register role" });

  res.status(200).send({ result });
};

export default { register };
