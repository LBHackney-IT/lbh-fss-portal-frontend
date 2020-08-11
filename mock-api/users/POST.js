module.exports = (req, res) => {
  const { name, email, organisation, roles } = req.body;

  res.status(200).json({
    id: 1,
    name,
    email,
    roles,
    organisation: {
      name: organisation.name,
    },
  });
};
