import React, { useState, useRef } from "react";
import { useEffect } from "react";
import "./css/sidebar.css";
import InputTextField from "./inputComponents/InputTextField";
import TextAreaField from "./inputComponents/textAreaField";
import DropDownSelect from "./inputComponents/DropDownSelect";
import CheckBoxField from "./inputComponents/CheckBoxField";
import NumberField from "./inputComponents/numberField";
import ArrayField from "./inputComponents/ArrayField";
import EmailField from "./inputComponents/EmailField";
import DateField from "./inputComponents/DateField";
import Array from "./inputComponents/Array"

function App() {
  const [value, setValue] = useState("");
  const [schema, setSchema] = useState("");
  const [choice, setChoice] = useState("");
  const [ContentVisible, setContentVisible] = useState(false);
  const [Data, setData] = useState("");
  const [input, setInput] = useState([""]);
  const resultSection = useRef(null);

  function importAll(r) {
    let files = {};
    r.keys().map((item) => {
      files[item.replace("./", "")] = r(item);
    });
    return files;
  }

  const files = importAll(
    require.context("./Service-Requests/", true, /\.json$/)
  );

  function submitForm(event) {
    event.preventDefault();
    setValue({ ...value })
    console.log(value);
    setSchema(value);
  }

  // HANDLE ARRAY AND OTHER INPUTS
  const handleChange = (event, input_type) => {
    event.preventDefault();
    // UPDATE ARRAY / HANDLE CHANGE
    if (input_type === "array") {
      //let vals = [...value.event.target.name];
      let vals = [...value.DevOps];
      vals[this] = event.target.value;
      setValue({ DevOps: vals });
      //setValue({ ...value, [event.currentTarget.name]: vals })
      console.log(value);
    } else {
      const inputs =
        event.currentTarget.type === "checkbox" ? event.currentTarget.checked : event.currentTarget.value
      setValue({ ...value, [event.currentTarget.name]: inputs });
      console.log(value);
    };
  }
    // REMOVE FROM ARRAY
  const removeClick = (event) => {
    //let vals = [...value.(event.target.name))];
    let vals = [...value.DevOps];
    let index = Number(event.target.id);
    vals.splice(index, 1);
    // setValue({ event.target.name: vals });
    setValue({ DevOps: vals });
  };

    // ADD TO ARRAY
  const addClick = (event) => {
    //setValue({ event.target.name: [...value.(event.target.name)), ""] });
    setValue({ DevOps: [...value.DevOps, ""] });
  };

  function PrettyPrint(props) {
    return <pre>{JSON.stringify(props.jsonObj, null, 2)}</pre>;
  }

  function handleOnChangeNavBar(title) {
    console.log(title)
    Object.keys(files).forEach((key) => {
      if (files[key].title === title) {
        setData(files[key]);
        setInput(files[key].Input);
        setValue("")
        // ADD ARRAYS FROM BEGINNING
        {
          Object.values(files[key].Input).map((form) => {
            console.log(form.input_type)
            if (form.input_type === "array") {
              if (!(Object.keys(value).includes(form.name))) {
                setValue({ ...value, [form.name]: [""] })
                console.log(value)
              }
            }
          }
          )
        }
      }
    });
    setChoice(title);
    setSchema("");
  };

  useEffect(() => {
    choice ? setContentVisible(true) : setContentVisible(false);
  }, [choice]);

  return (
    <div class='page-wrapper'>
      <div class='row'>
        <div class='column'>
          <div className="sidenav" >
            <h1>Service Requests</h1>
            {Object.keys(files).map((key) => (
              <p className={`list-item${choice === files[key].title ? ' selected' : ''}`} class="list-item" value={files[key].title} key={files[key].title} onClick={() => handleOnChangeNavBar(files[key].title)}>
                {files[key].title}</p>

            ))}
          </div>
        </div>
        <div class='double-column'>
          {ContentVisible && (
            <div>
              <h1>{Data.title}</h1>
              <p>{Data.description}</p>
              <p>
                <strong>Authorization Scope:</strong> {Data.AuthorizationScope}{" "}
              </p>
              <p>
                <strong>Request Type:</strong> {Data.requestType}{" "}
              </p>
              <p>
                <strong>Complexity:</strong> {Data.Complexity}{" "}
              </p>
              <p>
                <strong>Note:</strong> {Data.note}{" "}
              </p>
              <h3>Input</h3>
              <form onSubmit={submitForm} >
                {Object.keys(input).map((form) => {
                  if (input[form].input_type === "text") {
                    return (
                      <div>
                        <InputTextField
                          name={input[form].name}
                          placeholder={input[form].placeholder}
                          required={input[form].required}
                          key={input[form].placeholder}
                          handleChange={handleChange}
                        />
                      </div>
                    );
                  }
                  if (input[form].input_type === "email") {
                    return (
                      <div>
                        <EmailField
                          name={input[form].name}
                          placeholder={input[form].placeholder}
                          required={input[form].required}
                          key={input[form].placeholder}
                          handleChange={handleChange}
                        />
                      </div>
                    );
                  }
                  if (input[form].input_type === "date") {
                    return (
                      <div>
                        <DateField
                          name={input[form].name}
                          placeholder={input[form].placeholder}
                          required={input[form].required}
                          key={input[form].placeholder}
                          handleChange={handleChange}
                        />
                      </div>
                    );
                  }
                  if (input[form].input_type === "big_text") {
                    return (
                      <div>
                        <TextAreaField
                          name={input[form].name}
                          placeholder={input[form].placeholder}
                          required={input[form].required}
                          key={input[form].placeholder}
                          handleChange={handleChange}
                        />
                      </div>
                    );
                  }
                  if (input[form].input_type === "dropdown") {
                    return (
                      <DropDownSelect
                        name={input[form].name}
                        placeholder={input[form].placeholder}
                        required={input[form].required}
                        val={input[form].values}
                        key={input[form].placeholder}
                        handleChange={handleChange}
                      />
                    );
                  }
                  if (input[form].input_type === "number") {
                    return (
                      <NumberField
                        name={input[form].name}
                        placeholder={input[form].placeholder}
                        required={input[form].required}
                        key={input[form].placeholder}
                        handleChange={handleChange}
                      />
                    );
                  }
                  if (input[form].input_type === "checkbox") {
                    return (
                      <CheckBoxField
                        name={input[form].name}
                        placeholder={input[form].placeholder}
                        required={input[form].required}
                        key={input[form].placeholder}
                        handleChange={handleChange}
                      />
                    );
                  }
                  if (input[form].input_type === "arrauy") {
                    if (!(Object.keys(value).includes(input[form].name))) {
                      setValue({ ...value, [input[form].name]: [] })
                    }
                    return (
                      <div>
                        <ArrayField
                          name={input[form].name}
                          placeholder={input[form].placeholder}
                          required={input[form].required}
                          key={input[form].placeholder}
                          handleChange={(event) => handleChange(event, input[form].input_type)}
                        />
                      </div>
                    );
                  }
                  if (input[form].input_type === "array") {
                    // if (!(Object.keys(value).includes(input[form].name) )) {
                    //   setValue({...value, [input[form].name]: [""]})
                    //  }
                    return (
                      <div>
                        <label>{input[form].name}</label>
                        {/*value.(input[form].name).map((el, i) => ( */ }
                        {value.DevOps.map((el, i) => (
                          <div key={i}>
                          <Array
                            name={input[form].name}
                            placeholder={input[form].placeholder}
                            required={input[form].required}
                            key={input[form].placeholder}
                            el={el}
                            i={i}
                            handleChange={(event) => handleChange(event, input[form].input_type)}
                            removeClick={removeClick.bind(i)}
                          />
                          </div>
                        ))}
                        <input type="button" value="add more" onClick={(event) => addClick(event)} />
                      </div>
                    );
                  }
                })}
                <button id="submit" type="submit">
                  Generate schema
                </button>
                {schema && (
                  <p class="message">Schema generated!</p>)}
              </form>
              <h3>Output</h3>
              {Object.values(Data.output).map((value) => {
                return <li>{value}</li>;
              })}
              <br />
              {schema && ( //display only if submitted
                <div>
                  <h3>Result</h3>
                  Copy json and attach when sending request to platform team
                  <pre>
                    <button
                      id="copy"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          JSON.stringify(schema, null, 2)
                        )
                      }
                    >
                      Copy
                    </button>
                    <div ref={resultSection}>
                      <PrettyPrint jsonObj={schema} />
                    </div>
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
        <div class='side-column' />
      </div>
    </div>
  );
}
export default App;
