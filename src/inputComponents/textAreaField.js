import React from "react";
import "../css/Service-Request.css";

const TextAreaField = ({name, placeholder, required, handleChange}) => (
    <div>
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