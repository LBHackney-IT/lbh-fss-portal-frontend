const fs = require("fs");
const mockService = require("./mockService");
const times = require("lodash/times");

let services = [];

times(151, () => {
  services.push(mockService());
});

fs.writeFileSync(
  "./mock-api/mockServices.json",
  JSON.stringify(services, null, 2)
);

console.log("Successfully generated new mock services");
