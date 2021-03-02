import React, {useState} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { neutral, red } from "../../settings";
import FormError from "../FormError/FormError";
import { grey } from "../../settings";

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 19px;
  color: black;
`;

const StyledTextarea = styled.textarea`
  resize: none;
  margin: 0 0 20px 0;
  max-width: 438px;
  width: 100%;
  border: 1px solid ${neutral[ 500 ]};
  padding: 15px;
`;

const StyledHelp = styled.p`
  color: ${grey[ 400 ]};
  margin: 5px 0 20px 0;
`;

const counterColourNormal = `${grey[400]}`;
const counterColourWarning = 'red';

const StyledTextboxCharacterCounterLabel = styled.label`
  display: block;
  width: x;
  height: y;
  text-align: right;
  color: ${counterColourNormal};
  font-size: 10px;
  padding: 0px;
`;

const StyledTextboxCharacterCounterWarningLabel = styled.label`
  display: block;
  width: x;
  height: y;
  text-align: right;
  color: ${counterColourWarning};
  font-size: 10px;
  padding: 0px;
`;

const Counter = ({ count, max }) => {
  let counter;
  if(count <= max)
  {
    counter = <StyledTextboxCharacterCounterLabel>{count ? count : 0}/{max}</StyledTextboxCharacterCounterLabel>;
  }
  else
  {
    counter =  <StyledTextboxCharacterCounterWarningLabel>{count ? count : 0}/{max}</StyledTextboxCharacterCounterWarningLabel>;
  }
  return counter
};

const FormTextbox = ( {
  name,
  label,
  register,
  required,
  maxLength,
  minLength,
  error,
  inputRef,
  validate,
  help,
  placeholder,
  labelStyle,
  textAreaStyle,
  rows = "5",
  cols = "10",
  spellCheck = "true",
  count,
  setCount,
  showCounter,
  onChange = () => {
    if ( showCounter && name ) {
      let box = document.getElementById( name );
      if ( box ) setCount( box.value.length );
    }
  },
} ) => {
  return (
    <>
      <StyledLabel htmlFor={ name } style={ labelStyle }>
        { label }
      </StyledLabel>
      { help ? <StyledHelp>{ help }</StyledHelp> : "" }
      <StyledTextarea
        onChange={ onChange }
        aria-label={ name }
        name={ name }
        id={ name }
        rows={ 8 }
        cols={ 32 }
        placeholder={ placeholder }
        ref={ ( e ) => {
          register( e, { required, minLength, maxLength, validate } );
          if ( inputRef ) inputRef.current = e;
        } }
        aria-invalid={ error ? "true" : "false" }
        spellCheck={ spellCheck }
        style={ textAreaStyle }
      />
      { showCounter && count > 0 ? <Counter count={count} max={maxLength}/> : "" }
      { error && error.type === "required" && (
        <FormError error={ `${label} is required.` } />
      ) }
      { error && error.type === "maxLength" && (
        <FormError error={ `Max length of ${maxLength} characters exceeded.` } />
      ) }
      { error && error.type === "minLength" && (
        <FormError
          error={ `${label} must be at least ${minLength} characters` }
        />
      ) }
      { error && error.message && <FormError error={ error.message } /> }
    </>
  );
};

FormTextbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.func,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  error: PropTypes.object,
  textAreaStyle: PropTypes.object,
  inputRef: PropTypes.object,
};

export default FormTextbox;
