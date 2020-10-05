const faker = require("faker");
const sample = require("lodash/sample");
const mockUser = require("./mockUser");

const statuses = [
  "awaiting review",
  "awaiting reverification",
  "draft",
  "published",
  "rejected",
];

module.exports = (teaser = false) => {
  let organisation = {
    id: faker.random.number(),
    name: faker.company.companyName(),
    created_at: faker.date.between("2020-01-01", "2020-01-31"),
    updated_at: faker.date.between("2020-02-01", "2020-02-28"),
    submitted_at: faker.date.between("2020-03-01", "2020-01-31"),
    reviewed_at: faker.date.between("2020-04-01", "2020-01-30"),
    reviewer_message: faker.lorem.sentence(),
    status: sample(statuses),
    isHackneyBased: faker.random.boolean(),
    isRegisteredCharity: faker.random.boolean(),
    charityNumber: faker.random.alphaNumeric().toUpperCase(),
    hasHcOrColGrant: faker.random.boolean(),
    hasHcvsOrHgOrAelGrant: faker.random.boolean(),
    isTraRegistered: faker.random.boolean(),
    rslOrHaAssociation: faker.company.companyName(),
    isLotteryFunded: faker.random.boolean(),
    lotteryFundedProject: faker.lorem.words(),
    fundingOther: faker.lorem.sentences(2),
    hasChildSupport: faker.random.boolean(),
    hasChildSafeguardingLead: faker.random.boolean(),
    childSafeguardingLeadFirstName: faker.name.firstName(),
    childSafeguardingLeadLastName: faker.name.lastName(),
    childSafeguardingLeadTrainingMonth: faker.date.month(),
    childSafeguardingLeadTrainingYear: faker.date.between(2010, 2019),
    hasAdultSupport: faker.random.boolean(),
    hasAdultSafeguardingLead: faker.random.boolean(),
    adultSafeguardingLeadFirstName: faker.name.firstName(),
    adultSafeguardingLeadLastName: faker.name.lastName(),
    adultSafeguardingLeadTrainingMonth: faker.date.month(),
    adultSafeguardingLeadTrainingYear: faker.date.between(2010, 2019),
    hasEnhancedSupport: faker.random.boolean(),
    isLocalOfferListed: faker.random.boolean(),
    localOfferLink: faker.random.alphaNumeric().toUpperCase(),
  };

  if (!teaser) {
    organisation.reviewer = mockUser(true);
  }

  if (!teaser) {
    organisation.user = mockUser(true);
  }

  return organisation;
};
