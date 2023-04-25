import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const LineChart = (props) => {
    const [chartData, setChartData] = useState({
        options: {
            chart: {
                id: "basic-line",
            },
            xaxis: {
                categories: [],
                max: 50,
            },
            legend: {
                show: true,
                position: "top",
                horizontalAlign: "right",
                labels: {
                    colors: "#333",
                    useSeriesColors: false,
                },
            },
        },
        series: [
            {
                name: "New Cases",
                data: [],
            },
        ],
    });

    useEffect(() => {
        if (props.countriesData.length === 0) {
            return;
        }

        const countryNames = [];
        const series = [];

        for (let i = 0; i < props.countriesData.length; i++) {
            const data = props.countriesData[i];
            const country = data.Country;

            if (!countryNames.includes(country)) {
                countryNames.push(country);

                const newData = { name: country, data: [] };
                series.push(newData);
            }

            for (let j = 0; j < series.length; j++) {
                if (series[j].name === country) {
                    series[j].data.push(data.New);
                    break;
                }
            }
        }

        const categories = props.countriesData.map((data) => data.Date);

        setChartData({
            options: {
                chart: {
                    id: "basic-line",
                },
                xaxis: {
                    categories: categories,
                },
            },
            series: series,
        });
    }, [props.countriesData]);

    return (
        <div>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="line"
                width={1000}
            />
        </div>
    );
};

export default LineChart;
