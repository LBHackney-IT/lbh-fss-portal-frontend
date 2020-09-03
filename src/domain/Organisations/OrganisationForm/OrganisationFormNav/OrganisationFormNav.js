import React from "react";
import { Link } from "@reach/router";

const OrganisationFormStep = ({ stepNum, label }) => {
  return (
    <div>
      <span>{stepNum + 1}</span> {label}
    </div>
  );
};

const OrganisationFormNavItem = ({ stepNum, label, isLink, link }) => {
  return isLink ? (
    <Link to={link}>
      <OrganisationFormStep stepNum={stepNum} label={label} />
    </Link>
  ) : (
    <OrganisationFormStep stepNum={stepNum} label={label} />
  );
};

const OrganisationFormNav = ({
  stepArray,
  stepNum,
  enableAllLinks = false,
}) => {
  return (
    <nav>
      {stepArray.map((s, i) => (
        <OrganisationFormNavItem
          key={s.id}
          stepNum={i}
          label={s.label}
          link={s.link}
          isLink={enableAllLinks || stepNum > i}
        />
      ))}
    </nav>
  );
};

export default OrganisationFormNav;
