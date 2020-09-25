import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import AddAddress from "../AddAddress/AddAddress";
import FormError from "../../../../components/FormError/FormError";
import { arrayOfObjhasDuplicates } from "../../../../utils/functions/functions";

const ServiceLocationsForm = ({ onSubmit, defaultValues = {} }) => {
  const [selectedAddressArray, setSelectedAddressArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [addressCounter, setAddressCounter] = useState(1);

  const { handleSubmit } = useForm({
    defaultValues,
  });

  useEffect(() => {
    setErrorMessage("");
  }, [selectedAddressArray, setErrorMessage]);

  let i = -1;

  return (
    <>
      <FormFieldset
        label="Service location(s)"
        help="This will be where your service(s) are located on the map. If you offer a remote service you get put in your HQ"
      ></FormFieldset>
      {[...Array(addressCounter)].map(() => {
        i++;
        return (
          <div key={i}>
            <AddAddress
              index={i}
              setSelectedAddressArray={setSelectedAddressArray}
              selectedAddressArray={selectedAddressArray}
              addressCounter={addressCounter}
              setAddressCounter={setAddressCounter}
              setErrorMessage={setErrorMessage}
            />
          </div>
        );
      })}

      <form
        onSubmit={handleSubmit(() => {
          if (
            Object.keys(selectedAddressArray).length === 0 ||
            JSON.stringify([...selectedAddressArray]) === JSON.stringify([{}])
          ) {
            setErrorMessage("Please enter a location");
            return;
          }

          if (arrayOfObjhasDuplicates(selectedAddressArray)) {
            setErrorMessage("Duplicate addresses selected");
            return;
          }

          if (selectedAddressArray.includes(undefined)) {
            return;
          }

          let cleanSelectedAddressArray = [];

          selectedAddressArray.forEach((item) => {
            if (Object.keys(item) != 0) {
              cleanSelectedAddressArray.push(item);
            }
          });

          console.log({ locations: cleanSelectedAddressArray });
          onSubmit({ locations: cleanSelectedAddressArray });
        })}
      >
        <div style={{ marginTop: "30px" }}>
          {errorMessage ? (
            <FormError error={errorMessage} marginBottom="10px" />
          ) : null}
          <Button type="submit" label="Continue ›" margin="0 0 0 0" />
        </div>
      </form>
    </>
  );
};

export default ServiceLocationsForm;
