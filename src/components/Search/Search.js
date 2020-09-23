import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { breakpoint } from "../../utils/breakpoint/breakpoint";
import SVGIcon from "../SVGIcon/SVGIcon";
import { ReactComponent as SearchIcon } from "./icons/SearchBtn.svg";

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  ${breakpoint("sm")`
    width: 80%;
    max-width: 40%;
  `};
`;

const StyledSearchContainer = styled.div`
  display: flex;
  height: 50px;
  border-radius: 3px;
  /* border: 5px solid white; */
  width: 100%;
`;

const StyledInput = styled.input`
  border: none;
  width: 80%;
  padding: 5px 10px;
`;

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: white;
  border: none;
  width: 20%;
  padding: 0;
  cursor: pointer;
`;

function Search({ setSearch }) {
  const { register, handleSubmit } = useForm({});

  async function doSubmit({ search }) {
    setSearch(search);
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit(doSubmit)} data-testid="form">
        <StyledSearchContainer>
          <StyledInput
            name="search"
            type="text"
            placeholder="Search..."
            ref={register}
          />
          <StyledButton type="submit">
            <SVGIcon SVGComponent={SearchIcon} top={"5px"} right={"5px"} />
          </StyledButton>
        </StyledSearchContainer>
      </StyledForm>
    </>
  );
}

export default Search;
