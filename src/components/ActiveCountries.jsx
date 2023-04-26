import React from "react";
import countries from "../countries";

const ActiveCountries = (props) => {
    // instead of removing country from selectedCountries and re running GET, i want to delete from database and re-render chart

    const removeSelectedCountry = (country) => {
        props.setCountriesData((prevData) =>
            prevData.filter((el) => {
                console.log("el countrycode", el.Country);
                return el.Country !== country; // return true if the object doesn't match the condition
            })
        );
        console.log(props.countriesData)
    }

    // const removeSelectedCountry = (country) => {
    //     props.setSelectedCountries(
    //         props.selectedCountries.filter((el) => el.slug !== country)
    //     );
    // };

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
