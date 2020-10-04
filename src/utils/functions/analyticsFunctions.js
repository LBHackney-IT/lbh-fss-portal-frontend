import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const calcOrganisations = (organisations, selectedWeek) => {
  let organisationsValue = organisations.filter((organisation) => {
    const createdAtDate = moment(organisation.createdAt).format("DD MMM YYYY");

    console.log("createdAtDate");
    console.log(moment.utc(createdAtDate));
    console.log("temp0");
    console.log(moment.utc(selectedWeek[0]));
    console.log("temp1");
    console.log(moment.utc(selectedWeek[1]));
    console.log(
      moment
        .utc(createdAtDate)
        .isBetween(
          moment.utc(selectedWeek[0]),
          moment.utc(selectedWeek[1]),
          null,
          "[]"
        )
    );

    // console.log("----- TEST -----");
    // console.log(createdAtDate.isBetween("2020-01-10", "2020-02-10"));

    return moment(createdAtDate).isBetween(
      moment(selectedWeek[0]),
      moment(selectedWeek[1])
    );
    //   selectedWeek.dateRaw.contains(createdAtDate) &&
    //   selectedWeekArray.includes(createdAtDate) &&
    //   organisation.status === "published"
  }).length;

  return organisationsValue;
};

const calcApprovedOrganisations = (organisations, selectedWeek) => {
  let approvedOrganisationsValue = organisations.filter((organisation) => {
    return organisation.status === "published";
  }).length;

  return approvedOrganisationsValue;
};

const calcServices = (services, selectedWeek) => {
  let servicesValue = services.length;
  return servicesValue;
};

const calcUnapprovedOrganisation = (organisations, selectedWeek) => {
  let unpprovedOrganisationsValue = organisations.filter((organisation) => {
    return (
      organisation.status !== "published" && organisation.status !== "rejected"
    );
  }).length;

  return unpprovedOrganisationsValue;
};

const calcDateRange = () => {
  var weeks = [];
  var startDate = moment(new Date(2017, 0, 1)).isoWeekday(8);
  if (startDate.date() == 8) {
    startDate = startDate.isoWeekday(-6);
  }
  var today = moment().isoWeekday("Sunday");
  while (startDate.isBefore(today)) {
    let startDateWeek = startDate.isoWeekday("Monday").format("DD MMM YYYY");
    let endDateWeek = startDate.isoWeekday("Sunday").format("DD MMM YYYY");
    startDate.add(7, "days");
    // const day = 60 * 60 * 24 * 1000;
    // const startDateInDateFormat = new Date(startDate);
    weeks.push({
      dateLabel: `${startDateWeek} - ${endDateWeek}`,
      dateRaw: [moment.utc(startDateWeek), moment.utc(endDateWeek)],

      // new Date(startDateWeek),
      // new Date(endDateWeek),
      // moment().range(new Date(startDateWeek), new Date(endDateWeek)),

      // new Date(startDate.clone().subtract(13, "days")),
      // new Date(startDate.clone().subtract(12, "days")),
      // new Date(startDate.clone().subtract(11, "days")),
      // new Date(startDate.clone().subtract(10, "days")),
      // new Date(startDate.clone().subtract(9, "days")),
      // new Date(startDate.clone().subtract(8, "days")),
      // new Date(startDate.clone().subtract(7, "days")),
      // // -----
      // new Date(startDateInDateFormat.getTime() - 13 * day),
      // new Date(startDateInDateFormat.getTime() - 12 * day),
      // new Date(startDateInDateFormat.getTime() - 11 * day),
      // new Date(startDateInDateFormat.getTime() - 10 * day),
      // new Date(startDateInDateFormat.getTime() - 9 * day),
      // new Date(startDateInDateFormat.getTime() - 8 * day),
      // new Date(startDateInDateFormat.getTime() - 7 * day),
    });
  }
  //   console.log("WEEKS");
  //   console.log(weeks);
  return weeks.reverse();
};

export {
  calcOrganisations,
  calcApprovedOrganisations,
  calcServices,
  calcUnapprovedOrganisation,
  calcDateRange,
};
