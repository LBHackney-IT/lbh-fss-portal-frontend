var mockAnalytics = require("../mockAnalytics.json");

module.exports = (req, res) => {
  res.status(200).json(mockAnalytics);
  // res.status(401).json({});
};
