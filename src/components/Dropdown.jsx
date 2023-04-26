import React, { useState } from "react";
import countries from "../countries";

const Dropdown = (props) => {
    const [selectedCountry, setSelectedCountry] = useState();

    // sets selectedCountry for the dropdown onChange function.
    function handleOptionChange(event) {
        const selectedOption = event.target.value;
        const selectedCountry = countries.find(
            (country) => country.Slug === selectedOption
        );
        setSelectedCountry({
            slug: selectedOption,
            country: selectedCountry.Country,
        });
    }

    function handleButtonClick() {
        if (selectedCountry) {
            // Check if the selected country is already in the state
            if (props.selectedCountries.includes(selectedCountry)) {
                console.log("Country already selected:", selectedCountry);
                return; // Abort the function
            }

            // Update the state with the selected country
            props.setSelectedCountries((prevCountries) => {
                return [...prevCountries, selectedCountry];
            });

            console.log(
                "Country added:",
                selectedCountry,
                props.selectedCountries
            );
        } else {
            console.log("No country selected");
        }
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
                {countries.map((country, idx) => (
                    <option key={idx} value={country.Slug}>
                        {country.Country}
                    </option>
                ))}
            </select>
            <button onClick={handleButtonClick}>Add country</button>
            {props.selectedCountry && (
                <p>You selected: {props.selectedCountry}</p>
            )}
        </div>
    );
};

export default Dropdown;
