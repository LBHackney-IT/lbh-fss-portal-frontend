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
import { green } from "../../../../settings";

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

const StyledUprnText = styled.p`
  //
`;

const StyledHr = styled.hr`
  margin: 40px 0;
`;

function addFormattedAddress(data) {
  data.addresses.forEach((address) => {
    address["formattedAddress"] = address.address1.concat(
      ", ",
      address.city,
      ", ",
      address.postalCode
    );
  });
  return data.addresses;
}

const ServiceLocationsForm = ({
  index,
  defaultValues = {},
  setSelectedAddressArray,
  selectedAddressArray,
}) => {
  const [selectedPostcodeValue, setSelectedPostcodeValue] = useState("");
  const [selectedAddressValue, setSelectedAddressValue] = useState("");

  const [addresses, setAddresses] = useState([]);
  const [addressesIsLoading, setAddressesIsLoading] = useState(false);

  const [removePostcode, setRemovePostcode] = useState(false);

  const { register, handleSubmit, errors, getValues, watch, trigger } = useForm(
    {
      defaultValues,
    }
  );

  async function doFindAddress() {
    if (addressesIsLoading) return;

    // setAddressesIsLoading(true);
    // replace with call to api
    const data = {
      addresses: [
        {
          latitude: 51.509865,
          longitude: -0.118092,
          uprn: "200001025758",
          address1: "Desklodge House",
          address2: "Redcliffe Way",
          city: "Bristol",
          stateProvince: "Bristol",
          postalCode: "BS1 6NL",
          country: "United Kindgom",
        },
        {
          latitude: 51.809865,
          longitude: -0.198092,
          uprn: "200001025759",
          address1: "St Mary",
          address2: "Redcliffe Avenue",
          city: "Bristol",
          stateProvince: "Bristol",
          postalCode: "BS1 6NP",
          country: "United Kindgom",
        },
      ],
    };

    if (data) {
      const dataWithFormattedAddress = addFormattedAddress(data);

      setAddresses(keyBy(dataWithFormattedAddress, "formattedAddress"));
    } else {
      toast.error("Postcode could not be found.");
    }
  }

  function doUnsetPostcode() {
    setSelectedPostcodeValue("");
  }

  function doRemovePostcode() {
    setRemovePostcode(true);
  }

  if (removePostcode) return null;

  return !selectedPostcodeValue ? (
    <form
      onSubmit={handleSubmit(() => {
        let postcode = getValues().postcode.toUpperCase();

        setSelectedPostcodeValue(postcode);

        doFindAddress();
        return true;
      })}
      style={{ margin: index > 1 ? "40px 0 60px 0" : "0 0 60px 0" }}
    >
      {index > 1 ? <StyledHr /> : null}
      <FormInput
        name="postcode"
        type="text"
        label="Postcode"
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
    <form
      onSubmit={handleSubmit(() => {
        setSelectedAddressArray(
          selectedAddressArray.concat(addresses[getValues().address])
        );
        return true;
      })}
    >
      {index > 1 ? <StyledHr /> : null}
      <StyledHighlightedText>Postcode</StyledHighlightedText>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <StyledPostcodeText>{selectedPostcodeValue}</StyledPostcodeText>
        <StyledClickText onClick={doUnsetPostcode}>Change</StyledClickText>
        {index > 1 ? (
          <StyledClickText onClick={doRemovePostcode}>Remove</StyledClickText>
        ) : null}
      </div>
      <FormDropDown
        label={"Select an address"}
        name={"address"}
        register={register}
        required
        options={Object.keys(addresses).map((key) => {
          return addresses[key].formattedAddress;
        })}
        error={errors.address}
      />
      <a href="" target="_blank">
        I can't find my address in the list
      </a>
      {watch("address") ? (
        <StyledUprnText>
          UPRN: {addresses[watch("address")].uprn}
        </StyledUprnText>
      ) : null}
      {index > selectedAddressArray.length ? (
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
