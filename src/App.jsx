import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Cal from "./components/Calendar";
import LineChart from "./components/Chart";
import Navbar from "./components/NavBar";
import Dropdown from "./components/Dropdown";
import ActiveCountries from "./components/ActiveCountries";

function App() {
    // main data array returned from API
    const [countriesData, setCountriesData] = useState([]);

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
        try {
            const dataPromises = selectedCountries.map(
                async (country, index) => {
                    await new Promise((resolve) =>
                        setTimeout(resolve, index * 1000)
                    );

                    const res = await fetch(
                        `https://api.covid19api.com/country/${country.slug}?from=${startDate}&to=${endDate}`,
                        requestOptions
                    );

                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }

                    const data = await res.json();
                    return data
                        .map(({ Country, Date, Confirmed }, i, arr) => ({
                            Country,
                            Date: Date.substring(0, 10),
                            New:
                                i > 0
                                    ? Confirmed - arr[i - 1].Confirmed
                                    : Confirmed,
                            Confirmed: Confirmed,
                        }))
                        .slice(1);
                }
            );
            const allData = await Promise.all(dataPromises);
            const combinedData = allData.flat();
            setCountriesData(combinedData);

            // sets submitted dates and countries as ref
            prevStartDate.current = startDate;
            prevEndDate.current = endDate;
            prevSelectedCountries.current = selectedCountries;

        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    return (
        <div className="App">
            {/* <Navbar /> */}
            <Dropdown
                setSelectedCountries={setSelectedCountries}
                selectedCountries={selectedCountries}
            />

            <Cal date={date} setDate={setDate} />
            <button onClick={getData}>submit</button>
            <br />
            <ActiveCountries
                selectedCountries={selectedCountries}
                setSelectedCountries={setSelectedCountries}
            />
            <LineChart countriesData={countriesData} />
        </div>
    );
}

export default App;
