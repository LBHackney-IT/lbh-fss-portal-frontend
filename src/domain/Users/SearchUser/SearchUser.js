import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";

const StyledForm = styled.form`
  display: flex;
  width: 80%;
  ${breakpoint("sm")`
    max-width: 40%;
  `};
`;

const StyledSearchContainer = styled.div`
  display: flex;
  height: 50px;
  border-radius: 3px;
  border: 5px solid white;
  width: 100%;
`;

const StyledButton = styled.button`
  background-color: white;
  border: none;
  width: 20%;
`;

function SearchUser({ setSearch }) {
  const { register, handleSubmit, errors } = useForm({});

  async function doSubmit({ search }) {
    setSearch(search);
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit(doSubmit)} data-testid="form">
        <StyledSearchContainer>
          <input
            name="search"
            type="text"
            placeholder="Search..."
            ref={register}
            style={{ border: "none", width: "80%" }}
          />
          <StyledButton type="submit">Go</StyledButton>
        </StyledSearchContainer>
      </StyledForm>
    </>
  );
}

export default SearchUser;
