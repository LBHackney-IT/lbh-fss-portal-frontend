var mockUsers = require("../mockUsers.json");
var sample = require("lodash/sample");

// module.exports = (req, res) => {
//   res
//     .status(200)
//     .json(
//       sample(
//         mockUsers.filter(
//           (u) => u.roles.length === 1 && u.roles.includes("admin")
//         )
//       )
//     );
// };

// VCSO - NO services
// module.exports = (req, res) => {
//   res
//     .status(200)
//     .json(sample(mockUsers.filter((u) => u.name === "Melody Zieme")));
// };

// VCSO - WITH services
// module.exports = (req, res) => {
//   res
//     .status(200)
//     .json(sample(mockUsers.filter((u) => u.name === "Reyna Simonis")));
// };

// VCSO - WITH services but NO organisations
module.exports = (req, res) => {
  res
    .status(200)
    .json(sample(mockUsers.filter((u) => u.name === "Jaylin Rutherford Sr.")));
};

// ADMIN
// module.exports = (req, res) => {
//   res
//     .status(200)
//     .json(sample(mockUsers.filter((u) => u.name === "Tommie Dietrich")));
// };
