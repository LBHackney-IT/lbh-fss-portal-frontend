module.exports = (req, res) => {
  const { name, organisation_id } = req.body;

  //   res.status(200).json({
  //     id: 1,
  //     name,
  //     organisation_id,
  //     created_at: "2017-07-21T17:32:28Z",
  //   });

  res.status(400).json({});
};
