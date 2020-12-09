var mockServices = require("../mockServices.json");
var sample = require("lodash/sample");

module.exports = (req, res) => {
  const service = sample(mockServices);

  res.status(200).json(service);

  // res.status(404).json({});
};
