import React from "react";
import Select from "react-select";

const SingleSelector = (props) => {
  const onChange = (event) => {
    props.handleChange(event.value);
  }

  const current = props.current === null ? null : props.options[props.current.toUpperCase()];

  return (
    <div className="dashboard-container dashboard-related">
      <p>{props.label}</p>
      <Select
        defaultValue={current}
        options={Object.values(props.options)}
        onChange={onChange}
      />
    </div>
  );
};

export default SingleSelector;
