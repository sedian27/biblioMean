import role from "../models/role.js";

const registerRole = async (req, res) => {
  let schema = new role({
    name: req.body.name,
    description: req.body.description,
  });

  let result = await schema.save();

  if (!result)
    return res.status(500).send({ message: "Failed to register role" });

  res.status(200).send({ result });
};

const listRole = async (req, res) => {
  const roles = await role.find({ name: new RegExp(req.params["name"]) });
  return roles.length === 0
    ? res.status(400).send({ message: "No search result" })
    : res.status(200).send({ roles });
};

const updateRole = async (req, res) => {
  const updated = await role.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    description: req.body.description,
  });

  return !updated
    ? res.status(500).send({ message: "Error editing role" })
    : res.status(200).send({ message: "Role updated" });
};

const deleteRole = async (req, res) => {
  const deleted = await role.findByIdAndDelete(req.params["_id"]);
  return !deleted
    ? res.status(500).send({ message: "Error deleting role" })
    : res.status(200).send({ message: "Role deleted" });
};

export default { registerRole, listRole, updateRole, deleteRole };
