import React, { useState } from "react";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import FormDropDown from "../../../../components/FormDropDown/FormDropDown";
import { useForm } from "react-hook-form";
import FormInput from "../../../../components/FormInput/FormInput";
import { postcodeValidator } from "postcode-validator";
import { toast } from "react-toastify";
import styled from "styled-components";
import { keyBy } from "lodash";
import AddAddress from "./AddAddress";

const StyledHighlightedText = styled.p`
  font-size: 19px;
  font-weight: bold;
  margin: 0;
`;

const StyledPostcodeText = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 5px 10px 5px 0;
`;

const StyledClickText = styled.a`
  display: block;
  cursor: pointer;
  font-size: 16px;
  margin: 5px 0;
`;

const StyledUprnText = styled.p`
  //
`;

const MainAddress = ({ onSubmit, defaultValues = {} }) => {
  const [selectedAddressArray, setSelectedAddressArray] = useState([]);

  const [addressCounter, setAddressCounter] = useState(1);

  const { handleSubmit } = useForm({
    defaultValues,
  });

  return (
    <>
      <FormFieldset
        label="Service location(s)"
        help="This will be where your service(s) are located on the map. If you offer a remote service you get put in your HQ"
      ></FormFieldset>
      {["a", "b", "c"].map((item) => {
        return (
          <AddAddress
            key={item}
            setAddressCounter={setAddressCounter}
            addressCounter={addressCounter}
          />
        );
      })}

      <form
        onSubmit={handleSubmit(() => {
          if (selectedAddressArray.length > 0) {
            onSubmit(selectedAddressArray);
          } else {
            return;
          }
        })}
      >
        <Button type="submit" label="Continue ›" margin="30px 0 0 0" />
      </form>
    </>
  );
};

export default MainAddress;
