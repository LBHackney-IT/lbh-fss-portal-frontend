var mockTaxonomies = require("../mockTaxonomies.json");

module.exports = (req, res) => {
  const mockTaxonomyTerm = mockTaxonomies.serviceCategories[0];

  res.status(200).json(mockTaxonomyTerm);
  // res.status(401).json({});
};
