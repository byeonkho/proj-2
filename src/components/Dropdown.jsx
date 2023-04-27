import React, { useState } from "react";
import countries from "../countries";
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";

const Dropdown = (props) => {
    const [selectedCountryDropdown, setSelectedCountryDropdown] = useState("");

    // sets selectedCountry for the dropdown onChange function.
    function handleOptionChange(event) {
        setSelectedCountryDropdown(event.target.value);
        const selectedOption = event.target.value;

        // finds and returns the matching country obj from countries list
        const selectedCountry = countries.find(
            (country) => country.Slug === selectedOption
        );

        if (
            props.selectedCountries.some(
                (country) => country.slug === selectedOption
            )
        ) {
            console.log("Country already selected:", selectedCountry);
            return; // Abort the function
        }

        // Update the state with the selected country
        props.setSelectedCountries((prevCountries) => {
            return [
                ...prevCountries,
                {
                    slug: selectedOption,
                    country: selectedCountry.Country,
                },
            ];
        });

        console.log(
            "Country added:",
            selectedCountry.Country,
            props.selectedCountries
        );

        // Clear the selected country
        setSelectedCountryDropdown("");
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 250}} size="small">
            <InputLabel id="country-dropdown">Select a country:</InputLabel>
            <Select
                labelId="country-dropdown-label"
                id="country-dropdown"
                value={selectedCountryDropdown}
                label="Select a country:"
                onChange={handleOptionChange}
            >
                {countries.map((country, idx) => (
                    <MenuItem key={idx} value={country.Slug}>
                        {country.Country}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    // return (
    //     <div>
    //         <label htmlFor="country-dropdown">Select a country:</label>
    //         <select
    //             id="country-dropdown"
    //             value={selectedCountryDropdown}
    //             onChange={handleOptionChange}
    //         >
    //             <option value="">-- Please select a country --</option>
    //             {countries.map((country, idx) => (
    //                 <option key={idx} value={country.Slug}>
    //                     {country.Country}
    //                 </option>
    //             ))}
    //         </select>
    //         {/* <button onClick={handleButtonClick}>Add country</button> */}
    //         {props.selectedCountry && (
    //             <p>You selected: {selectedCountry.country}</p>
    //         )}
    //     </div>
    // );
};

export default Dropdown;
