import React from "react";
import "../css/Service-Request.css";

const numberField = ({name, placeholder, required, handleChange}) => (
    <div class="input-div">
    <label>{name}</label>
    <input 
    type="number"
    name={name}
    required={required}
    autoComplete="off"
    placeholder={placeholder}
    onChange={handleChange}
    />    
    </div>
);

export default numberField;