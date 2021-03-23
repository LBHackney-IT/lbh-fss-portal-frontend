var mockAnalytics = require("../mockAnalytics.json");

module.exports = (req, res) => {
  const { from_date, to_date } = req.query;

  let filteredMockAnalytics = [];

  if (from_date && to_date) {
    filteredMockAnalytics = mockAnalytics.filter((event) => {
      return event.timestamp >= from_date && event.timestamp <= to_date;
    });
  } else if (from_date) {
    filteredMockAnalytics = mockAnalytics.filter((event) => {
      return event.timestamp >= from_date;
    });
  } else if (to_date) {
    filteredMockAnalytics = mockAnalytics.filter((event) => {
      return event.timestamp <= to_date;
    });
  } else {
    filteredMockAnalytics = mockAnalytics;
  }

  res.status(200).json(filteredMockAnalytics);
  // res.status(200).json([]);
  // res.status(401).json({});
};
