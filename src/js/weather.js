export default class Weather {
    constructor() {
        this.key = "XKRBNZLRBQGFV45CMGN3Z9FZX";
    }

    async fetchWeather(searchLocation, start, end) {
        try {    
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchLocation}/${start}/${end}?key=${this.key}`);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch(error) {
            console.error("Error fetching data: ", error);
        }
    }

    getWindDir(input) {
        if ( input >= 337.5 || input < 22.5) {
            return "N";
        } else if (input < 67.5) {
            return "NE";
        } else if (input < 112.5) {
            return "E";
        } else if (input < 157.5) {
            return "SE";
        } else if (input < 202.5) {
            return "S";
        } else if (input < 247.5) {
            return "SW";
        } else if (input < 292.5) {
            return "W";
        } else if (input < 337.5) {
            return "NW";
        } else {
            return "?";
        }
    }

    getMoonPhase(input) {
        if (input === 0) {
            return "New Moon";
        } else if (input < 0.25) {
            return "Waxing Crescent";
        } else if (input === 0.25) {
            return "First Quarter";
        } else if (input < 0.5) {
            return "Waxing Gibbous";
        } else if (input === 0.5) {
            return "Full Moon";
        } else if (input < 0.75) {
            return "Waning Gibbous";
        } else if (input === 0.75) {
            return "Last Quarter";
        } else if (input < 1) {
            return "Waning Crescent";
        } else {
            return "?";
        }
    }

    getConditionIconURL(condition) {
        switch (condition) {
            case "snow":
                return "../img/weather-snowy.svg";
            case "rain":
                return "../img/weather-rainy.svg";
            case "fog":
                return "../img/weather-fog.svg";
            case "wind":
                return "../img/weather-windy.svg";
            case "cloudy":
                return "../img/weather-cloudy.svg";
            case "partly-cloudy-day":
                return"../img/weather-partly-cloudy.svg";
            case "partly-cloudy-night":
                return "../img/weather-night-partly-cloudy.svg";
            case "clear-day":
                return "../img/weather-sunny.svg";
            case "clear-night":
                return "../img/weather-night.svg";
            default:
                return "../img/alert-circle-outline.svg";
        }
    }

    getTempIconURL(temp) {
        if (temp < 37) {
            return "../img/thermometer-low.svg";
        } else if (temp < 80) {
            return "../img/thermometer.svg";
        } else {
            return "../img/thermometer-high.svg";
        }
    }

    getMoonIconURL(phase) {
        switch (phase) {
            case "New Moon":
                return "../img/moon-new.svg";
            case "Waxing Crescent":
                return "../img/moon-waxing-crescent.svg";
            case "First Quarter":
                return "../img/moon-first-quarter.svg";
            case "Waxing Gibbous":
                return "../img/moon-waxing-gibbous.svg";
            case "Full Moon":
                return "../img/moon-full.svg";
            case "Waning Gibbous":
                return "../img/moon-waning-gibbous.svg";
            case "Last Quarter":
                return "../img/moon-last-quarter.svg";
            case "Waning Crescent":
                return "../img/moon-waning-crescent.svg";
            default:
                return "../img/alert-circle-outline.svg";
        }
    }
}