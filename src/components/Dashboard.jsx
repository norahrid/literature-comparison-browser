import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../main.css";
import MultiSelector from "./MultiSelector";
import SingleSelector from "./SingleSelector";
import { genomeOptions, clades, completeOptions, trackOptions, existingOptions } from "../constants";
import { changeDataTypeSelection } from "../reducers/dashboardSlice";

const Dashboard = (props) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    console.log(state)

    const handleDataTypeChange = () => {
        console.log("hit")
    }

    const elements = Object.values(existingOptions["LITERATURE"]["dashboard"]).map((el, i) => {
        return (
            <MultiSelector 
                key={`${el["label"]}-sel-${i}`}
                label={el["label"]} 
                handleChange={handleDataTypeChange}
                options={el["options"]}
                minElementRequirement={el["minElementRequirement"]} 
            />
        )
    })



    {/* stopPropagation prevents selecting a chromosome when the clade dropdown is open */}
    return (
        <div
            className="dashboard-stack"
            onClick={(e) => e.stopPropagation()}
        >
            <SingleSelector
                label="Data type"
                current={Object.keys(existingOptions)[0]}
                options={existingOptions}
                handleChange={handleDataTypeChange}
            />
            {elements}
            {/* <div className="dashboard-container dashboard-related">
                <MultiSelector 
                    label="Genome" 
                    handleChange={handleGenomeChange}
                    options={genomeOptions} 
                    minElementRequirement={1}
                />
                <MultiSelector 
                    label="Clade" 
                    handleChange={handleCladeChange}
                    options={clades}
                    minElementRequirement={1} 
                />
            </div>

            <div className="dashboard-container dashboard-related">
                <MultiSelector
                    label="Complete"
                    handleChange={handleCompleteFilterChange}
                    options={completeOptions}
                    minElementRequirement={1}
                />
                <MultiSelector
                    label="Track"
                    handleChange={handleTrackChange}
                    options={trackOptions}
                    minElementRequirement={0}
                />
            </div> */}

    
            {/* <SingleSelector
                label="Complete"
                current={props.completeFilter}
                options={completeOptions}
                handleChange={props.handleCompleteFilterChange}
                genome={"na"}
            /> */}
        </div>
    )
}

export default Dashboard;