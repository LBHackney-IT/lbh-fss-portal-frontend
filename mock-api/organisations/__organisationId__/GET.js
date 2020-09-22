var mockOrganisations = require("../../mockOrganisations.json");

module.exports = (req, res) => {
  const { organisationId } = req.params;

  const organisation = mockOrganisations.find(
    (organisation) => organisation.id === parseInt(organisationId)
  );

  if (organisation) {
    res.status(200).json(organisation);
  } else {
    res.status(404).json({});
  }
};
