const mockOrganisations = require("../../mockOrganisations.json");
var sample = require("lodash/sample");

module.exports = (req, res) => {
  const mockOrganisation = sample(mockOrganisations);

  res.status(200).json(mockOrganisation);
  // res.status(400).json({});
};
