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
    JSON.stringify([...selectedAddressArray]) === JSON.stringify([undefined]) ||
    JSON.stringify([...selectedAddressArray]) === JSON.stringify([])
  );
}

const ServiceLocationsForm = ({ onSubmit, defaultValues = {} }) => {
  // defaultValues = {};

  const [selectedAddressArray, setSelectedAddressArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [addressCounter, setAddressCounter] = useState(
    defaultValues.locations ? defaultValues.locations.length : 1
  );
  const [newDefaultValues, setNewDefaultValues] = useState(defaultValues);

  useEffect(() => {
    if (Object.keys(newDefaultValues).includes("locations")) {
      newDefaultValues.locations.forEach((location) => {
        location.formattedAddress = location.address1.concat(
          ", ",
          location.address2,
          ", ",
          location.city,
          ", ",
          location.postalCode
        );
      });

      setNewDefaultValues(newDefaultValues.locations);
    }
  }, [newDefaultValues]);

  const { handleSubmit } = useForm({});

  useEffect(() => {
    setErrorMessage("");
  }, [selectedAddressArray, setErrorMessage]);

  let i = -1;

  return (
    <>
      {/* TODO: update help text */}
      {/* TODO: where will 'i can't find my address in the list' link to? */}
      <FormFieldset
        label="Service location(s)"
        help="This will be where your service(s) are located on the map. If you offer a remote service you get put in your HQ. Lorem ipsum dolor... explain they can use if you town hall location or similar..."
      ></FormFieldset>
      {[...Array(addressCounter)].map(() => {
        i++;
        return (
          <div key={i}>
            <AddAddress
              index={i}
              defaultValues={
                newDefaultValues.locations ? newDefaultValues.locations[i] : {}
              }
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
          if (selectedAddressArray.includes(undefined)) {
            return;
          }

          const cleanSelectedAddressArray = removeEmptyObjFromArrayObj(
            selectedAddressArray
          );

          if (selectedAddressArrayIsEmpty(selectedAddressArray)) {
            setErrorMessage("Please enter a location");
            return;
          }

          if (arrayOfObjhasDuplicates(cleanSelectedAddressArray)) {
            setErrorMessage("Duplicate addresses selected");
            return;
          }

          onSubmit({ locations: cleanSelectedAddressArray });
        })}
      >
        <div style={{ marginTop: "30px" }}>
          {!selectedAddressArrayIsEmpty(selectedAddressArray) ? (
            <>
              <h2 style={{ margin: "30px 0 10px 0" }}>Map Preview</h2>
              {/* <Map
                data={selectedAddressArray}
                mapStyle={{
                  margin: "0 0 30px 0",
                  width: "100%",
                  height: "400px",
                }}
              /> */}
            </>
          ) : null}
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
