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
                return "weather-snowy";
            case "rain":
                return "weather-rainy";
            case "fog":
                return "weather-fog";
            case "wind":
                return "weather-windy";
            case "cloudy":
                return "weather-cloudy";
            case "partly-cloudy-day":
                return".eather-partly-cloudy";
            case "partly-cloudy-night":
                return "weather-night-partly-cloudy";
            case "clear-day":
                return "weather-sunny";
            case "clear-night":
                return "weather-night";
            default:
                return "alert-circle-outline";
        }
    }

    getTempIconURL(temp) {
        if (temp < 37) {
            return "thermometer-low";
        } else if (temp < 80) {
            return "thermometer";
        } else {
            return "thermometer-high";
        }
    }

    getWindDirIconURL(dir) {
        switch (dir) {
            case "N":
                return "arrow-down-thin";
            case "NE":
                return "arrow-bottom-left-thin";
            case "E":
                return "arrow-left-thin";
            case "SE":
                return "arrow-top-left-thin";
            case "S":
                return "arrow-up-thin";
            case "SW":
                return "arrow-top-right-thin";
            case "W":
                return "arrow-right-thin";
            case "NW":
                return "arrow-bottom-right-thin";
            default:
                return "alert-circle-outline";
        }
    }

    getMoonIconURL(phase) {
        switch (phase) {
            case "New Moon":
                return "moon-new";
            case "Waxing Crescent":
                return "moon-waxing-crescent";
            case "First Quarter":
                return "moon-first-quarter";
            case "Waxing Gibbous":
                return "moon-waxing-gibbous";
            case "Full Moon":
                return "moon-full";
            case "Waning Gibbous":
                return "moon-waning-gibbous";
            case "Last Quarter":
                return "moon-last-quarter";
            case "Waning Crescent":
                return "moon-waning-crescent";
            default:
                return "alert-circle-outline";
        }
    }
}