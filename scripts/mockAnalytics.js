const faker = require("faker");
const sample = require("lodash/sample");

const serviceIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

module.exports = () => {
  let event = {
    id: faker.random.number(),
    serviceId: sample(serviceIds),
    timestamp: faker.date.between("2020-01-01", "2020-01-31"),
  };

  return event;
};
