import React, { useState } from "react";
import "../css/Service-Request.css";

const ArrayField = ({ name, placeholder, inputs, handleChange }) => {

  const handleArrayChange = (e, idx) => {
    const newFields = inputs.map((object, objIdx) => {
      if (idx !== objIdx) {
        return object;
      }
      return { ...object, [e.target.name]: e.target.value};
    });

  }
  console.log(inputs)
  {inputs.map((input) => (
   (Object.keys(input).map((inner) => {
    console.log("here")
    console.log(input[inner])
      //console.log(inner)
    }
    ))))}
  // console.log(inputs)

  return (
    <div class="input-div">
      <label>{name}</label>
      {inputs.map((input) => (
    (Object.keys(input).map((inner) => {
            <div>
          <label>{input}</label>
          <input
          name={inner}
            type="text"
            required={true}
            //onChange={e => handleArrayChange(e, idx)}
          />
        </div>
}))))}
    </div>
  );
};

export default ArrayField;
