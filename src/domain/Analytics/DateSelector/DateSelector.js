import React, { useState } from "react";
import styled from "styled-components";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import FormError from "../../../components/FormError/FormError";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { grey } from "../../../settings";

const StyledActionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  margin-bottom: 20px;
  ${breakpoint("md")`
    flex-direction: row;
    height: 80px;
    padding: 0 10px;
    align-items: center;
    margin-bottom: 40px;
  `};

  background-color: ${grey[500]};
`;

const DatePickerContainer = styled.div`
  margin-right: 20px;
  .date-picker {
    border: 1px solid black;
    border-radius: 3px;
    padding: 10px 5px;
  }
`;

const DateSelector = ({ dateRange, setDateRange }) => {
  const [dateError, setDateError] = useState("");

  return (
    <StyledActionDiv>
      <DatePickerContainer>
        <DatePicker
          selected={dateRange.from_date}
          onChange={(date) => {
            if (date && dateRange.to_date && date > dateRange.to_date) {
              setDateError("Invalid date range");
              setDateRange({ ...dateRange, ["from_date"]: null });
              return;
            }
            setDateError("");
            setDateRange({ ...dateRange, ["from_date"]: date });
          }}
          placeholderText="From date"
          dateFormat="dd/MM/yyyy"
          isClearable
          className="date-picker"
        />
      </DatePickerContainer>
      <DatePickerContainer>
        <DatePicker
          selected={dateRange.to_date}
          onChange={(date) => {
            if (date && dateRange.from_date && dateRange.from_date > date) {
              setDateError("Invalid date range");
              setDateRange({ ...dateRange, ["to_date"]: null });
              return;
            }
            setDateError("");
            setDateRange({ ...dateRange, ["to_date"]: date });
          }}
          placeholderText="To date"
          dateFormat="dd/MM/yyyy"
          isClearable
          className="date-picker"
        />
      </DatePickerContainer>
      {dateError ? <FormError error={dateError} marginBottom="0" /> : null}
    </StyledActionDiv>
  );
};

export default DateSelector;
