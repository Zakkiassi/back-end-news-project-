const { selectAllUsers } = require("../modules/users.modules");

exports.getAllUsers = (req, res) => {
  return selectAllUsers().then((users) => {
   
    res.status(200).send({ users });
  });
};
