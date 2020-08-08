module.exports = (req, res) => {
  return res.status(200).send([
    { name: "Jane Doe", organisation: "Foo" },
    { name: "Joe Bloggs", organisation: "Bar" },
  ]);
};
