var mockAnalytics = require("../mockAddresses.json");

module.exports = (req, res) => {
  res.status(200).json(mockAnalytics);
  // res.status(401).json({});
};
