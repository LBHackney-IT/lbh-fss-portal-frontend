const faker = require("faker");
const sample = require("lodash/sample");
const pick = require("lodash/pick");
const random = require("lodash/random");

const neighbourhoods = [
  "NE1",
  "NE2",
  "NW1",
  "NW2",
  "SE1",
  "SE2",
  "SW1",
  "SW2",
];
const neighbourhoodLabels = [
  "Springfield Park Neighbourhood",
  "Hackney Downs Neighbourhood",
  "Woodberry Wetlands Neighbourhood",
  "Clissold Park Neighbourhood",
  "Hackney Marshes Neighbourhood",
  "Well Street Common Neighbourhood",
  "London Fields Neighbourhood",
  "Shoreditch Park & The City Neighbourhood",
];

module.exports = () => {
  let address = {
    latitude: faker.finance.amount(51.519865, 51.609865, 6),
    longitude: faker.finance.amount(-0.108092, -0.218092, 6),
    uprn: faker.random.number(),
    address_1: faker.address.streetAddress(),
    address_2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    state_province: faker.address.county(),
    postal_code: faker.address.zipCode(),
    country: faker.address.country(),
    neighbourhood: sample(neighbourhoods),
    neighbourhood_label: sample(neighbourhoodLabels),
  };

  return address;
};
