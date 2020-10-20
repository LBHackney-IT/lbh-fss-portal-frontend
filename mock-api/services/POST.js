var mockServices = require("../mockServices.json");
var sample = require("lodash/sample");

module.exports = (req, res) => {
  const service = sample(mockServices);

  if (service) {
    res.status(200).json(service);
  } else {
    res.status(404).json({});
  }
};
