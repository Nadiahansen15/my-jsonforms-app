import React from "react";
import "../css/Service-Request.css";

const CheckBoxField = ({name, placeholder, required, val, handleChange}) => (
    <div>
    {val.map(values =>  
    <div>
    <label>{values}</label>
    <input 
    type="Checkbox"
    name={name}
    required={required}
    placeholder={placeholder}
    onChange={handleChange}
    />   
    </div>
    )}
    </div>
    
);

export default CheckBoxField;