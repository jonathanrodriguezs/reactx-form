import React from "react";
import PropTypes from "prop-types";
import { TextField, FormControlLabel, InputLabel } from "@material-ui/core";
import { Checkbox, FormControl, Select, MenuItem } from "@material-ui/core";
import { Radio, RadioGroup, FormLabel } from "@material-ui/core";
import { Field } from "redux-form";

function Question(props) {
  return (
    <div>
      <Field component={selectInput(props.type)} {...props} />
    </div>
  );
}

function selectInput(type) {
  switch (type) {
    case "checkbox":
      return FormCheckbox;
    case "text":
    case "number":
      return FormTextField;
    case "select":
      return FormSelect;
    case "radio":
      return FormRadio;
    default:
      return null;
  }
}

function FormTextField({ label, input, meta, ...custom }) {
  const { touched, invalid, error } = meta;
  return (
    <TextField
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      fullWidth
      {...input}
      {...custom}
    />
  );
}

function FormCheckbox({ input, label }) {
  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
    />
  );
}

function FormSelect({ label, input, meta, children, options, ...custom }) {
  const { touched, error } = meta;
  return (
    <FormControl error={touched && error} style={{ minWidth: "100%" }}>
      <InputLabel>{label}</InputLabel>
      <Select {...input} {...custom} inputProps={{ name: input.name }}>
        {options.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function FormRadio({ input, label, options, ...custom }) {
  return (
    <FormControl style={{ marginTop: 15, marginBottom: -7 }}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup {...input} {...custom}>
        {options.map((option) => (
          <FormControlLabel
            key={option.label}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

Question.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "radio"]),
  required: PropTypes.bool,
  validate: PropTypes.func,
  options: PropTypes.shape({
    text: PropTypes.string
  })
};

Question.defaultProps = {
  required: false
};

export default Question;
