import React from "react";
import ButtonLink from "../../../components/ButtonLink/ButtonLink";

const EmptyOrganisation = () => {
  return (
    <>
      <div>Find support services</div>
      <p>
        Complete the following steps to submit your organisation for inclusion.
      </p>
      <div>
        <div>Step One</div>
        <div>Tell us about your organisation</div>
        <p>
          You can only be added to the directory if your organisation meets our
          criteria:
        </p>
        <ul>
          <li>Your organisation operates in Hackney or City</li>
          <li>Is a registered charity or receives funding</li>
          <li>Has relevant safeguarding leads in place (if required)</li>
        </ul>
      </div>
      <div>
        <div>Step Two</div>
        <div>Tell us what you do</div>
        <p>You can add details such as:</p>
        <ul>
          <li>Your service name</li>
          <li>Descriptions about your services</li>
          <li>Contact details</li>
          <li>Your location</li>
        </ul>
      </div>
      <ButtonLink label="Get started ›" to="/organisations/add" />
    </>
  );
};

export default EmptyOrganisation;
