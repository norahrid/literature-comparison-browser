import React, { useState } from "react";
import Select from "react-select";

const MultiSelector = (props) => {
  const [selection, setSelection] = useState([]);
  const [buttonLabel, setButtonLabel] = useState("Filter");

  // update selection list as it changes
  const handleChange = (event) => {
    var choices = [];
    for (let i = 0; i < event.length; i++) {
      choices.push(event[i]["value"]);
    }
    setSelection(choices);
  };

  // check selection and then submit it
  const handleClick = () => {
    if (selection.length >= props.minElementRequirement) props.handleChange(selection);
    else alert(`Select at least ${props.minElementRequirement} item(s) to display in the map.`);
  };

  return (
    <div className="dashboard-container dashboard-related">
      <p>{props.label}</p>
        <Select
          isMulti
          name={props.label}
          options={Object.values(props.options)}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          defaultValue={Object.values(props.options)[0]}
        />

      <button className="basic-button filter-button" onClick={handleClick}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default MultiSelector;
