import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import FormCheckbox from "../../../components/FormCheckbox/FormCheckbox";
import FormFieldset from "../../../components/FormFieldset/FormFieldset";
import { roles } from "../../../settings/roles";

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
            name="password"
            type="password"
            register={register}
            label="Password"
            error={errors.password}
          />
          <FormInput
            name="confirmPassword"
            type="password"
            register={register}
            label="Confirm password"
            error={errors.confirmPassword}
            validate={{
              passwordMatch: (value) => {
                return (
                  value === getValues().password || "Passwords should match."
                );
              },
            }}
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
      <Button type="submit" label={submitLabel} disabled={submitLoading} />
      {showDeleteButton ? (
        <Button label={"Delete account"} onClick={onDelete} />
      ) : (
        ""
      )}
    </form>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
};

export default UserForm;
