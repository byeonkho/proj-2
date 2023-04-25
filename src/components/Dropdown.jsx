import React, { useState } from "react";
import { countryNames } from "../countries";

const Dropdown = (props) => {
    function handleOptionChange(event) {
        props.setSelectedCountry(event.target.value);
    }

    return (
        <div>
            <label htmlFor="country-dropdown">Select a country:</label>
            <select
                id="country-dropdown"
                value={props.selectedCountry}
                onChange={handleOptionChange}
            >
                <option value="">-- Please select a country --</option>
                {countryNames.map((country, idx) => (
                    <option key={idx} value={country}>
                        {country}
                    </option>
                ))}
            </select>
            <button>Add country</button>
            {props.selectedCountry && (
                <p>You selected: {props.selectedCountry}</p>
            )}
        </div>
    );
};

export default Dropdown;
