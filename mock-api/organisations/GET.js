let mockOrganisations = require("../mockOrganisations.json");

module.exports = (req, res) => {
  const sort = req.query.sort || "name";
  const direction = req.query.direction || "asc";
  const search = req.query.search || "";
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 10;

  const cleanString = (input) => input.trim().toLowerCase();

  const searchClean = cleanString(search);

  const organisations = [...mockOrganisations]
    .filter((item) => {
      return search.length
        ? cleanString(item.name).includes(searchClean)
        : true;
    })
    .sort(function (a, b) {
      return direction.toLowerCase() === "asc"
        ? a[sort].localeCompare(b[sort])
        : b[sort].localeCompare(a[sort]);
    })
    .slice(offset, limit);

  return res.status(200).send({ organisations: organisations });
};
