import { camelCase } from "lodash";

const organisationFormFields = [
  "name",
  "is_hackney_based",
  "is_registered_charity",
  "charity_number",
  "has_hc_or_col_grant",
  "has_hcvs_or_hg_or_ael_grant",
  "is_tra_registered",
  "rsl_or_ha_association",
  "is_lottery_funded",
  "lottery_funded_project",
  "funding_other",
  "has_child_support",
  "has_child_safeguarding_lead",
  "child_safeguarding_lead_first_name",
  "child_safeguarding_lead_last_name",
  "child_safeguarding_lead_training_month",
  "child_safeguarding_lead_training_year",
  "has_adult_support",
  "has_adult_safeguarding_lead",
  "adult_safeguarding_lead_first_name",
  "adult_safeguarding_lead_last_name",
  "adult_safeguarding_lead_training_month",
  "adult_safeguarding_lead_training_year",
  "has_enhanced_support",
  "is_local_offer_listed",
  "local_offer_link",
];

const organisationFormYesNoRadioFields = [
  "is_hackney_based",
  "has_child_support",
  "has_child_safeguarding_lead",
  "has_adult_support",
  "has_adult_safeguarding_lead",
];

const organisationFormCheckboxFields = [
  "is_registered_charity",
  "has_hc_or_col_grant",
  "has_hcvs_or_hg_or_ael_grant",
  "is_tra_registered",
  "is_lottery_funded",
  "is_local_offer_listed",
];

const incomingCategoriesFromNewEndpoint = [
  {
    id: 1,
    label: "Loneliness or isolation",
  },
  {
    id: 2,
    label: "Anxiety or mental health",
  },
  {
    id: 3,
    label: "Safe and healthy body ",
  },
  {
    id: 4,
    label: "Exercise and wellbeing",
  },
  {
    id: 5,
    label: "Arts and creativity ",
  },
  {
    id: 6,
    label: "Food or shopping",
  },
  {
    id: 7,
    label: "Faith-led activities",
  },
  {
    id: 8,
    label: "Money advice",
  },
  {
    id: 9,
    label: "Employment advice",
  },
  {
    id: 10,
    label: "Housing advice",
  },
  {
    id: 11,
    label: "Immigration advice",
  },
];

const incomingDemographicsFromNewEndpoint = [
  {
    id: 12,
    label: "Disabilities or autism",
  },
  {
    id: 13,
    label: "Men",
  },
  {
    id: 14,
    label: "Women",
  },
  {
    id: 15,
    label: "LGBTQI+",
  },
  {
    id: 16,
    label: "Children, young people or families",
  },
  {
    id: 17,
    label: "Older people",
  },
  {
    id: 18,
    label: "Carers",
  },
  {
    id: 19,
    label: "Cultural",
  },
];

// TODO: tidy this up

let serviceCategories = incomingCategoriesFromNewEndpoint.map(
  (category) => {
    category.name = camelCase(category.label);
    category.details = category.name.concat("Details");
    return category;
  }
);

incomingDemographicsFromNewEndpoint.unshift({
  id: 999,
  label: "Everyone",
});

let serviceDemographics = incomingDemographicsFromNewEndpoint.map(
  (demographic) => {
    demographic.name = camelCase(demographic.label);
    return demographic;
  }
);

export {
  organisationFormFields,
  organisationFormYesNoRadioFields,
  organisationFormCheckboxFields,
  serviceCategories,
  serviceDemographics,
};
