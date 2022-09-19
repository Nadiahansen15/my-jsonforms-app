import React from "react";
import "../css/Service-Request.css";

const EmailField = ({ name, placeholder, required, handleChange }) => (
  <div class="input-div">
    <label>{name}</label>
    <input
      type="email"
      name={name}
      required={required}
      autoComplete="off"
      placeholder={placeholder}
      onChange={handleChange}
    />
  </div>
);

export default EmailField;
