import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

// allows the user to add their own typed-in option to dropdown
const CreatableMultiSelector = (props) => {

    const [selection, setSelection] = useState([]);
    const [buttonLabel, setButtonLabel] = useState("Filter");
    
    const handleChange = (event) => {
        var choices = [];
        for (let i = 0; i < event.length; i++) {
          choices.push(event[i]["value"]);
        }
        setSelection(choices);
    }

    const handleClick = () => {
        if (selection.length >= props.minElementRequirement) props.handleChange(selection);
        else alert(`Select at least ${props.minElementRequirement} item(s) to display in the map.`);
    }

    return (
        <div className="dashboard-container dashboard-related">
            <p>{props.label}</p>
            <CreatableSelect 
                isMulti
                name={props.label}
                onChange={handleChange}
                options={Object.values(props.options)}
                defaultValue={[Object.values(props.options)[0]]}        
            />
        <button className="basic-button filter-button" onClick={handleClick}>
            {buttonLabel}
        </button>
        </div>
    );
}

export default CreatableMultiSelector;