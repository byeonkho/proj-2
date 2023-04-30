- [1. Covid Grapher](#1-covid-grapher)
- [2. Features](#2-features)
  - [2.1. 1.1 Dynamic Charting:](#21-11-dynamic-charting)
  - [2.2. Date Range Picker:](#22-date-range-picker)
  - [2.3. Per Capita Toggle:](#23-per-capita-toggle)
  - [2.4. Country Selection:](#24-country-selection)
- [3. Installation](#3-installation)
- [4. Usage](#4-usage)
- [5. Troubleshooting](#5-troubleshooting)
- [6. Credits](#6-credits)

# 1. Covid Grapher

Covid Grapher is a dynamic charting application that pulls data from the
Covid-19 API and displays it in an easy-to-understand format. The application
tracks new Covid-19 cases for most countries and presents the data in a visually
compelling way.

# 2. Features

## 2.1. 1.1 Dynamic Charting:

The application creates charts using the Apex Charts library, providing a rich
visual representation of Covid-19 case data.

## 2.2. Date Range Picker:

Users can customize the chart view by selecting a specific date range using the
built-in calendar functionality, powered by React Calendar.

## 2.3. Per Capita Toggle:

Get a different perspective on the data with the per capita toggle feature,
which adjusts case numbers relative to the population of each country.

## 2.4. Country Selection:

Users can choose to view data from a single country or multiple countries for
comparison purposes.

# 3. Installation

To install the application, follow these steps:

1. Clone the repository
2. Navigate to the project directory in your terminal
3. Run npm i to install all required dependencies.

# 4. Usage

After installation, start the application by running npm start in your terminal.
You can then view the application in your web browser.

To use the application:

1. Select a country or multiple countries from the dropdown menu.
2. Select a date range using the date picker.
3. Toggle the 'Per Capita' option for a different view of the data.

# 5. Troubleshooting

1. Certain countries might not return data correctly (e.g USA). This is due to
   limitations imposed by the API for very large datasets.
2. Some large countries might not display their data correctly. This is due to a
   bug in how the data is being processed by the app.
3. Some countries might have strange data points, e.g having periods or a day
   where there are 0 new cases reported. This is likely due to the differences
   in how countries report their data, and is not a bug.

# 6. Credits

This application uses the following libraries and API:

1. [Apex Charts](https://apexcharts.com/)
2. [React Calendar](https://www.npmjs.com/package/react-calendar)
3. [Material UI](https://material-ui.com/)
4. [Covid19 API](https://covid19api.com/)
