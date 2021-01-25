var mockUsers = require("../mockUsers.json");
var sample = require("lodash/sample");

// module.exports = (req, res) => {
//   res.status(401).json({});
// };

// // ADMIN;
// module.exports = (req, res) => {
//   res
//     .status(200)
//     .json(sample(mockUsers.filter((u) => u.name === "Reyna Simonis")));
// };

// // VCSO - NO services but WITH organisation
// module.exports = (req, res) => {
//   res
//     .status(200)
//     .json(sample(mockUsers.filter((u) => u.name === "Melody Zieme")));
// };

// VCSO - WITH services and WITH organisation
module.exports = (req, res) => {
  res
    .status(200)
    .json(sample(mockUsers.filter((u) => u.name === "Tommie Dietrich")));
};

// // VCSO - WITH services but WITHOUT organisations
// module.exports = (req, res) => {
//   res
//     .status(200)
//     .json(sample(mockUsers.filter((u) => u.name === "Jaylin Rutherford Sr.")));
// };
