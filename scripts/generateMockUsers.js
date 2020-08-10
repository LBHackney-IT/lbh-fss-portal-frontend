const fs = require("fs");
var faker = require("faker");

const count = 101;

let users = [];

for (let i = 0; i < count; i++) {
  const newUser = {
    id: i,
    name: faker.name.findName(),
    organisation: faker.company.companyName(),
  };

  users.push(newUser);
}

const mockUserFile = "./mock-api/users/mockUsers.json";

fs.writeFileSync(mockUserFile, JSON.stringify(users, null, 2));

console.log("Successfully generated new mock users");
