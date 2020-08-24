const fs = require("fs");
const mockUser = require("./mockUser");
const times = require("lodash/times");

let users = [];

times(101, () => {
  users.push(mockUser());
});

fs.writeFileSync("./mock-api/mockUsers.json", JSON.stringify(users, null, 2));

console.log("Successfully generated new mock users");
