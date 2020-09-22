let mockOrganisations = require("../../mockOrganisations.json");

module.exports = (req, res) => {
  const organisations = [...mockOrganisations].filter((item) => {
    return item.status !== "rejected";
  });

  res.status(200).json(organisations[0]);
};
