import moment from "moment";

const calcOrganisations = (organisations, selectedWeek) => {
    let organisationsValue = organisations.length;
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
      weeks.push([`${startDateWeek} - ${endDateWeek}`]);
    }
    return weeks.reverse();
  };

  export {
    calcOrganisations,
    calcApprovedOrganisations,
    calcServices,
    calcUnapprovedOrganisation,
    calcDateRange,
  }