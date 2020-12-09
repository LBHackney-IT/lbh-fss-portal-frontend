const faker = require("faker");
const sample = require("lodash/sample");
const mockOrganisation = require("./mockOrganisation");
const mockAddress = require("./mockAddress");
const { sampleSize, random } = require("lodash");

const statuses = ["active", "suspended", "deleted"];
const vocabularies = ["category", "demographic"];

module.exports = () => {
  return {
    id: faker.random.number(),
    name: faker.company.companyName(),
    user_id: faker.random.number(),
    user_name: faker.name.findName(),
    organisation_id: faker.random.number(),
    organisation_name: faker.company.companyName(),
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
      medium: faker.image.imageUrl(),
      original: faker.image.imageUrl(),
    },
    locations: sampleSize(
      [mockAddress(), mockAddress(), mockAddress()],
      random(0, 3)
    ),
    categories: [
      {
        id: faker.random.number(),
        name: faker.company.catchPhrase(),
        description: faker.company.catchPhrase(),
        service_description: faker.company.catchPhrase(),
        vocabulary: sample(vocabularies),
        weight: faker.random.number(),
      },
    ],
    demographics: [
      {
        id: faker.random.number(),
        name: faker.company.catchPhrase(),
        description: faker.company.catchPhrase(),
        service_description: faker.company.catchPhrase(),
        vocabulary: sample(vocabularies),
        weight: faker.random.number(),
      },
    ],
  };
};
