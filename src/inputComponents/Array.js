import React from "react";
import "../css/Service-Request.css";

const Array = ({ name, placeholder, required, handleChange, el, i, removeClick }) => (
  <div class="inp">
    {console.log(i)}
      <input 
        name={name}
        type="text"
        value={el || ""}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <input
        type="button"
        value="remove"
        name={i}
        onClick={removeClick}
      />
  </div>
);

export default Array;
