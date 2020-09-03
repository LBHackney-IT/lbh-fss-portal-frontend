const faker = require("faker");
const sample = require("lodash/sample");
const sampleSize = require("lodash/sampleSize");
const pick = require("lodash/pick");
const random = require("lodash/random");
const mockOrganisation = require("./mockOrganisation");

const statuses = ["active", "suspended", "deleted"];
const roles = ["vcso", "admin", "viewer"];

module.exports = (teaser = false) => {
  let user = {
    id: faker.random.number(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    status: sample(statuses),
    roles: sampleSize(roles, random(0, 3)),
    created_at: faker.date.between("2020-01-01", "2020-01-31"),
  };

  if (!teaser) {
    const organisation = mockOrganisation(true);
    user.organisation = pick(organisation, 'id', 'name')
  }

  return user;
};
