import React from "react";
import Select from "react-select";

const SingleSelector = (props) => {
  const onChange = (event, genome) => {
    props.handleChange(event, genome);
  }

  console.log(props.current)

  const current = props.current === null ? null : props.options[props.current.toUpperCase()];

  return (
    <div className="dashboard-container dashboard-related">
      <p>{props.label}</p>
      <Select
        //defaultValue={props.options[props.current.toUpperCase()]}
        defaultValue={current}
        options={Object.values(props.options)}
        onChange={e => onChange(e, props.genome)}
      />
    </div>
  );
};

export default SingleSelector;
