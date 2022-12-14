import React from "react";
import "../css/Service-Request.css";

const DropDownSelect = ({ name, placeholder, required, val, handleChange }) => (
  <div class="input-div">
    <label>{name}</label>
    <select name={name} required={required} onChange={handleChange}>
      <option value="">Select an option</option>
      {val.map((values) => (
        <option value={values} key={values}>
          {values}
        </option>
      ))}
    </select>
  </div>
);

export default DropDownSelect;
