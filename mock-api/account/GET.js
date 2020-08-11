module.exports = (req, res) => {
  res.status(200).json({ name: "Jane Doe", email: "test@example.com" });
};
