const _ = require("underscore");
let mockUsers = require("./mockUsers.json");

module.exports = (req, res) => {
  res.status(200).json(_.sample(mockUsers));
};
