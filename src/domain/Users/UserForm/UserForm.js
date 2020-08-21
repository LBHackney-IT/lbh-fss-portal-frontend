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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="email"
        type="email"
        label="Email"
        register={register}
        error={errors.email}
        required
      />
      <FormInput
        name="name"
        type="text"
        label="Name"
        register={register}
        error={errors.name}
        required
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
          return (
            <FormCheckbox
              key={item}
              name="roles"
              label={roles[item]}
              value={item}
              register={register}
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
