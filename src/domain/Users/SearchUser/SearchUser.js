import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import styled from "styled-components";
import { grey } from "../../../settings";

const StyledForm = styled.form`
  display: flex;
`;

const StyledButton = styled(Button)`
  padding: 10px;
  border-radius: 3px;
  margin-top: 5px;
`;

function SearchUser({ setSearch }) {
  const { register, handleSubmit, errors } = useForm({});

  async function doSubmit({ search }) {
    setSearch(search);
  }

  return (
    <StyledForm onSubmit={handleSubmit(doSubmit)} data-testid="form">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <FormInput
          label=""
          name="search"
          register={register}
          placeholder="Search..."
          required
          maxLength={255}
          error={errors.search}
        />
      </div>
      <div>
        <StyledButton type="submit" label="Go" disabled={false} />
      </div>
    </StyledForm>
  );
}

export default SearchUser;
