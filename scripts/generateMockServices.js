const fs = require("fs");
var faker = require("faker");

const count = 151;

let services = [];

for (let i = 0; i < count; i++) {
  const newService = {
    id: i + 1,
    name: faker.random
      .words(2)
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" "),
    author: faker.name.findName(),
  };

  services.push(newService);
}

const mockServiceFile = "./mock-api/services/mockServices.json";

fs.writeFileSync(mockServiceFile, JSON.stringify(services, null, 2));

console.log("Successfully generated new mock services");
