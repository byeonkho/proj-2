import React from "react";
import countries from "../countries";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, Button } from "@mui/material";

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
        console.log("del value", el.target.value);

        //handles users clicking on the icon which returns an undefined value.
        const clickedValue = el.target.value || el.currentTarget.value;

        const countryObj = countries.find((obj) => obj.Slug === clickedValue);
        const country = countryObj.Country;
        console.log("country value", country);
        removeSelectedCountry(country);
    };

    return props.selectedCountries.map((country, idx) => (
        <Button
            variant="outlined"
            size="small"
            endIcon={<CloseIcon />}
            key={idx}
            value={country.slug}
            onClick={handleButtonClick}
        >
            <Typography fontSize={13} variant="body1" fontWeight="bold">
                {country.country}
            </Typography>
        </Button>
    ));
};

export default ActiveCountries;
