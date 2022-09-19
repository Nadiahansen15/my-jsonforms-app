import React from "react";
import "../css/Service-Request.css";

const TextAreaField = ({name, placeholder, required, handleChange}) => (
    <div class="input-div">
    <label>{name}</label>
    <textarea 
    type="text"
    name={name}
    required={required}
    style={{height: "80px"}}
    autoComplete="off"
    placeholder={placeholder}
    onChange={handleChange}
    />    
    </div>
);

export default TextAreaField;