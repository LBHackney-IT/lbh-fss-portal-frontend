var mockUsers = require("../mockUsers.json");
var sample = require("lodash/sample");

module.exports = (req, res) => {
  // res.status(200).json(sample(mockUsers));
  res.status(400).json({});
  // res.status(400).json({
  //   userErrorMessage: "The supplied email address already exists",
  //   devErrorMessage: null,
  // });
};
