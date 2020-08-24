const faker = require("faker");
const sample = require("lodash/sample");
const mockUser = require("./mockUser");

const statuses = [
  "needs_review",
  "active",
  "rejected",
  "needs_reverification",
  "deleted",
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
    is_hackney_based: faker.random.boolean(),
    is_registered_charity: faker.random.boolean(),
    charity_number: faker.random.alphaNumeric().toUpperCase(),
    has_hc_or_col_grant: faker.random.boolean(),
    has_hcvs_or_hg_or_ael_grant: faker.random.boolean(),
    is_tra_registered: faker.random.boolean(),
    rsl_or_ha_association: faker.company.companyName(),
    is_lottery_funded: faker.random.boolean(),
    lottery_funded_project: faker.lorem.words(),
    funding_other: faker.lorem.sentences(2),
    has_child_support: faker.random.boolean(),
    has_child_safeguarding_lead: faker.random.boolean(),
    child_safeguarding_lead_first_name: faker.name.firstName(),
    child_safeguarding_lead_last_name: faker.name.lastName(),
    child_safeguarding_lead_training_month: faker.date.month(),
    child_safeguarding_lead_training_year: faker.date.between(2010, 2019),
    has_adult_support: faker.random.boolean(),
    has_adult_safeguarding_lead: faker.random.boolean(),
    adult_safeguarding_lead_first_name: faker.name.firstName(),
    adult_safeguarding_lead_last_name: faker.name.lastName(),
    adult_safeguarding_lead_training_month: faker.date.month(),
    adult_safeguarding_lead_training_year: faker.date.between(2010, 2019),
    has_enhanced_support: faker.random.boolean(),
    is_local_offer_listed: faker.random.boolean(),
  };

  if (!teaser) {
    organisation.reviewer = mockUser(true);
  }

  return organisation;
};
