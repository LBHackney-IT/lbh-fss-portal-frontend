module.exports = (req, res) => {
  res.status(200).json({ service_id: 1, url: "https://picsum.photos/200" });
  // res.status(400).json({});
};
