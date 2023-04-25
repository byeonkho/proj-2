import React, { useEffect, useState } from "react";
import "./App.css"
import Cal from "./components/Calendar";
import LineChart from "./components/Chart";
import { countryNames } from "./countries";
import Navbar from "./components/NavBar";
import Dropdown from "./components/Dropdown";

function App() {
    // main data array returned from API
    const [countriesData, setCountriesData] = useState([]);

    // date states from date range picker
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    // selected country from dropdown
    const [selectedCountry, setSelectedCountry] = useState();

    //temp for debugging
    const [country, setCountry] = useState("singapore");

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
        console.log(countriesData);
    }, [countriesData]);

    const getData = async () => {
        const countries = ["singapore", "malaysia"]; // Add more countries as needed
        const dataPromises = countries.map(async (country) => {
            const res = await fetch(
                `https://api.covid19api.com/country/${country}?from=${startDate}&to=${endDate}`,
                requestOptions
            );
            const data = await res.json();
            return data
                .map(({ Country, Date, Confirmed }, i, arr) => ({
                    Country,
                    Date: Date.substring(0, 10),
                    New:
                        i > 0 ? Confirmed - arr[i - 1].Confirmed : Confirmed,
                    Confirmed: Confirmed
                }))
                .slice(1);
        });
        const allData = await Promise.all(dataPromises);
        const combinedData = allData.flat();
        setCountriesData(combinedData);
    };

    return (
        <div className="App">
            {/* <Navbar /> */}
            <Dropdown
                setSelectedCountry={setSelectedCountry}
                selectedCountry={selectedCountry}
            />

            <Cal date={date} setDate={setDate} />
            <button onClick={getData}>submit</button>
            <LineChart countriesData={countriesData} />
        </div>
    );
}

export default App;
