import React from "react";

const ServiceFormStep = ({ stepNum, label }) => {
  return (
    <div>
      <span>{stepNum + 1}</span> {label}
    </div>
  );
};

const ServiceFormNavItem = ({ stepNum, label, isLink, onClick }) => {
  return isLink ? (
    <button onClick={onClick}>
      <ServiceFormStep stepNum={stepNum} label={label} />
    </button>
  ) : (
    <ServiceFormStep stepNum={stepNum} label={label} />
  );
};

const ServiceFormNav = ({
  stepArray,
  stepNum,
  setStepNum,
  enableAllLinks = false,
  setShowHiddenField,
  showHiddenFieldSnapshot,
}) => {

  return (
    <nav>
      {stepArray.map((s, i) => (
        <ServiceFormNavItem
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

export default ServiceFormNav;
