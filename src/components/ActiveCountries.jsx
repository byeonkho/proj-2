import React from "react";
import countries from "../countries";

const ActiveCountries = (props) => {
    // instead of removing country from selectedCountries and re running GET, i want to delete from database and re-render chart

    const removeSelectedCountry = (country) => {

        // loops through the main data state, finds all elements with the matching country value and excludes them from the updated state
        props.setCountriesData((prevData) =>
            prevData.filter((el) => {
                return el.Country !== country; // return true if the object doesn't match the condition
            })
        );

        // set selectedCountries, prevSelectedCountries so active country buttons update and to prep for future input
        const selectedCountries = props.selectedCountries.filter(
            (el) => el.country !== country
        );

    
        props.setSelectedCountries(selectedCountries);
        props.prevSelectedCountries.current = selectedCountries;
    };


    const handleButtonClick = (el) => {
        const countryObj = countries.find(
            (obj) => obj.Slug === el.target.value
        );
        const country = countryObj.Country;
        console.log("country value", country);
        removeSelectedCountry(country);
    };

    return props.selectedCountries.map((country) => (
        <button
            key={country.slug}
            value={country.slug}
            onClick={handleButtonClick}
        >
            {country.country}
        </button>
    ));
};

export default ActiveCountries;
