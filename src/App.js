import React, { useState, useRef } from "react";
import { useEffect } from "react";
import "./css/sidebar.css";
import InputTextField from "./inputComponents/InputTextField";
import TextAreaField from "./inputComponents/textAreaField";
import DropDownSelect from "./inputComponents/DropDownSelect";
import CheckBoxField from "./inputComponents/CheckBoxField";
import NumberField from "./inputComponents/numberField";


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
    console.log(value); // Do what ever you want to do with data
    setSchema(value);
    fetch(`${" http://localhost:3004/Lz-To-docs"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    })
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());    
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  }

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  function PrettyPrint(props) {
    return <pre>{JSON.stringify(props.jsonObj, null, 2)}</pre>;
  }

  const handleOnChangeOption = (e) => {
    Object.keys(files).forEach((key) => {
      if (files[key].title === e.target.value) {
        setData(files[key]);
        setInput(files[key].Input);
      }
    });
    setChoice(e.target.value);
    setSchema("");
    setValue();
  };

  useEffect(() => {
    choice ? setContentVisible(true) : setContentVisible(false);
  }, [choice]);

  return (
    <div className="container mt-3">
      <label class="toggle-btn" for="sidebar-toggle">
        click me
      </label>
      <input id="sidebar-toggle" type="checkbox" />
      <aside>
        <div>
          <ul>
            {Object.keys(files).map((key) => (
              <li value={files[key].title} key={files[key].title}>
                {files[key].title}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <h1 id="select-header">Select Service Request</h1>
      <select
        className="form-select"
        value={choice}
        onChange={handleOnChangeOption}
      >
        <option value="">Select an service Request</option>
        {Object.keys(files).map((key) => (
          <option value={files[key].title} key={files[key].title}>
            {files[key].title}
          </option>
        ))}
      </select>
      {ContentVisible && (
        <div class="mx-auto">
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
          <form onSubmit={submitForm} class="type1">
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
            })}
            <button id="submit" type="submit">
              Generate schema
            </button>
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
  );
}

export default App;
