module.exports = (req, res) => {
  const { name, email, roles } = req.body;

  res.status(200).json({
    id: 1,
    name,
    email,
    roles,
  });
};
