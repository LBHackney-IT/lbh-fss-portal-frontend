var mockUsers = require("../users/mockUsers.json");
var sample = require("lodash/sample");

module.exports = (req, res) => {
  res.status(200).json(sample(mockUsers));
};
