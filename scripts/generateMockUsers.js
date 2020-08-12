const fs = require("fs");
var faker = require("faker");
var sample = require("lodash/sample");
var sampleSize = require("lodash/sampleSize");
var random = require("lodash/random");

const count = 101;

let users = [];

const statuses = ["active"];
const roles = ["vsco_contributer", "hackney_admin", "hackney_viewer"];

for (let i = 0; i < count; i++) {
  const newUser = {
    id: i + 1,
    name: faker.name.findName(),
    email: faker.internet.email(),
    organisation: {
      name: faker.company.companyName(),
    },
    statuses: sample(statuses),
    roles: sampleSize(roles, random(0, 3)),
  };

  users.push(newUser);
}

const mockUserFile = "./mock-api/users/mockUsers.json";

fs.writeFileSync(mockUserFile, JSON.stringify(users, null, 2));

console.log("Successfully generated new mock users");
