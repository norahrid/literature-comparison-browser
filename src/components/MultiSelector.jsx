import React, { useState } from "react";
import Select from "react-select";
import chroma from "chroma-js";
import { clades } from "../constants";

const MultiSelector = (props) => {
  const [cladeSelection, setCladeSelection] = useState([]);
  const [buttonLabel, setButtonLabel] = useState("Filter");

  const handleChange = (event) => {
    var choices = [];
    for (let i = 0; i < event.length; i++) {
      choices.push(event[i]["value"]);
    }
    console.log(choices)
    setCladeSelection(choices);
  };

  const handleClick = () => {
    if (cladeSelection.length >= props.minElementRequirement) props.handleChange(cladeSelection);
    else alert(`Select at least ${props.minElementRequiremen} item to display in the map.`);
  };

  // Code used from the styling code with colours:
  // https://react-select.com/styles
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const colour = chroma(data.color);
      return {
        ...styles,
        position: "relative",
        zIndex: 20,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? colour.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(colour, "white") > 2
            ? "white"
            : "black"
          : "black",
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : colour.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "black",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };

  return (
    <div className="dashboard-container dashboard-related">
      <p>{props.label}</p>
      {props.label === "Clade"
        ? 
        <Select
          isMulti
          name={props.label}
          options={Object.values(props.options)}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          styles={colourStyles}
          defaultValue={[Object.values(props.options)[0], Object.values(props.options)[1], Object.values(props.options)[2]]}
        />
        :
        <Select
          isMulti
          name={props.label}
          options={Object.values(props.options)}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          defaultValue={Object.values(props.options)[0]}
        />
      }

      <button className="basic-button filter-button" onClick={handleClick}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default MultiSelector;
