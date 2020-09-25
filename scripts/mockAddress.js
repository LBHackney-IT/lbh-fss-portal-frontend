const faker = require("faker");
const sample = require("lodash/sample");
const pick = require("lodash/pick");
const random = require("lodash/random");

module.exports = () => {
  let address = {
    latitude: faker.finance.amount(51.519865, 51.609865, 6),
    longitude: faker.finance.amount(-0.108092, -0.218092, 6),
    uprn: faker.random.number(),
    address1: faker.address.streetAddress(),
    address2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    stateProvince: faker.address.county(),
    postalCode: faker.address.zipCode(),
    country: faker.address.country(),
  };

  return address;
};
