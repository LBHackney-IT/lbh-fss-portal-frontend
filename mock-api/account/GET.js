var mockUsers = require("../mockUsers.json");
var sample = require("lodash/sample");

// module.exports = (req, res) => {
//   res
//     .status(200)
//     .json(sample(mockUsers.filter((u) => u.name === "Melody Zieme")));
// };

module.exports = (req, res) => {
  res
    .status(200)
    .json(sample(mockUsers.filter((u) => u.name === "Melody Zieme")));
};

// module.exports = (req, res) => {
//   res
//     .status(200)
//     .json(sample(mockUsers.filter((u) => u.name === "Tommie Dietrich")));
// };
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
