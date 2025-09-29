export default class Weather {
    constructor() {
        this.key = "HKRBNZLRBQGFV45CMGN3Z9FZS"
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

    getIconURL(condition) {
        let url = "";

        return url;
    }

    getWindDir() {

    }

    getMoonPhase() {
        
    }
}