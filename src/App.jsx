import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Cal from "./components/Calendar";
import LineChart from "./components/Chart";
import NavBar from "./components/NavBar";
import Dropdown from "./components/Dropdown";
import ActiveCountries from "./components/ActiveCountries";
import {
    Switch,
    FormControlLabel,
    Typography,
    Box,
    Button,
} from "@mui/material";
import { Routes, Route } from "react-router-dom";
import About from "./pages/about";
import { CalModal, CalIcon } from "./components/CalModal";

function App() {
    // main data array returned from API
    const [countriesData, setCountriesData] = useState([]);

    // toggles for chart data type
    const [capitaState, setCapitaState] = useState(false);

    const handleCapitaClick = () => {
        console.log("capita click", capitaState);
        if (!capitaState) {
            setCapitaState(true);
        } else {
            setCapitaState(false);
        }
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // date states from date range picker
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    // selected country from dropdown after submitting. is an object with keys slug: and country:
    const [selectedCountries, setSelectedCountries] = useState([]);

    // reference states for previously used dates and countries to prevent repeat GETs.

    const prevStartDate = useRef();
    const prevEndDate = useRef();
    const prevSelectedCountries = useRef();

    // sets startDate and endDate states based on date ranged selected
    useEffect(() => {
        if (date[0] && date[1]) {
            const localStartDate = new Date(
                date[0].getTime() -
                    date[0].getTimezoneOffset() * 60000 -
                    8 * 60 * 60 * 1000
            );
            const isoStartDate = localStartDate.toISOString();
            setStartDate(isoStartDate.substr(0, 10) + "T00:00:00Z");

            const localEndDate = new Date(
                date[1].getTime() -
                    date[1].getTimezoneOffset() * 60000 -
                    8 * 60 * 60 * 1000
            );
            const isoEndDate = localEndDate.toISOString();
            setEndDate(isoEndDate.substr(0, 10) + "T00:00:00Z");

            console.log("start", startDate, "end", endDate);
        }
    }, [date]);

    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    useEffect(() => {
        if (selectedCountries.length > 0 && startDate && endDate) {
            getData();
        }
    }, [selectedCountries, startDate, endDate]);

    const getData = async () => {
        let fetchCountries;

        if (
            startDate === prevStartDate.current &&
            endDate === prevEndDate.current
        ) {
            // check what is different betweeen prevSelectedCountries and selectedCountries
            fetchCountries = selectedCountries.filter(
                (value) => !prevSelectedCountries.current.includes(value)
            );
            console.log("fetchcountries", fetchCountries);

            // account for first time input
        } else {
            fetchCountries = selectedCountries;
            console.log("debug fetch", fetchCountries);
        }

        try {
            const dataPromises = fetchCountries.map(async (country, index) => {
                await new Promise((resolve) =>
                    setTimeout(resolve, index * 1000)
                );

                const res = await fetch(
                    `https://api.covid19api.com/country/${country.slug}?from=${startDate}&to=${endDate}`,
                    requestOptions
                );

                if (res.ok) {
                    console.log("res ok");
                }

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();
                return data
                    .map(
                        (
                            { Country, Date, Confirmed, CountryCode },
                            i,
                            arr
                        ) => ({
                            Country,
                            Date: Date.substring(0, 10),
                            New:
                                i > 0
                                    ? Confirmed - arr[i - 1].Confirmed
                                    : Confirmed,
                            Confirmed: Confirmed,
                            CountryCode: CountryCode,
                        })
                    )
                    .slice(1);
            });
            const allData = await Promise.all(dataPromises);
            const combinedData = allData.flat();
            setCountriesData((prevData) => [...prevData, ...combinedData]);

            // sets submitted dates and countries as ref
            prevStartDate.current = startDate;
            prevEndDate.current = endDate;
            prevSelectedCountries.current = selectedCountries;
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    return (
        <Box display="flex" flexDirection="column" sx={{ my: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "center",
                }}
            >
                <Dropdown
                    setSelectedCountries={setSelectedCountries}
                    selectedCountries={selectedCountries}
                />
                <CalIcon handleOpen={handleOpen} date={date} />
                <FormControlLabel
                    control={<Switch onChange={handleCapitaClick} />}
                    label={<Typography fontSize={15}>Per Capita</Typography>}
                />
            </Box>

            <Box
                flexDirection="row"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "center",
                }}
            >
                <ActiveCountries
                    selectedCountries={selectedCountries}
                    setSelectedCountries={setSelectedCountries}
                    countriesData={countriesData}
                    setCountriesData={setCountriesData}
                    prevSelectedCountries={prevSelectedCountries}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "center",
                }}
            >
                <LineChart
                    countriesData={countriesData}
                    capitaState={capitaState}
                    selectedCountries={selectedCountries}
                />
            </Box>

            <CalModal
                date={date}
                setDate={setDate}
                open={open}
                handleClose={handleClose}
            />
        </Box>
    );
}

export default App;
