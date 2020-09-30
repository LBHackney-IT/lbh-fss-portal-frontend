var mockAddresses = require("../mockAddresses.json");

module.exports = (req, res) => {
  res.status(200).json({ addresses: mockAddresses });
};
