var mockTaxonomies = require("../mockTaxonomies.json");

module.exports = (req, res) => {
  res.status(200).json(mockTaxonomies);
  // res.status(401).json({});
};
