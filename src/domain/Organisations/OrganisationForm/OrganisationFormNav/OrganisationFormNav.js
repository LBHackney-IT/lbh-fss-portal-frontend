import React from "react";

const OrganisationFormStep = ({ stepNum, label }) => {
  return (
    <div>
      <span>{stepNum + 1}</span> {label}
    </div>
  );
};

const OrganisationFormNavItem = ({ stepNum, label, isLink, onClick }) => {
  return isLink ? (
    <button onClick={onClick}>
      <OrganisationFormStep stepNum={stepNum} label={label} />
    </button>
  ) : (
    <OrganisationFormStep stepNum={stepNum} label={label} />
  );
};

const OrganisationFormNav = ({
  stepArray,
  stepNum,
  setStepNum,
  enableAllLinks = false,
}) => {
  return (
    <nav>
      {stepArray.map((s, i) => (
        <OrganisationFormNavItem
          key={s.id}
          stepNum={i}
          label={s.label}
          isLink={enableAllLinks || stepNum > i}
          onClick={() => setStepNum(i)}
        />
      ))}
    </nav>
  );
};

export default OrganisationFormNav;
