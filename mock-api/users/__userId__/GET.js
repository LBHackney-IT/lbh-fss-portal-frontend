var mockUsers = require("../../mockUsers.json");

module.exports = (req, res) => {
  const { userId } = req.params;

  const user = mockUsers.find((user) => user.id === parseInt(userId));

  res.status(200).json(user);
  // res.status(404).json({});
};
