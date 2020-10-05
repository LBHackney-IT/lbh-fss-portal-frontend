var mockUsers = require("../mockUsers.json");
var sample = require("lodash/sample");

// module.exports = (req, res) => {
//   const email = req.body.email;

//   const mockUser = sample(mockUsers);

//   mockUser.email = email;

//   res.status(200).json(mockUser);
// };

module.exports = (req, res) => {
  res
    .status(200)
    .json(sample(mockUsers.filter((u) => u.name === "Tommie Dietrich")));
};
