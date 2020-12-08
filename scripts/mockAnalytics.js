const faker = require("faker");
const sample = require("lodash/sample");

const serviceNames = [
  faker.company.companyName(),
  faker.company.companyName(),
  faker.company.companyName(),
  faker.company.companyName(),
];

module.exports = () => {
  let event = {
    id: faker.random.number(),
    serviceName: sample(serviceNames),
    timestamp: faker.date.between("2020-01-01", "2020-01-31"),
  };

  return event;
};
