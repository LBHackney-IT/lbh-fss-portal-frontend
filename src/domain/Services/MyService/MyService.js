import React, { useState, useContext } from "react";
import { Redirect } from "@reach/router";
import UserContext from "../../../context/UserContext/UserContext";
import AddService from "../AddService/AddService";
import { ReactComponent as Trash } from "./icons/trash.svg";

const MyService = ({ userServices }) => {
  const user = useContext(UserContext)[0];

  const [removeIsLoading, setRemoveIsLoading] = useState(false);
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false);

  function toggleRemoveModal() {
    if (removeIsLoading) return;

    setRemoveModalIsOpen(!removeModalIsOpen);
  }

  async function doRemove() {
    alert("remove service");
  }

  let actions = [
    {
      title: "Remove",
      onClick: toggleRemoveModal,
      icon: Trash,
    },
  ];

  return (
    // ServicesTable
    <>
      <h1>Show service edit form here</h1>
      <ul>
        <li>service1 | actions</li>
        <li>service2 | actions</li>
        <li>service3 | actions</li>
      </ul>
    </>
  );
};

export default MyService;
