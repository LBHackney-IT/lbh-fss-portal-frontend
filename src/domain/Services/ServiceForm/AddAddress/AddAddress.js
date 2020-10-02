import React, { useState, useEffect } from "react";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import FormDropDown from "../../../../components/FormDropDown/FormDropDown";
import { useForm } from "react-hook-form";
import FormInput from "../../../../components/FormInput/FormInput";
import { postcodeValidator } from "postcode-validator";
import { toast } from "react-toastify";
import styled from "styled-components";
import { keyBy } from "lodash";
import { green } from "../../../../settings";
import ServiceService from "../../../../services/ServiceService/ServiceService";
import { addFormattedAddress } from "../../../../utils/functions/functions";

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
  margin: 5px 10px 0 0;
`;

const StyledHr = styled.hr`
  margin: 40px 0;
`;


const ServiceLocationsForm = ({
  index,
  defaultValues = {},
  setSelectedAddressArray,
  selectedAddressArray,
  addressCounter,
  setAddressCounter,
  setErrorMessage,
}) => {
  const [selectedPostcodeValue, setSelectedPostcodeValue] = useState(
    defaultValues.postalCode || ""
  );
  const [postcodeHasBeenRemoved, setPostcodeHasBeenRemoved] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addressesIsLoading, setAddressesIsLoading] = useState(false);

  const { register, handleSubmit, errors, getValues, reset, watch } = useForm();

  useEffect(() => {
    if (!defaultValues.postalCode) return;
    doFindAddress(defaultValues.postalCode);
  }, [defaultValues]);

  async function doFindAddress(postcode) {
    if (addressesIsLoading) return;

    setAddressesIsLoading(true);

    const data = await ServiceService.findAddress(postcode);

    setAddressesIsLoading(false);

    if (data) {
      const dataWithFormattedAddress = addFormattedAddress(data.addresses);

      setAddresses(keyBy(dataWithFormattedAddress, "formattedAddress"));
      reset({
        address: defaultValues.formattedAddress,
      });
    } else {
      toast.error("Postcode could not be found.");
    }
  }

  function doChangePostcode() {
    const updatedSelectedAddressArray = [...selectedAddressArray];
    updatedSelectedAddressArray[index] = {};

    setSelectedAddressArray(updatedSelectedAddressArray);

    setSelectedPostcodeValue("");
  }

  function doRemovePostcode() {
    const updatedSelectedAddressArray = [...selectedAddressArray];
    updatedSelectedAddressArray[index] = {};

    setSelectedAddressArray(updatedSelectedAddressArray);

    setSelectedPostcodeValue("");
    setPostcodeHasBeenRemoved(true);
  }

  function onDropDownChange() {
    const updatedSelectedAddressArray = [...selectedAddressArray];
    updatedSelectedAddressArray[index] = addresses[getValues().address];

    setSelectedAddressArray(updatedSelectedAddressArray);
  }

  function doAddAnotherLocation() {
    setAddressCounter((addressCounter) => addressCounter + 1);
  }

  if (addressesIsLoading) {
    return <div style={{ height: "270px" }}>Loading...</div>;
  }

  if (postcodeHasBeenRemoved)
    return (
      <form onSubmit={handleSubmit(doAddAnotherLocation)}>
        {index + 1 === addressCounter ? (
          <>
            <Button
              label="Add another location"
              margin="60px 0 10px 0"
              backgroundColor="white"
              color={green[400]}
              border={`1px solid ${green[400]}`}
              padding="13px 9px"
            />
          </>
        ) : null}
      </form>
    );

  return !selectedPostcodeValue ? (
    <form
      onSubmit={handleSubmit(() => {
        let postcode = getValues().postcode.toUpperCase();

        setSelectedPostcodeValue(postcode);

        doFindAddress(postcode);

        return true;
      })}
      style={{ margin: index > 0 ? "40px 0 60px 0" : "0 0 60px 0" }}
    >
      {index > 0 ? <StyledHr /> : null}
      <FormInput
        name="postcode"
        type="text"
        label="Postcode"
        onChange={() => setErrorMessage("")}
        register={register}
        labelStyle={{ fontWeight: "bold" }}
        validate={{
          pattern: (value) => {
            return (
              postcodeValidator(value, "UK") || "Please enter a valid postcode"
            );
          },
        }}
        error={errors.postcode}
        required
      />
      <Button type="submit" label="Find address" padding="13px 47px" />
    </form>
  ) : (
    <form onSubmit={handleSubmit(doAddAnotherLocation)}>
      {index > 0 ? <StyledHr /> : null}
      <StyledHighlightedText>Postcode</StyledHighlightedText>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <StyledPostcodeText>{selectedPostcodeValue}</StyledPostcodeText>
        <StyledClickText onClick={doChangePostcode}>Change</StyledClickText>
        {index > 0 ? (
          <StyledClickText onClick={doRemovePostcode}>Remove</StyledClickText>
        ) : null}
      </div>
      <FormDropDown
        label={"Select an address"}
        name={"address"}
        register={register}
        required
        onChange={onDropDownChange}
        options={Object.keys(addresses).map((key) => {
          return addresses[key].formattedAddress;
        })}
        error={errors.address}
      />
      <a href="" target="_blank">
        I can't find my address in the list
      </a>
      {/* {watch("address") ? (
        <p>UPRN: {addresses[watch("address")].uprn}</p>
      ) : null} */}
      {index + 1 === addressCounter ? (
        <>
          <Button
            label="Add another location"
            margin="60px 0 10px 0"
            backgroundColor="white"
            color={green[400]}
            border={`1px solid ${green[400]}`}
            padding="13px 9px"
          />
        </>
      ) : null}
    </form>
  );
};

export default ServiceLocationsForm;
