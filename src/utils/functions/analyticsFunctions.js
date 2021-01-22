import moment from "moment";
const _ = require('lodash');

const checkIfIsInDateRange = (date, selectedWeek) => {
  let isInDateRange = true;

  if (selectedWeek[0] !== "All dates") {
    isInDateRange = moment
      .utc(date)
      .isBetween(selectedWeek[0], selectedWeek[1], null, "[]");
  }

  return isInDateRange;
};

const calcOrganisations = (organisations, selectedWeek) => {
  let organisationsValue = organisations.filter((organisation) => {
    const createdAtDate = moment(organisation.created_at).format("DD MMM YYYY");

    const isInDateRange = checkIfIsInDateRange(createdAtDate, selectedWeek);

    return isInDateRange;
  }).length;

  return organisationsValue;
};

const calcApprovedOrganisations = (organisations, selectedWeek) => {
  let approvedOrganisationsValue = organisations.filter((organisation) => {
    const createdAtDate = moment(organisation.created_at).format("DD MMM YYYY");

    const isInDateRange = checkIfIsInDateRange(createdAtDate, selectedWeek);

    const isApproved = organisation.status === "published";

    return isInDateRange && isApproved;
  }).length;

  return approvedOrganisationsValue;
};

const calcServices = (services, selectedWeek) => {
  let servicesValue = services.filter((organisation) => {
    const createdAtDate = moment(organisation.created_at).format("DD MMM YYYY"); // TODO: update to createdAt

    const isInDateRange = checkIfIsInDateRange(createdAtDate, selectedWeek);

    return isInDateRange;
  }).length;

  return servicesValue;
};

const calcUnapprovedOrganisation = (organisations, selectedWeek) => {
  let unpprovedOrganisationsValue = organisations.filter((organisation) => {
    const createdAtDate = moment(organisation.created_at).format("DD MMM YYYY");

    const isInDateRange = checkIfIsInDateRange(createdAtDate, selectedWeek);

    const isUnapproved =
      organisation.status !== "published" && organisation.status !== "rejected";

    return isInDateRange && isUnapproved;
  }).length;

  return unpprovedOrganisationsValue;
};

const calcNeighbourhoods = (services, neighbourhood, selectedWeek) => {

  let duplicateService = [...services];

  let i = 0;
  while (i < services.length) {
    // check if any services have multiple locations
    if (services[i].locations.length > 1) {
      // store the locations for the specific service
      const locationsArray = services[i].locations;
      // iterate through each locationsArray and push to thisService.locations
      for (const [key, value] of Object.entries(locationsArray.slice(1))) {
        // duplicate the specific service
        let thisService = {...services[i]};
        // reset the specific service locations array to be rewritten
        thisService.locations = [];
        // push specific service location object value into the empty array
        thisService.locations.push(value);
        // push thisService into duplicateService
        duplicateService.push(thisService);
      }
    }
    i++;
  }

  let neighbourhoodCount = duplicateService.filter((service) => {

    // ignore services without locations
    if (service.locations[0] !== undefined) {
      
      const createdAtDate = moment(service.created_at).format("DD MMM YYYY"); // TODO: update to createdAt

      const isInDateRange = checkIfIsInDateRange(createdAtDate, selectedWeek);

      const isNeighbourhood = service.locations[0].nhs_neighbourhood === neighbourhood;

      return isInDateRange && isNeighbourhood;
    }
  }).length;

  var neighbourhoodArray = [];
  neighbourhoodArray.count = neighbourhoodCount;
  return neighbourhoodArray;
};

const calcTotalNeighbourhoods = (services, neighbourhood) => {

  var locationArray = [];

  for (var i = 0; i < services.length; i++) {
    services[i].locations.forEach(function (item, index) {
      locationArray.push(item);
    });
  }

  var neighbourhoodCount = locationArray.reduce(function(n, val) {
    return n + (val.nhs_neighbourhood === neighbourhood);
  }, 0);

  var neighbourhoodArray = [];
  neighbourhoodArray.count = neighbourhoodCount;
  return neighbourhoodArray;
};

const calcDateRange = () => {
  var weeks = [];
  var startDate = moment(new Date(2020, 0, 1)).isoWeekday(8);
  if (startDate.date() == 8) {
    startDate = startDate.isoWeekday(-6);
  }
  var today = moment().isoWeekday("Sunday");
  while (startDate.isBefore(today)) {
    let startDateWeek = startDate.isoWeekday("Monday").format("DD MMM YYYY");
    let endDateWeek = startDate.isoWeekday("Sunday").format("DD MMM YYYY");
    startDate.add(7, "days");
    weeks.push({
      dateLabel: `${startDateWeek} - ${endDateWeek}`,
      dateRaw: [startDateWeek, endDateWeek],
    });
  }
  weeks.push({
    dateLabel: "All dates",
    dateRaw: ["All dates"],
  });
  return weeks.reverse();
};

export {
  calcOrganisations,
  calcApprovedOrganisations,
  calcServices,
  calcNeighbourhoods,
  calcTotalNeighbourhoods,
  calcUnapprovedOrganisation,
  calcDateRange,
};
