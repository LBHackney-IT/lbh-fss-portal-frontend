import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import FormCheckbox from "../../../components/FormCheckbox/FormCheckbox";
import FormFieldset from "../../../components/FormFieldset/FormFieldset";
import { roles } from "../../../settings/roles";
import styled from "styled-components";
import { breakpoint } from "../../../utils/breakpoint/breakpoint";
import { red } from "../../../settings";
import { darken } from "polished";

const StyledDeleteButton = styled(Button)`
  background-color: ${red[400]};
  &:hover {
    background-color: ${darken(0.1, red[400])};
  }
`;

const StyledActionDiv = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint("sm")`
    flex-direction: row;
  `}
  & > * {
    margin-right: 10px;
    flex: 1 1 0;
    max-width: 219px;
    padding: 20px;
  }
`;

const UserForm = ({
  onSubmit,
  defaultValues = {},
  onDelete = () => {},
  showDeleteButton = false,
  submitLabel = "Save",
  submitLoading = false,
  showPassword = true,
}) => {
  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues,
  });

  let loopIteration = 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="email"
        label="Email"
        register={register}
        error={errors.email}
        required
        maxLength={255}
        validate={{
          pattern: (value) => {
            return (
              value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) ||
              "Enter a valid e-mail address"
            );
          },
        }}
      />
      <FormInput
        name="name"
        type="text"
        label="Name"
        register={register}
        error={errors.name}
        required
        maxLength={255}
      />
      {showPassword ? (
        <>
          <FormInput
            type="password"
            label="Password"
            name="password"
            register={register}
            required
            maxLength={255}
            minLength={6}
            validate={{
              oneCapital: (value) => {
                return (
                  value.match(/[[A-Z]/) ||
                  "Password must contain at least one capital letter"
                );
              },
              oneNumber: (value) => {
                return (
                  value.match(/[[0-9]/) ||
                  "Password must contain at least one number"
                );
              },
            }}
            error={errors.password}
          />
          <FormInput
            type="password"
            label="Confirm password"
            name="confirmPassword"
            register={register}
            validate={{
              passwordMatch: (value) => {
                return (
                  value === getValues().password || "Passwords should match."
                );
              },
            }}
            error={errors.confirmPassword}
          />
        </>
      ) : (
        ""
      )}
      <FormFieldset label="Roles">
        {Object.keys(roles).map((item) => {
          loopIteration++;
          return (
            <FormCheckbox
              key={item}
              name="roles"
              label={roles[item]}
              value={item}
              register={register}
              dataTestid={`checkbox-${loopIteration}`}
            />
          );
        })}
      </FormFieldset>
      <StyledActionDiv>
        <Button type="submit" label={submitLabel} disabled={submitLoading} />
        {showDeleteButton ? (
          <StyledDeleteButton label={"Delete account"} onClick={onDelete} />
        ) : (
          ""
        )}
      </StyledActionDiv>
    </form>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
};

export default UserForm;
