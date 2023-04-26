import React from "react";

const ActiveCountries = (props) => {
    const removeSelectedCountry = (country) => {
        props.setSelectedCountries(
            props.selectedCountries.filter((el) => el.slug !== country)
        );
    };

    const handleButtonClick = (el) => {
        const country = el.target.value;
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
