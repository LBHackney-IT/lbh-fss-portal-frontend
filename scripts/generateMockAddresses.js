const fs = require("fs");
const mockAddress = require("./mockAddress");
const times = require("lodash/times");

let address = [];

times(10, () => {
  address.push(mockAddress());
});

fs.writeFileSync(
  "./mock-api/mockAddresses.json",
  JSON.stringify(address, null, 2)
);

console.log("Successfully generated new mock addresses");
