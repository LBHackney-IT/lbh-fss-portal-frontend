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

export {
  organisationFormFields,
  organisationFormYesNoRadioFields,
  organisationFormCheckboxFields,
};
