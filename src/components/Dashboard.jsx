import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../main.css";
import MultiSelector from "./MultiSelector";
import SingleSelector from "./SingleSelector";
import { existingOptions } from "../constants";
import { changeDataTypeSelection, changeMenu1Selection, changeMenu2Selection } from "../redux/reducers/dashboardSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const dataType = state["dashboard"]["dataType"];

    console.log(state)

    const handleDataTypeChange = (newSelection) => {
        const dashboardState = {
            dataType: newSelection,
            ...Object.keys(existingOptions[newSelection]["dashboard"]).reduce((data, k) => {
                data[k] = [Object.keys(existingOptions[newSelection]["dashboard"][k]["options"])[0]];
                return data;
            }, {})
        }
        dispatch(changeDataTypeSelection(dashboardState));
    }

    const handleMenuChange = (newSelection, menuNumber) => {
        if (menuNumber === 1) dispatch(changeMenu1Selection(newSelection));
        else if (menuNumber === 2) dispatch(changeMenu2Selection(newSelection));
    }

    const elements = Object.values(existingOptions[dataType]["dashboard"]).map((el, i) => {
        return (
            <MultiSelector 
                key={`${el["label"]}-sel-${i}`}
                label={el["label"]} 
                handleChange={sel => handleMenuChange(sel, i+1)}
                options={el["options"]}
                minElementRequirement={el["minElementRequirement"]} 
            />
        );
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
        </div>
    );
}

export default Dashboard;