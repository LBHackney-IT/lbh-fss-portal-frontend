var mockUsers = require("../mockUsers.json");
var sample = require("lodash/sample");

module.exports = (req, res) => {
  res
    .status(200)
    .json(
      sample(
        mockUsers.filter(
          (u) => u.roles.length === 1 && u.roles.includes("admin")
        )
      )
    );
};
