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
    max-width: 80%;
  `};
  ${breakpoint("md")`
    max-width: 40%;
  `};
`;

const StyledSearchContainer = styled.div`
  display: flex;
  height: 50px;
  border-radius: 3px;
  width: 100%;
`;

const StyledInput = styled.input`
  border: none;
  width: 100%;
  padding: 5px 10px;
`;

const StyledButton = styled.button`
  width: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: white;
  border: none;
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
