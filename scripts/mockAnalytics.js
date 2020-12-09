const faker = require("faker");
const sample = require("lodash/sample");

const serviceNames = [
  "Schulist, Turner and Corwin",
  "Jacobson, Wisoky and Cormier",
  "Barrows, Homenick and Jerde",
  "Abbott Inc",
];

module.exports = () => {
  let event = {
    id: faker.random.number(),
    serviceName: sample(serviceNames),
    timestamp: faker.date.between("2020-11-01", "2021-01-31"),
  };

  return event;
};
