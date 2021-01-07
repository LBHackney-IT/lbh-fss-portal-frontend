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

  let neighbourhoodsValue = services.filter((service) => {
    const createdAtDate = moment(service.created_at).format("DD MMM YYYY"); // TODO: update to createdAt

    const isInDateRange = checkIfIsInDateRange(createdAtDate, selectedWeek);

    // console.log(organisation);
    // console.log(service.locations);
    // for (var i = 0; i < service.locations.length; i++) {
    // for (var prop in service.locations) {
      var location = service.locations.map(location => location.neighbourhood);
      const isNeighbourhood = location.includes(neighbourhood);
    // }
    // console.log(test);

    // if(typeof test !== "undefined") {
    //   isNeighbourhood = test.includes(neighbourhood);
    //   // console.log(find);
    // }
    

    // console.log(organisation);
    console.log(isNeighbourhood);

    return isInDateRange && isNeighbourhood;
  }).length;

  return neighbourhoodsValue;
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
  calcUnapprovedOrganisation,
  calcDateRange,
};
