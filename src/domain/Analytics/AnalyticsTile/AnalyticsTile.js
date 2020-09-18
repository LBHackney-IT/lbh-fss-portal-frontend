import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AnalyticsTile = ({ label, fetchValue, color }) => {
  const [value, setValue] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNewValue() {
      const newValue = await fetchValue();

      setValue(newValue);
      setIsLoading(false);
    }

    fetchNewValue();
  }, [setValue, setIsLoading, fetchValue]);

  if (isLoading) {
    return <span>Loading</span>;
  }

  return (
    <div>
      <div>{label}</div>
      <div>{value}</div>
    </div>
  );
};

AnalyticsTile.propTypes = {
  label: PropTypes.string,
  fetchValue: PropTypes.func,
  color: PropTypes.string,
};

export default AnalyticsTile;
