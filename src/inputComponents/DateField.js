import React from "react";
import "../css/Service-Request.css";

const DateField = ({ name, placeholder, required, handleChange }) => (
  <div class="input-div">
    <label>{name}</label>
    <input
      type="date"
      name={name}
      required={required}
      autoComplete="off"
      placeholder={placeholder}
      onChange={handleChange}
    />
  </div>
);

export default DateField;
