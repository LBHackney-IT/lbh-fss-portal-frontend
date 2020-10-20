var mockAddresses = require("../mockAddresses.json");

module.exports = (req, res) => {
  res.status(200).json(mockAddresses);
  // res.status(401).json({});
};
