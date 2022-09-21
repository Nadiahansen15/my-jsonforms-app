import React, { useState } from "react";
import "../css/Service-Request.css";
import App from "../App"

const ArrayField = ({ name, placeholder, required, handleChange }) => {
  const [values, setValues] = useState({ val: [] });

  const removeClick = (event) => {
    let vals = [...values.val];
    let index = Number(event.target.id);
    vals.splice(index, 1);
    setValues({ val: vals });
  };
  
  //handlechange function 
  function handleChangeArray(event) {
    let vals = [...values.val];
    vals[this] = event.target.value;
    setValues({ val: vals });
    console.log(values)

    return (
      <App values={values}> </App>
    )
  }

  const addClick = () => {
    setValues({ val: [...values.val, ""] });
  };

  return (
    <div class="input-div">
      <label>{name}</label>
      {values.val.map((el, i) => (
        <div key={i}>
          <input
          name={name}
            type="text"
            value={el || ""}
            placeholder={placeholder}
            // {handleChange} or {handleChangeArray.bind(i)} to change between functions
            onChange={handleChange}
          />
          <input
            type="button"
            value="remove"
            name={i}
            onClick={removeClick.bind(i)}
          />
        </div>
      ))}
      <input type="button" value="add more" onClick={addClick} />
    </div>
  );
};

export default ArrayField;
