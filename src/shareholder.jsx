import React, { useState } from "react";
import ReactDOM from "react-dom";

function IncorporationForm() {
    
    const [fields, setFields] = useState([{ name: "" }]);
    const [name, setName] = useState("Admins")

 const handleShareholderNameChange = idx => evt => {
    const newFields = fields.map((field, sidx) => {
      if (idx !== sidx) return field;
      return { ...field, name: evt.target.value };
    });

    setFields(newFields);
  };

  const handleSubmit = evt => {
    alert(`Incorporated: ${name} with ${fields.length} fields`);
  };

  const handleAddShareholder = () => {
    setFields(fields.concat([{ name: "" }]));
  };

  const handleRemoveShareholder = idx => () => {
    setFields(fields.filter((s, sidx) => idx !== sidx));
  };

    return (
      <form onSubmit={handleSubmit}>
        <h4>Shareholders</h4>

        {this.state.shareholders.map((shareholder, idx) => (
          <div className="shareholder">
            <input
              type="text"
              placeholder={`Shareholder #${idx + 1} name`}
              value={shareholder.name}
              onChange={handleShareholderNameChange(idx)}
            />
            <button
              type="button"
              onClick={handleRemoveShareholder(idx)}
              className="small"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddShareholder}
          className="small"
        >
          Add Shareholder
        </button>
        <button>Incorporate</button>
      </form>
    );
}
export default IncorporationForm;
