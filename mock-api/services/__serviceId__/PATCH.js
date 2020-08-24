module.exports = (req, res) => {
  const { name } = req.body;

  res.status(200).json({
    id: 1,
    name,
  });
};
