import React, { useState } from "react";
import "../css/Service-Request.css";

const CheckBoxField = ({ name, placeholder, handleChange }) => {
    return (
<div class="input-div">
<label>{name}</label>
      <input
        type="checkbox"
        name={name}
        placeholder={placeholder}
        value={false}
        onChange={handleChange}
      />
    </div>
);}

export default CheckBoxField;
