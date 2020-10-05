const organisationFormFields = [
  "isHackneyBased",
  "isRegisteredCharity",
  "charityNumber",
  "hasHcOrColGrant",
  "hasHcvsOrHgOrAelGrant",
  "isTraRegistered",
  "rslOrHaAssociation",
  "isLotteryFunded",
  "lotteryFundedProject",
  "fundingOther",
  "hasChildSupport",
  "hasChildSafeguardingLead",
  "childSafeguardingLeadFirstName",
  "childSafeguardingLeadLastName",
  "childSafeguardingLeadTrainingMonth",
  "childSafeguardingLeadTrainingYear",
  "hasAdultSupport",
  "hasAdultSafeguardingLead",
  "adultSafeguardingLeadFirstName",
  "adultSafeguardingLeadLastName",
  "adultSafeguardingLeadTrainingMonth",
  "adultSafeguardingLeadTrainingYear",
  "hasEnhancedSupport",
  "isLocalOfferListed",
  "localOfferLink",
];

const organisationFormYesNoRadioFields = [
  "isHackneyBased",
  "hasChildSupport",
  "hasChildSafeguardingLead",
  "hasAdultSupport",
  "hasAdultSafeguardingLead",
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
  "everyone",
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
    value: 11,
    label: "Housing advice",
    help: "For advice on tenancy rights, accommodation and homelessness.",
  },
  {
    id: "immAdv",
    value: 12,
    label: "Immigration advice",
    help: "For help and advice on immigration, asylum and refugee status.",
  },
];

const serviceDemographicCheckboxOptions = [
  {
    id: "everyone",
    value: 999,
    label: "Everyone",
  },
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
  serviceCategoryFields,
  serviceDemographicsFields,
  serviceCategoryCheckboxOptions,
  serviceDemographicCheckboxOptions,
};
