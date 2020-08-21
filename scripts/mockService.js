const faker = require("faker");
const sample = require("lodash/sample");
const mockOrganisation = require("./mockOrganisation");

const statuses = ["active", "suspended", "deleted"];

module.exports = () => {
  return {
    id: faker.random.number(),
    name: faker.company.companyName(),
    status: sample(statuses),
    created_at: faker.date.between("2020-01-01", "2020-01-31"),
    updated_at: faker.date.between("2020-02-01", "2020-02-28"),
    description: faker.company.catchPhrase(),
    website: faker.internet.url(),
    email: faker.internet.email(),
    telephone: faker.phone.phoneNumber(),
    facebook: faker.random.word(1),
    twitter: faker.random.word(1),
    instagram: faker.random.word(1),
    linkedin: faker.random.word(1),
    keywords: faker.random.words(8).split(" ").join(","),
    referral_link: faker.internet.url(),
    referral_email: faker.internet.email(),
    image: {
      id: faker.random.number(),
      url: faker.image.imageUrl(),
    },
    organisation: mockOrganisation(true),
  };
};
