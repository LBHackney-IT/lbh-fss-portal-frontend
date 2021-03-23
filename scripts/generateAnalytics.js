const fs = require("fs");
const mockUser = require("./mockAnalytics");
const times = require("lodash/times");

let analytics = [];

times(301, () => {
  analytics.push(mockUser());
});

fs.writeFileSync(
  "./mock-api/mockAnalytics.json",
  JSON.stringify(analytics, null, 2)
);

console.log("Successfully generated new mock analytics");
