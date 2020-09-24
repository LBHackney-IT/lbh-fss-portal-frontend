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
import MainAddress from "../Experiment/MainAddress";

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

const ServiceLocationsForm = ({ onSubmit, defaultValues = {} }) => {
  return <MainAddress onSubmit={onSubmit} />;
  // const [addresses, setAddresses] = useState([]);
  // const [addressesIsLoading, setAddressesIsLoading] = useState(false);

  // const [selectedPostcodeValue, setSelectedPostcodeValue] = useState("");
  // const [selectedAddressValue, setSelectedAddressValue] = useState("");

  // const {
  //   register,
  //   handleSubmit,
  //   errors,
  //   getValues,
  //   setValue,
  //   watch,
  //   trigger,
  // } = useForm({
  //   defaultValues,
  // });

  // async function doFindAddress() {
  //   if (addressesIsLoading) return;

  //   const passValidation = await trigger();
  //   if (!passValidation) return;

  //   setSelectedPostcodeValue(getValues().postcode.toUpperCase());

  //   setAddressesIsLoading(true);
  //   // replace with call to api
  //   const data = {
  //     addresses: [
  //       {
  //         latitude: 51.509865,
  //         longitude: -0.118092,
  //         uprn: "200001025758",
  //         address1: "Desklodge House",
  //         address2: "Redcliffe Way",
  //         city: "Bristol",
  //         stateProvince: "Bristol",
  //         postalCode: "BS1 6NL",
  //         country: "United Kindgom",
  //       },
  //       {
  //         latitude: 51.809865,
  //         longitude: -0.198092,
  //         uprn: "200001025759",
  //         address1: "St Mary",
  //         address2: "Redcliffe Avenue",
  //         city: "Bristol",
  //         stateProvince: "Bristol",
  //         postalCode: "BS1 6NP",
  //         country: "United Kindgom",
  //       },
  //     ],
  //   };
  //   setAddressesIsLoading(true);

  //   if (data) {
  //     data.addresses.forEach((address) => {
  //       address["formattedAddress"] = address.address1.concat(
  //         ", ",
  //         address.city,
  //         ", ",
  //         address.postalCode
  //       );
  //     });

  //     setAddresses(keyBy(data.addresses, "formattedAddress"));
  //   } else {
  //     toast.error("Postcode could not be found.");
  //   }
  // }

  // function doUnsetPostcode() {
  //   setSelectedPostcodeValue("");
  // }

  // return (
  //   <form
  //     onSubmit={handleSubmit(() => {
  //       console.log(getValues());
  //       if (selectedAddressValue) {
  //         onSubmit(selectedAddressValue);
  //       } else {
  //         return;
  //       }
  //     })}
  //   >
  //     <FormFieldset
  //       label="Service location(s)"
  //       help="This will be where your service(s) are located on the map. If you offer a remote service you get put in your HQ"
  //     ></FormFieldset>
  //     {!selectedPostcodeValue ? (
  //       <>
  //         <FormInput
  //           name="postcode"
  //           type="text"
  //           label="Postcode"
  //           register={register}
  //           validate={{
  //             pattern: (value) => {
  //               // return true;
  //               return (
  //                 postcodeValidator(value, "UK") ||
  //                 "Please enter a valid postcode"
  //               );
  //             },
  //           }}
  //           error={errors.postcode}
  //           required
  //         />
  //         <Button
  //           type="submit"
  //           onClick={doFindAddress}
  //           label="Find address"
  //           padding="13px 47px"
  //         />
  //       </>
  //     ) : (
  //       <>
  //         <StyledHighlightedText>Postcode selected</StyledHighlightedText>
  //         <div style={{ display: "flex", marginBottom: "20px" }}>
  //           <StyledPostcodeText>{selectedPostcodeValue}</StyledPostcodeText>
  //           <StyledClickText onClick={doUnsetPostcode}>Change</StyledClickText>
  //         </div>
  //         <FormDropDown
  //           label={"Select an address"}
  //           name={"address"}
  //           register={register}
  //           required
  //           options={Object.keys(addresses).map((key) => {
  //             return addresses[key].formattedAddress;
  //           })}
  //           error={errors.address}
  //         />
  //         <a href="" target="_blank">
  //           I can't find my address in the list
  //         </a>
  //         {watch("address") ? (
  //           <StyledUprnText>
  //             UPRN: {addresses[watch("address")].uprn}
  //           </StyledUprnText>
  //         ) : null}
  //         <Button label="Add another location" margin="30px 0 10px 0" />
  //         <Button type="submit" label="Continue ›" margin="30px 0 0 0" />
  //       </>
  //     )}

  //     {/* add some condition to prevent progress until address is found */}
  //   </form>
  // );
};

export default ServiceLocationsForm;
