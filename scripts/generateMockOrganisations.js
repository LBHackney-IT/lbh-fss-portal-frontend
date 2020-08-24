const fs = require("fs");
const mockOrganisation = require("./mockOrganisation");
const times = require("lodash/times");

let users = [];

times(101, () => {
  users.push(mockOrganisation());
});

fs.writeFileSync(
  "./mock-api/mockOrganisations.json",
  JSON.stringify(users, null, 2)
);

console.log("Successfully generated new mock organisations");
