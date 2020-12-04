var mockTaxonomies = require("../mockTaxonomies.json");

module.exports = (req, res) => {
  const mockTaxonomyTerm = mockTaxonomies.taxonomies.categories[0];

  res.status(200).json(mockTaxonomyTerm);
  // res.status(401).json({});
};
