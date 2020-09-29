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

// VCSO - no services
module.exports = (req, res) => {
  res
    .status(200)
    .json(sample(mockUsers.filter((u) => u.name === "Melody Zieme")));
};

// VCSO - WITH services
// module.exports = (req, res) => {
//   res
//     .status(200)
//     .json(sample(mockUsers.filter((u) => u.name === "Reyna Simonis")));
// };

// ADMIN
// module.exports = (req, res) => {
//   res
//     .status(200)
//     .json(sample(mockUsers.filter((u) => u.name === "Tommie Dietrich")));
// };
