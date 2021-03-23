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

const serviceCategoryFields = [
  "lonOrIs",
  "lonOrIsDetails",
  "anxOrMH",
  "anxOrMHDetails",
  "safeAndHB",
  "safeAndHBDetails",
  "exAndWell",
  "exAndWellDetails",
  "artAndCrtv",
  "artAndCrtvDetails",
  "foodOrShop",
  "foodOrShopDetails",
  "faithAct",
  "faithActDetails",
  "monAdv",
  "monAdvDetails",
  "emplAdv",
  "emplAdvDetails",
  "houseAdv",
  "houseAdvDetails",
  "immAdv",
  "immAdvDetails",
];

const serviceDemographicsFields = [
  "disbOrAut",
  "men",
  "women",
  "lgbtqi",
  "chilYoungFam",
  "oldPe",
  "carers",
  "cultural",
];

const serviceCategoryCheckboxOptions = [
  {
    id: "lonOrIs",
    value: 1,
    label: "Loneliness or isolation",
    help: "For a friendly chat or advice on everyday living.",
  },
  {
    id: "anxOrMH",
    value: 2,
    label: "Anxiety or mental health",
    help: "For any mental health issues you or your loved ones are facing.",
  },
  {
    id: "safeAndHB",
    value: 3,
    label: "Safe and healthy body ",
    help: "For medical conditions, addictions or safety concerns.",
  },
  {
    id: "exAndWell",
    value: 4,
    label: "Exercise and wellbeing",
    help: "For getting fit and healthy through exercise that works for you.",
  },
  {
    id: "artAndCrtv",
    value: 5,
    label: "Arts and creativity ",
    help: "For classes and education that improve emotional wellbeing. ",
  },
  {
    id: "foodOrShop",
    value: 6,
    label: "Food or shopping",
    help: "For foodbanks, hot food or grocery provision.",
  },
  {
    id: "faithAct",
    value: 7,
    label: "Faith-led activities",
    help: "For activites and groups focussing on religion or spirituality.",
  },
  {
    id: "monAdv",
    value: 8,
    label: "Money advice",
    help: "For information and guiance on debt, benefits and finances.",
  },
  {
    id: "emplAdv",
    value: 9,
    label: "Employment advice",
    help: "For help with finding a job, careers and employment rights.",
  },
  {
    id: "houseAdv",
    value: 10,
    label: "Housing advice",
    help: "For advice on tenancy rights, accommodation and homelessness.",
  },
  {
    id: "immAdv",
    value: 11,
    label: "Immigration advice",
    help: "For help and advice on immigration, asylum and refugee status.",
  },
];

const serviceDemographicCheckboxOptions = [
  {
    id: "disbOrAut",
    value: 12,
    label: "Disabilities or autism",
  },
  {
    id: "men",
    value: 13,
    label: "Men",
  },
  {
    id: "women",
    value: 14,
    label: "Women",
  },
  {
    id: "lgbtqi",
    value: 15,
    label: "LGBTQI+",
  },
  {
    id: "chilYoungFam",
    value: 16,
    label: "Children, young people or families",
  },
  {
    id: "oldPe",
    value: 17,
    label: "Older people",
  },
  {
    id: "carers",
    value: 18,
    label: "Carers",
  },
  {
    id: "cultural",
    value: 19,
    label: "Cultural",
  },
];

export {
  organisationFormFields,
  organisationFormYesNoRadioFields,
  organisationFormCheckboxFields,
};
