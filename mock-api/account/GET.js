module.exports = (req, res) => {
  res.status(500).json({ name: "Jane Doe", email: "test@example.com" });
};
