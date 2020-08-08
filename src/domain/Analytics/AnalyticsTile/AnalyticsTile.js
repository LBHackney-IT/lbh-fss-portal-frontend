import React, { useState, useEffect } from "react";

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

export default AnalyticsTile;
