import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { useForm } from "react-hook-form";
import FormFieldset from "../../../../components/FormFieldset/FormFieldset";
import Button from "../../../../components/Button/Button";
import AddAddress from "../AddAddress/AddAddress";
import FormError from "../../../../components/FormError/FormError";
import {
  arrayOfObjhasDuplicates,
  removeEmptyObjFromArrayObj,
} from "../../../../utils/functions/functions";
import Map from "../Map/Map";

function selectedAddressArrayIsEmpty(selectedAddressArray) {
  return (
    Object.keys(selectedAddressArray).length === 0 ||
    JSON.stringify([...selectedAddressArray]) === JSON.stringify([{}]) ||
    JSON.stringify([...selectedAddressArray]) === JSON.stringify([undefined])
  );
}

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
          if (selectedAddressArrayIsEmpty(selectedAddressArray)) {
            setErrorMessage("Please enter a location");
            return;
          }

          if (selectedAddressArray.includes(undefined)) {
            return;
          }

          const cleanSelectedAddressArray = removeEmptyObjFromArrayObj(
            selectedAddressArray
          );

          if (arrayOfObjhasDuplicates(cleanSelectedAddressArray)) {
            setErrorMessage("Duplicate addresses selected");
            return;
          }

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
      {!selectedAddressArrayIsEmpty(selectedAddressArray) ? (
        <Map
          data={selectedAddressArray}
          mapStyle={{ width: "100%", height: "400px", marginTop: "30px" }}
        />
      ) : null}
    </>
  );
};

export default ServiceLocationsForm;
