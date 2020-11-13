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
import { red, green } from "../../../settings";
import { darken } from "polished";

const StyledSaveButton = styled(Button)`
  background-color: ${green[400]};
  &:hover {
    background-color: ${darken(0.1, green[400])};
  }
  width: 100% !important;
  max-width: 438px !important;
  margin-bottom: 20px;
  ${breakpoint("sm")`
    max-width: 216px !important;
  `}
`;

const StyledDeleteButton = styled(Button)`
  background-color: ${red[400]};
  &:hover {
    background-color: ${darken(0.1, red[400])};
  }
  width: 100% !important;
  max-width: 438px !important;
  margin-bottom: 20px;
  ${breakpoint("sm")`
    max-width: 213px !important;
  `}
`;

const StyledResendButton = styled(Button)`
  color: ${green[400]};
  padding: 20px 0 !important;
  width: 100%;
  max-width: 438px;
  margin-bottom: 20px;
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
  onResendAuth = () => {},
  showDeleteButton = false,
  submitLabel = "Save",
  submitLoading = false,
  showPassword = true,
  showRoles = true,
  showEmail = true,
  showResendAuth = true,
}) => {
  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues,
  });

  let loopIteration = 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {showEmail ? (
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
      ) : null}
      <FormInput
        name="name"
        type="text"
        label="Name"
        register={register}
        error={errors.name}
        required
        maxLength={255}
      />
      {showRoles ? (
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
      ) : (
        ""
      )}
      {showPassword ? (
        <>
          <FormInput
            type="password"
            label="Password"
            name="password"
            register={register}
            maxLength={255}
            minLength={8}
            validate={{
              oneCapital: (value) => {
                if (value.length === 0) {
                  return true;
                } else {
                  return (
                    value.match(/[[A-Z]/) ||
                    "Password must contain at least one capital letter"
                  );
                }
              },
              oneNumber: (value) => {
                if (value.length === 0) {
                  return true;
                } else {
                  return (
                    value.match(/[[0-9]/) ||
                    "Password must contain at least one number"
                  );
                }
              },
              oneSpecialCharacter: (value) => {
                if (value.length === 0) {
                  return true;
                } else {
                  return (
                    value.match(/[@#$%^&+='!£*(/`~)]/) ||
                    "Password must contain at least one special character"
                  );
                }
              },
            }}
            autoComplete="new-password"
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
            autoComplete="new-password"
            error={errors.confirmPassword}
          />
        </>
      ) : (
        ""
      )}

      <div>
        <StyledActionDiv>
          <StyledSaveButton
            type="submit"
            label={submitLabel}
            disabled={submitLoading}
          />
          {showDeleteButton ? (
            <StyledDeleteButton label={"Delete account"} onClick={onDelete} />
          ) : (
            ""
          )}
        </StyledActionDiv>

        {showResendAuth ? (
          <StyledResendButton
            label={"Resend authentication details"}
            onClick={onResendAuth}
            backgroundColor="white"
            border={`1px sold ${green[400]}`}
          />
        ) : (
          ""
        )}
      </div>
    </form>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
};

export default UserForm;
