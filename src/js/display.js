import weather from "../js/weather.js";
import { format, addDays, parse } from "date-fns";

const Weather = new weather();
let forecast = {};

export default class Display {
    constructor() {
        this.settingsToggle = 0;
        this.tempToggle = 0;
        this.speedToggle = 0;
        this.modeToggle = 0;
        this.displayType = "empty";
        this.dayIndex = 0;
    }

    toggleSettings() {
        if (this.settingsToggle === 0) {
            this.settingsOn();
        } else {
            this.settingsOff();
        }
    }

    settingsOff() {
        const settings = document.querySelector(".settings");
        settings.classList.add("disabled");

        this.settingsToggle = 0;
    }

    settingsOn() {
        const settings = document.querySelector(".settings");
        settings.classList.remove("disabled");

        this.settingsToggle = 1;
    }

    toggleTemp() {
        if (this.tempToggle === 0) {
            this.tempC();
        } else {
            this.tempF();
        }
        this.refresh();
    }

    tempF() {
        const settingTempBtn = document.querySelector("#settingTempBtn");
        settingTempBtn.classList.remove("active");
        settingTempBtn.style.back

        this.tempToggle = 0;
    }

    tempC() {
        const settingTempBtn = document.querySelector("#settingTempBtn");
        settingTempBtn.classList.add("active");

        this.tempToggle = 1;
    }

    toggleSpeed() {
        if (this.speedToggle === 0) {
            this.speedKm();
        } else {
            this.speedMi();
        }
        this.refresh();
    }

    speedMi() {
        const settingSpeedBtn = document.querySelector("#settingSpeedBtn");
        settingSpeedBtn.classList.remove("active");

        this.speedToggle = 0;
    }

    speedKm() {
        const settingSpeedBtn = document.querySelector("#settingSpeedBtn");
        settingSpeedBtn.classList.add("active");

        this.speedToggle = 1;
    }

    toggleMode() {
        if (this.modeToggle === 0) {
            this.modeDark();
        } else {
            this.modeLight();
        }
        this.refresh();
    }

    modeLight() {
        const settingModeBtn = document.querySelector("#settingModeBtn");
        settingModeBtn.classList.remove("active");

        this.modeToggle = 0;

        const body = document.querySelector("body");
        body.classList.remove("dark");
    }

    modeDark() {
        const settingModeBtn = document.querySelector("#settingModeBtn");
        settingModeBtn.classList.add("active");

        this.modeToggle = 1;

        const body = document.querySelector("body");
        body.classList.add("dark");
    }

    convertC(input) {
        const output = (input - 32) * 5 / 9;
        return Math.round(output * 10) / 10;
    }

    convertKm(input) {
        const output = input * 1.60934;
        return Math.round(output * 10) / 10;
    }

    convertCm(input) {
        const output = input * 2.54;
        return Math.round(output * 10) / 10;
    }

    async search() {
        const searchInput = document.querySelector("#searchInput");
        this.loading(searchInput.value);
        const today = new Date();
        const nextWeek = addDays(today, 7);

        forecast = await Weather.fetchWeather(searchInput.value, format(today, "yyyy-MM-dd"), format(nextWeek, "yyyy-MM-dd"));
        await this.delay(500);
        this.redrawOverview();
        searchInput.value = "";
    }

    async geolocate(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.loading(`${latitude}, ${longitude}`);
        const today = new Date();
        const nextWeek = addDays(today, 7);

        forecast = await Weather.fetchWeather(`${parseFloat(latitude.toFixed(4))},${parseFloat(longitude.toFixed(4))}`, format(today, "yyyy-MM-dd"), format(nextWeek, "yyyy-MM-dd"));
        await this.delay(100);
        this.redrawOverview();
    }

    geoError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    loading(searchTerm) {
        const content = document.querySelector(".content");
        content.innerHTML = "";

        const loadingCard = document.createElement("div");
        loadingCard.classList.add("loadingCard");
        
        const loadingHeader = document.createElement("h2");
        loadingHeader.classList.add("loadingHeader");
        loadingHeader.textContent = "Loading ...";
        loadingCard.appendChild(loadingHeader);

        const loadingDesc = document.createElement("h3");
        loadingDesc.classList.add("loadingDesc");
        loadingDesc.textContent = `Fetching forecast for ${searchTerm}`;
        loadingCard.appendChild(loadingDesc);

        content.appendChild(loadingCard);
    }

    refresh() {
        if (this.displayType === "empty") {
            return;
        } else if (this.displayType === "overview") {
            this.redrawOverview();
        } else if (this.displayType === "future") {
            this.redrawFuture(this.dayIndex);
        }
    }

    containsNoLetters(str) {
        return !/[a-zA-z]/.test(str);
    }

    createElement(tag, className, textContent) {
        const el = document.createElement(tag);
        el.className = className;
        if (textContent !== undefined) el.textContent = textContent;
        return el;
    }

    redrawOverview() {
        this.displayType = "overview";
        this.dayIndex = 0;
        const content = document.querySelector(".content");
        content.innerHTML = "";

        this.redrawAlerts();
        this.redrawCurrent();
        this.redrawHourly();
        this.redrawUpcoming();
        
        window.scrollTo(0,0);
    }

    redrawAlerts() {
        const alerts = forecast.alerts;

        if (alerts.length > 0) {
            alerts.forEach((weatherAlert) => {
                const content = document.querySelector(".content");
                const sectionAlert = this.createElement('section', 'current');

                const alertIcon = this.createElement("div", "alertIcon alert-circle-outline")
                const currentHeaderMain = this.createElement('div', 'currentHeaderMain');
                const h2 = this.createElement('h2', 'alertHeadline', weatherAlert.event);
                const pDesc = this.createElement('p', 'alertDesc', weatherAlert.description);

                currentHeaderMain.appendChild(h2);
                currentHeaderMain.appendChild(pDesc);

                sectionAlert.appendChild(alertIcon);
                sectionAlert.appendChild(currentHeaderMain);

                content.appendChild(sectionAlert);
            });
        }
    }

    redrawCurrent() {
        const content = document.querySelector(".content");
        const sectionCurrent = this.createElement('section', 'current');

        // --- currentHeader ---
        const currentHeader = this.createElement('div', 'currentHeader');
        const currentHeaderMain = this.createElement('div', 'currentHeaderMain');
        const h2 = this.createElement('h2', 'resolvedAddress', forecast.resolvedAddress);
        const h4Desc = this.createElement('h4', 'forecastDescription', forecast.description);

        currentHeaderMain.appendChild(h2);
        currentHeaderMain.appendChild(h4Desc);

        if (this.containsNoLetters(h2.textContent)) {
            h2.style.display = "none";
        }

        const headerContainer = this.createElement('div', 'container');
        const latLonIcon = this.createElement('div', 'latLonIcon');

        const latCol = this.createElement('div', 'containerCol');
        const latTitle = this.createElement('h4', 'title', 'Lat');
        const latValue = this.createElement('p', 'value', forecast.latitude);
        latCol.appendChild(latTitle);
        latCol.appendChild(latValue);

        const lonCol = this.createElement('div', 'containerCol');
        const lonTitle = this.createElement('h4', 'title', 'Lon');
        const lonValue = this.createElement('p', 'value', forecast.longitude);
        lonCol.appendChild(lonTitle);
        lonCol.appendChild(lonValue);

        headerContainer.appendChild(latLonIcon);
        headerContainer.appendChild(latCol);
        headerContainer.appendChild(lonCol);

        currentHeader.appendChild(currentHeaderMain);
        currentHeader.appendChild(headerContainer);

        // --- containerWrap: currentDate & Temp ---
        const containerWrap1 = this.createElement('div', 'containerWrap');
        const currentDate = this.createElement('div', 'currentDate');
        const today = new Date();
        const date = this.createElement('h3', 'date', format((today), "EEEE, MMMM do, yyyy"));
        const currentDescription = this.createElement('h4', 'currentDescription', forecast.days[0].description);

        currentDate.appendChild(date);
        currentDate.appendChild(currentDescription);

        const currentConditionIcon = this.createElement('div', 'currentConditionIcon');
        if (forecast.currentConditions !== undefined) {
            currentConditionIcon.classList.add(Weather.getConditionIcon(forecast.currentConditions.icon));
        } else {
            currentConditionIcon.classList.add(Weather.getConditionIcon(forecast.days[0].icon));
        }

        const tempContainer = this.createElement('div', 'tempContainer');
        const tempIcon = this.createElement('div', 'tempIcon');
        if (forecast.currentConditions !== undefined) {
            tempIcon.classList.add(Weather.getTempIcon(forecast.currentConditions.temp));
        } else {
            tempIcon.classList.add(Weather.getTempIcon(forecast.days[0].hours[today.getHours()].temp));
        }

        const currentTemp = this.createElement('div', 'currentTemp');
        const valueHolderMain = this.createElement('div', 'valueHolder');
        const tempValue = this.createElement('h4', 'value currentTempValue');
        if (forecast.currentConditions !== undefined) {
            tempValue.textContent = this.tempToggle === 0 ? Math.trunc(forecast.currentConditions.temp) : this.convertC(forecast.currentConditions.temp);
        } else {
            tempValue.textContent = this.tempToggle === 0 ? Math.trunc(forecast.days[0].temp) : this.convertC(forecast.days[0].temp);
        }
        const tempUnit = this.createElement('p', 'unit', this.tempToggle === 0 ? '°F' : '°C');
        valueHolderMain.appendChild(tempValue);
        valueHolderMain.appendChild(tempUnit);

        const feelCol = this.createElement('div', 'containerCol');
        const feelTitle = this.createElement('h4', 'title', 'Feel');
        const feelValueHolder = this.createElement('div', 'valueHolder');
        const feelValue = this.createElement('p', 'value');
        if (forecast.currentConditions !== undefined) {
            feelValue.textContent = this.tempToggle === 0 ? Math.trunc(forecast.currentConditions.feelslike) : this.convertC(forecast.currentConditions.feelslike);
        } else {
            feelValue.textContent = this.tempToggle === 0 ? Math.trunc(forecast.days[0].feelslike) : this.convertC(forecast.days[0].feelslike);
        }
        const feelUnit = this.createElement('p', 'unit', this.tempToggle === 0 ? '°F' : '°C');
        feelValueHolder.appendChild(feelValue);
        feelValueHolder.appendChild(feelUnit);
        feelCol.appendChild(feelTitle);
        feelCol.appendChild(feelValueHolder);

        currentTemp.appendChild(valueHolderMain);
        currentTemp.appendChild(feelCol);

        const tempMaxMin = this.createElement('div', 'tempMaxMin');

        // High
        const highCol = this.createElement('div', 'containerCol');
        const highTitle = this.createElement('h4', 'title', 'High');
        const highValueHolder = this.createElement('div', 'valueHolder');
        const highValue = this.createElement('p', 'value', this.tempToggle === 0 ? Math.trunc(forecast.days[0].tempmax) : this.convertC(forecast.days[0].tempmax));
        const highUnit = this.createElement('p', 'unit', this.tempToggle === 0 ? '°F' : '°C');
        highValueHolder.appendChild(highValue);
        highValueHolder.appendChild(highUnit);
        highCol.appendChild(highTitle);
        highCol.appendChild(highValueHolder);

        // Low
        const lowCol = this.createElement('div', 'containerCol');
        const lowTitle = this.createElement('h4', 'title', 'Low');
        const lowValueHolder = this.createElement('div', 'valueHolder');
        const lowValue = this.createElement('p', 'value', this.tempToggle === 0 ? Math.trunc(forecast.days[0].tempmin) : this.convertC(forecast.days[0].tempmin));
        const lowUnit = this.createElement('p', 'unit', this.tempToggle === 0 ? '°F' : '°C');
        lowValueHolder.appendChild(lowValue);
        lowValueHolder.appendChild(lowUnit);
        lowCol.appendChild(lowTitle);
        lowCol.appendChild(lowValueHolder);

        tempMaxMin.appendChild(highCol);
        tempMaxMin.appendChild(lowCol);

        tempContainer.appendChild(tempIcon);

        tempContainer.appendChild(currentTemp);
        tempContainer.appendChild(tempMaxMin);

        containerWrap1.appendChild(currentDate);
        containerWrap1.appendChild(currentConditionIcon);
        containerWrap1.appendChild(tempContainer);

        // --- containerWrap precipOpt ---
        const containerWrap2 = this.createElement('div', 'containerWrap precipOpt');
        const cloudPrecipContainer = this.createElement('div', 'container');

        const cloudIcon = this.createElement('div', 'cloudCoverIcon');
        const cloudCol = this.createElement('div', 'containerCol');
        const cloudTitle = this.createElement('h4', 'title', 'Cloud');
        const cloudValueHolder = this.createElement('div', 'valueHolder');
        const cloudValue = this.createElement('p', 'value');
        if (forecast.currentConditions !== undefined) {
            cloudValue.textContent = forecast.currentConditions.cloudcover;
        } else {
            cloudValue.textContent = forecast.days[0].hours[today.getHours()].cloudcover;
        }
        const cloudUnit = this.createElement('p', 'unit', '%');
        cloudValueHolder.appendChild(cloudValue);
        cloudValueHolder.appendChild(cloudUnit);
        cloudCol.appendChild(cloudTitle);
        cloudCol.appendChild(cloudValueHolder);

        const precipIcon = this.createElement('div', 'precipIcon');
        const precipCol = this.createElement('div', 'containerCol');
        const precipTitle = this.createElement('h4', 'title', 'Precip');
        const precipValueHolder = this.createElement('div', 'valueHolder');
        const precipValue = this.createElement('p', 'value', forecast.days[0].precipprob);
        const precipUnit = this.createElement('p', 'unit', '%');
        precipValueHolder.appendChild(precipValue);
        precipValueHolder.appendChild(precipUnit);
        precipCol.appendChild(precipTitle);
        precipCol.appendChild(precipValueHolder);

        cloudPrecipContainer.appendChild(cloudIcon);
        cloudPrecipContainer.appendChild(cloudCol);
        cloudPrecipContainer.appendChild(precipIcon);
        cloudPrecipContainer.appendChild(precipCol);

        const rainSnowContainer = this.createElement('div', 'container');
        const rainIcon = this.createElement('div', 'precipRainIcon');
        const rainCol = this.createElement('div', 'containerCol');
        const rainTitle = this.createElement('h4', 'title', 'Rain');
        const rainValueHolder = this.createElement('div', 'valueHolder');
        const rainValue = this.createElement('p', 'value', this.speedToggle === 0 ? forecast.days[0].precip : this.convertCm(forecast.days[0].precip));
        const rainUnit = this.createElement('p', 'unit', this.speedToggle === 0 ? "in" : "cm");
        rainValueHolder.appendChild(rainValue);
        rainValueHolder.appendChild(rainUnit);
        rainCol.appendChild(rainTitle);
        rainCol.appendChild(rainValueHolder);

        const snowIcon = this.createElement('div', 'precipSnowIcon');
        const snowCol = this.createElement('div', 'containerCol');
        const snowTitle = this.createElement('h4', 'title', 'Snow');
        const snowValueHolder = this.createElement('div', 'valueHolder');
        const snowValue = this.createElement('p', 'value', this.speedToggle === 0 ? forecast.days[0].snow : this.convertCm(forecast.days[0].snow));
        const snowUnit = this.createElement('p', 'unit', this.speedToggle === 0 ? "in" : "cm");
        snowValueHolder.appendChild(snowValue);
        snowValueHolder.appendChild(snowUnit);
        snowCol.appendChild(snowTitle);
        snowCol.appendChild(snowValueHolder);

        rainSnowContainer.appendChild(rainIcon);
        rainSnowContainer.appendChild(rainCol);
        rainSnowContainer.appendChild(snowIcon);
        rainSnowContainer.appendChild(snowCol);

        containerWrap2.appendChild(cloudPrecipContainer);
        containerWrap2.appendChild(rainSnowContainer);

        if (!forecast.days[0].precip > 0 && !forecast.days[0].snow > 0) {
            rainSnowContainer.style.display = "none";
        } else if (!forecast.days[0].precip > 0) {
            rainIcon.style.display = "none";
            rainCol.style.display = "none";
        } else if (!forecast.days[0].snow > 0) {
            snowIcon.style.display = "none";
            snowCol.style.display = "none";
        }

        // --- containerWrap: Humidity/Dew & Wind ---
        const containerWrap3 = this.createElement('div', 'containerWrap');

        // Humidity & Dew
        const humidityContainer = this.createElement('div', 'container');
        const humidityIcon = this.createElement('div', 'humidityIcon');

        const humidityCol = this.createElement('div', 'containerCol');
        const humidityTitle = this.createElement('h4', 'title', 'Humidity');
        const humidityValueHolder = this.createElement('div', 'valueHolder');
        const humidityValue = this.createElement('p', 'value');
        if (forecast.currentConditions !== undefined) {
            humidityValue.textContent = forecast.currentConditions.humidity;
        } else {
            humidityValue.textContent = forecast.days[0].hours[today.getHours()].humidity;
        }
        const humidityUnit = this.createElement('p', 'unit', '%');
        humidityValueHolder.appendChild(humidityValue);
        humidityValueHolder.appendChild(humidityUnit);
        humidityCol.appendChild(humidityTitle);
        humidityCol.appendChild(humidityValueHolder);

        const dewIcon = this.createElement('div', 'dewIcon');
        const dewCol = this.createElement('div', 'containerCol');
        const dewTitle = this.createElement('h4', 'title', 'Dew Point');
        const dewValueHolder = this.createElement('div', 'valueHolder');
        const dewValue = this.createElement('p', 'value');
        if (forecast.currentConditions !== undefined) {
            dewValue.textContent = this.tempToggle === 0 ? forecast.currentConditions.dew : this.convertC(forecast.currentConditions.dew);
        } else {
            dewValue.textContent = this.tempToggle === 0 ? forecast.days[0].dew : this.convertC(forecast.days[0].dew);
        }
        const dewUnit = this.createElement('p', 'unit', this.tempToggle === 0 ? '°F' : '°C');
        dewValueHolder.appendChild(dewValue);
        dewValueHolder.appendChild(dewUnit);
        dewCol.appendChild(dewTitle);
        dewCol.appendChild(dewValueHolder);

        humidityContainer.appendChild(humidityIcon);
        humidityContainer.appendChild(humidityCol);
        humidityContainer.appendChild(dewIcon);
        humidityContainer.appendChild(dewCol);

        // Wind container
        const windContainer = this.createElement('div', 'container');
        const windIcon = this.createElement('div', 'windIcon');
        const fromCol = this.createElement('div', 'containerCol');
        const fromTitle = this.createElement('h4', 'title', 'From');
        const fromValue = this.createElement('p', 'value');
        if (forecast.currentConditions !== undefined) {
            fromValue.textContent = Weather.getWindDir(forecast.currentConditions.winddir);
        } else {
            fromValue.textContent = Weather.getWindDir(forecast.days[0].hours[today.getHours()].winddir);
        }
        fromCol.appendChild(fromTitle);
        fromCol.appendChild(fromValue);

        const windDirArrow = this.createElement('div', 'windDirArrow');
        if (forecast.currentConditions !== undefined) {
            windDirArrow.classList.add(Weather.getWindDirIcon(Weather.getWindDir(forecast.currentConditions.winddir)));
        } else {
            windDirArrow.classList.add(Weather.getWindDirIcon(Weather.getWindDir(forecast.days[0].hours[today.getHours()].winddir)));

        }

        const speedCol = this.createElement('div', 'containerCol');
        const speedTitle = this.createElement('h4', 'title', 'Speed');
        const speedValueHolder = this.createElement('div', 'valueHolder');
        const speedValue = this.createElement('p', 'value');
        if (forecast.currentConditions !== undefined) {
            speedValue.textContent = this.speedToggle === 0 ? forecast.currentConditions.windspeed : this.convertKm(forecast.currentConditions.windspeed);
        } else {
            speedValue.textContent = this.speedToggle === 0 ? forecast.days[0].hours[today.getHours()].windspeed : this.convertKm(forecast.days[0].hours[today.getHours()].windspeed);

        }
        const speedUnit = this.createElement('p', 'unit', this.speedToggle === 0 ? "mph": "km/h");
        speedValueHolder.appendChild(speedValue);
        speedValueHolder.appendChild(speedUnit);
        speedCol.appendChild(speedTitle);
        speedCol.appendChild(speedValueHolder);

        const gustCol = this.createElement('div', 'containerCol');
        const gustTitle = this.createElement('h4', 'title', 'Gust');
        const gustValueHolder = this.createElement('div', 'valueHolder');
        const gustValue = this.createElement('p', 'value');
        if (forecast.currentConditions !== undefined) {
            gustValue.textContent = this.speedToggle === 0 ? forecast.currentConditions.windgust : this.convertKm(forecast.currentConditions.windgust);
        } else {
            gustValue.textContent = this.speedToggle === 0 ? forecast.days[0].hours[today.getHours()].windgust : this.convertKm(forecast.days[0].hours[today.getHours()].windgust);
        }
        const gustUnit = this.createElement('p', 'unit', this.speedToggle === 0 ? "mph": "km/h");
        gustValueHolder.appendChild(gustValue);
        gustValueHolder.appendChild(gustUnit);
        gustCol.appendChild(gustTitle);
        gustCol.appendChild(gustValueHolder);

        windContainer.appendChild(windIcon);
        windContainer.appendChild(fromCol);
        windContainer.appendChild(windDirArrow);
        windContainer.appendChild(speedCol);
        windContainer.appendChild(gustCol);

        containerWrap3.appendChild(humidityContainer);
        containerWrap3.appendChild(windContainer);

        if (forecast.currentConditions !== undefined) {
            if (!forecast.currentConditions.windgust > 0 || forecast.currentConditions.windgust < forecast.currentConditions.wind) {
                gustCol.style.display = "none";
            }
        } else {
            if (!forecast.days[0].hours[today.getHours()].windgust > 0 || forecast.days[0].hours[today.getHours()].windgust < forecast.days[0].hours[today.getHours()].wind) {
                gustCol.style.display = "none";
        }}

        // --- containerWrap: Visibility, UV, Sunrise, Sunset, Moon ---
        const containerWrap4 = this.createElement('div', 'containerWrap');

        // Visibility & UV
        const visUVContainer = this.createElement('div', 'container');
        const visibilityIcon = this.createElement('div', 'visibilityIcon');

        const visibilityCol = this.createElement('div', 'containerCol');
        const visibilityTitle = this.createElement('h4', 'title', 'Visibility');
        const visibilityValueHolder = this.createElement('div', 'valueHolder');
        const visibilityValue = this.createElement('p', 'value');
        if (forecast.currentConditions !== undefined) {
            visibilityValue.textContent = this.speedToggle === 0 ? forecast.currentConditions.visibility : this.convertKm(forecast.currentConditions.visibility);
        } else {
            visibilityValue.textContent = this.speedToggle === 0 ? forecast.days[0].hours[today.getHours()].visibility : this.convertKm(forecast.days[0].hours[today.getHours()].visibility);
        }
        const visibilityUnit = this.createElement('p', 'unit', this.speedToggle === 0 ? "mi": "km");
        visibilityValueHolder.appendChild(visibilityValue);
        visibilityValueHolder.appendChild(visibilityUnit);
        visibilityCol.appendChild(visibilityTitle);
        visibilityCol.appendChild(visibilityValueHolder);

        const uvIcon = this.createElement('div', 'UVindexIcon');
        const uvCol = this.createElement('div', 'containerCol');
        const uvTitle = this.createElement('h4', 'title', 'UV Index');
        const uvValueHolder = this.createElement('div', 'valueHolder');
        const uvValue = this.createElement('p', 'value', forecast.days[0].uvindex);
        const uvUnit = this.createElement('p', 'unit', '/10');
        uvValueHolder.appendChild(uvValue);
        uvValueHolder.appendChild(uvUnit);
        uvCol.appendChild(uvTitle);
        uvCol.appendChild(uvValueHolder);

        visUVContainer.appendChild(visibilityIcon);
        visUVContainer.appendChild(visibilityCol);
        visUVContainer.appendChild(uvIcon);
        visUVContainer.appendChild(uvCol);

        // Sunrise & Sunset
        const sunContainer = this.createElement('div', 'container');
        const sunriseIcon = this.createElement('div', 'sunriseIcon');
        const sunriseCol = this.createElement('div', 'containerCol');
        const sunriseTitle = this.createElement('h4', 'title', 'Sunrise');
        const parsedSunrise = parse(forecast.days[0].sunrise, "HH:mm:ss", new Date());
        const sunriseValue = this.createElement('p', 'value', format(parsedSunrise, "h:mm aaa"));
        sunriseCol.appendChild(sunriseTitle);
        sunriseCol.appendChild(sunriseValue);

        const sunsetIcon = this.createElement('div', 'sunsetIcon');
        const sunsetCol = this.createElement('div', 'containerCol');
        const sunsetTitle = this.createElement('h4', 'title', 'Sunset');
        const parsedSunset = parse(forecast.days[0].sunset, "HH:mm:ss", new Date());
        const sunsetValue = this.createElement('p', 'value', format(parsedSunset, "h:mm aaa"));
        sunsetCol.appendChild(sunsetTitle);
        sunsetCol.appendChild(sunsetValue);

        sunContainer.appendChild(sunriseIcon);
        sunContainer.appendChild(sunriseCol);
        sunContainer.appendChild(sunsetIcon);
        sunContainer.appendChild(sunsetCol);

        // Moon
        const moonContainer = this.createElement('div', 'container');
        const moonIcon = this.createElement('div', 'currentMoonIcon');
        if (forecast.currentConditions !== undefined) {
            moonIcon.classList.add(Weather.getMoonIcon(Weather.getMoonPhase(forecast.currentConditions.moonphase)));
        } else {
            moonIcon.classList.add(Weather.getMoonIcon(Weather.getMoonPhase(forecast.days[0].moonphase)));
        }
        const moonCol = this.createElement('div', 'containerCol');
        const moonTitle = this.createElement('h4', 'title', 'Moon Phase');
        const moonValue = this.createElement('p', 'value');
        if (forecast.currentConditions !== undefined) {
            moonValue.textContent = Weather.getMoonPhase(forecast.currentConditions.moonphase);
        } else {
            moonValue.textContent = Weather.getMoonPhase(forecast.days[0].moonphase);
        }
        moonCol.appendChild(moonTitle);
        moonCol.appendChild(moonValue);

        moonContainer.appendChild(moonIcon);
        moonContainer.appendChild(moonCol);

        // Append all to containerWrap4
        containerWrap4.appendChild(visUVContainer);
        containerWrap4.appendChild(sunContainer);
        containerWrap4.appendChild(moonContainer);

        // --- Append all ---
        sectionCurrent.appendChild(currentHeader);
        sectionCurrent.appendChild(containerWrap1);
        sectionCurrent.appendChild(containerWrap2);
        sectionCurrent.appendChild(containerWrap3);
        sectionCurrent.appendChild(containerWrap4);

        content.appendChild(sectionCurrent);
    }

    redrawHourly() {
        const content = document.querySelector(".content");

        const sectionHourly = this.createElement('section', 'upcoming');
        const header = this.createElement('h3', 'upcomingHeader', 'Hourly');
        const forecastContainer = this.createElement('div', 'forecastContainer');

        sectionHourly.appendChild(header);
        sectionHourly.appendChild(forecastContainer);

        const today = new Date();
        let startHour = 0;
        let nextDayHours = 0;
        const nextDay = this.dayIndex + 1;
        if (this.dayIndex === 0) {
            startHour = today.getHours();
        }
        if (startHour >= 13) {
            nextDayHours = startHour - 12;
        }

        //loop remaining hours in current day, or all 24 hours if future day
        for (let i = startHour; i < 24; i++) {
            const forecastCard = this.createElement('div', 'forecastCard');

            const col1 = this.createElement('div', 'containerCol');
            const parsedHour = parse(forecast.days[this.dayIndex].hours[i].datetime, "HH:mm:ss", new Date());
            const col1Title = this.createElement('h3', 'title', format(parsedHour, "h aaa"));
            col1.appendChild(col1Title);

            const col2 = this.createElement('div', 'containerCol');
            const icon = this.createElement('div', 'upcomingIcon');
            icon.classList.add(Weather.getConditionIcon(forecast.days[this.dayIndex].hours[i].icon));
            const chance = this.createElement('p', 'value', `${forecast.days[this.dayIndex].hours[i].precipprob}%`);
            col2.appendChild(icon);
            col2.appendChild(chance);
            if (!forecast.days[this.dayIndex].hours[i].precipprob > 0) {
                chance.style.visibility = "hidden";
            }

            const col3 = this.createElement('div', 'containerCol');
            const highHolder = this.createElement('div', 'valueHolder');
            const highTemp = this.createElement('p', 'title', this.tempToggle === 0 ? Math.trunc(forecast.days[this.dayIndex].hours[i].temp) : this.convertC(forecast.days[this.dayIndex].hours[i].temp));
            const highUnit = this.createElement('p', 'unit', this.tempToggle === 0 ? "°F" : "°C");
            highHolder.appendChild(highTemp);
            highHolder.appendChild(highUnit);

            col3.appendChild(highHolder);

            forecastCard.appendChild(col1);
            forecastCard.appendChild(col2);
            forecastCard.appendChild(col3);

            forecastContainer.appendChild(forecastCard);
        } //loop end

        //loop for hours from next day to make a total of at least 12 hour cards
        for (let i = 0; i < nextDayHours; i++) {
            const forecastCard = this.createElement('div', 'forecastCard');

            const col1 = this.createElement('div', 'containerCol');
            const parsedHour = parse(forecast.days[nextDay].hours[i].datetime, "HH:mm:ss", new Date());
            const col1Title = this.createElement('h3', 'title', format(parsedHour, "h aaa"));
            col1.appendChild(col1Title);

            const col2 = this.createElement('div', 'containerCol');
            const icon = this.createElement('div', 'upcomingIcon');
            icon.classList.add(Weather.getConditionIcon(forecast.days[nextDay].hours[i].icon));
            const chance = this.createElement('p', 'value', `${forecast.days[nextDay].hours[i].precipprob}%`);
            col2.appendChild(icon);
            col2.appendChild(chance);
            if (!forecast.days[nextDay].hours[i].precipprob > 0) {
                chance.style.visibility = "hidden";
            }

            const col3 = this.createElement('div', 'containerCol');
            const highHolder = this.createElement('div', 'valueHolder');
            const highTemp = this.createElement('p', 'title', this.tempToggle === 0 ? Math.trunc(forecast.days[nextDay].hours[i].temp) : this.convertC(forecast.days[nextDay].hours[i].temp));
            const highUnit = this.createElement('p', 'unit', this.tempToggle === 0 ? "°F" : "°C");
            highHolder.appendChild(highTemp);
            highHolder.appendChild(highUnit);

            col3.appendChild(highHolder);

            forecastCard.appendChild(col1);
            forecastCard.appendChild(col2);
            forecastCard.appendChild(col3);

            forecastContainer.appendChild(forecastCard);
        } //loop end

        content.appendChild(sectionHourly);
    }

    redrawUpcoming() {
        const content = document.querySelector(".content");

        const sectionUpcoming = this.createElement('section', 'upcoming');
        const header = this.createElement('h3', 'upcomingHeader', 'Next 7 Days');
        const forecastContainer = this.createElement('div', 'forecastContainer');

        sectionUpcoming.appendChild(header);
        sectionUpcoming.appendChild(forecastContainer);

        const today = new Date();
        
        //loop start
        for (let i = 1; i < 8; i++) {
            const indexDate = addDays(today, i);
            const forecastCard = this.createElement('div', 'forecastCard');

            const col1 = this.createElement('button', 'containerCol');
            col1.id = "dateBtn";
            col1.addEventListener("click", () => {
                this.dayIndex = i;
                this.redrawFuture(i);
            });

            const col1Title = this.createElement('h3', 'title', format(indexDate, "EEE"));
            const col1Date = this.createElement('p', 'title', format(indexDate, "L/d"));
            col1.appendChild(col1Title);
            col1.appendChild(col1Date);

            const col2 = this.createElement('div', 'containerCol');
            const icon = this.createElement('div', 'upcomingIcon');
            icon.classList.add(Weather.getConditionIcon(forecast.days[i].icon));
            const chance = this.createElement('p', 'value', `${forecast.days[i].precipprob}%`);
            col2.appendChild(icon);
            col2.appendChild(chance);
            if (!forecast.days[i].precipprob > 0) {
                chance.style.visibility = "hidden";
            }

            const col3 = this.createElement('div', 'containerCol');
            const highHolder = this.createElement('div', 'valueHolder');
            const highTemp = this.createElement('h3', 'title', this.tempToggle === 0 ? Math.trunc(forecast.days[i].tempmax) : this.convertC(forecast.days[i].tempmax));
            const highUnit = this.createElement('h3', 'value', this.tempToggle === 0 ? "°F" : "°C");
            highHolder.appendChild(highTemp);
            highHolder.appendChild(highUnit);

            const lowHolder = this.createElement('div', 'valueHolder');
            const lowTemp = this.createElement('p', 'title', this.tempToggle === 0 ? Math.trunc(forecast.days[i].tempmin) : this.convertC(forecast.days[i].tempmin));
            const lowUnit = this.createElement('p', 'unit', this.tempToggle === 0 ? "°F" : "°C");
            lowHolder.appendChild(lowTemp);
            lowHolder.appendChild(lowUnit);

            col3.appendChild(highHolder);
            col3.appendChild(lowHolder);

            forecastCard.appendChild(col1);
            forecastCard.appendChild(col2);
            forecastCard.appendChild(col3);

            forecastContainer.appendChild(forecastCard);
        }
        //loop end

        content.appendChild(sectionUpcoming);
    }

    redrawFuture(index) {
        this.displayType = "future";
        const content = document.querySelector(".content");
        content.innerHTML = "";

        // future
        const sectionFuture = this.createElement("section", "future");
        const backBtn = this.createElement("button", "container");
        backBtn.id = "backBtn";
        backBtn.textContent = "Back";
        backBtn.addEventListener("click", () => {
            this.dayIndex = 0;
            this.redrawOverview();
        });


        const currentHeader = this.createElement('div', 'currentHeader');
        const currentHeaderMain = this.createElement('div', 'currentHeaderMain');
        const h2 = this.createElement('h2', 'resolvedAddress', forecast.resolvedAddress);
        const h4Desc = this.createElement('h4', 'forecastDescription', forecast.description);

        currentHeaderMain.appendChild(h2);
        currentHeaderMain.appendChild(h4Desc);

        if (this.containsNoLetters(h2.textContent)) {
            h2.style.display = "none";
        }

        const headerContainer = this.createElement('div', 'container');
        const latLonIcon = this.createElement('div', 'latLonIcon');

        const latCol = this.createElement('div', 'containerCol');
        const latTitle = this.createElement('h4', 'title', 'Lat');
        const latValue = this.createElement('p', 'value', forecast.latitude);
        latCol.appendChild(latTitle);
        latCol.appendChild(latValue);

        const lonCol = this.createElement('div', 'containerCol');
        const lonTitle = this.createElement('h4', 'title', 'Lon');
        const lonValue = this.createElement('p', 'value', forecast.longitude);
        lonCol.appendChild(lonTitle);
        lonCol.appendChild(lonValue);

        headerContainer.appendChild(latLonIcon);
        headerContainer.appendChild(latCol);
        headerContainer.appendChild(lonCol);

        currentHeader.appendChild(currentHeaderMain);
        currentHeader.appendChild(headerContainer);

        // --- containerWrap: currentDate & Temp ---
        const containerWrap1 = this.createElement('div', 'containerWrap');
        const currentDate = this.createElement('div', 'currentDate');
        const today = new Date();
        const dateIndex = addDays(today, index);
        const date = this.createElement('h3', 'date', format((dateIndex), "EEEE, MMMM do, yyyy"));
        const currentDescription = this.createElement('h4', 'currentDescription', forecast.days[index].description);

        currentDate.appendChild(date);
        currentDate.appendChild(currentDescription);

        const currentConditionIcon = this.createElement('div', 'currentConditionIcon');
        currentConditionIcon.classList.add(Weather.getConditionIcon(forecast.days[index].icon))

        const tempContainer = this.createElement('div', 'tempContainer');
        const tempIcon = this.createElement('div', 'tempIcon');
        tempIcon.classList.add(Weather.getTempIcon(forecast.days[index].temp));

        const tempMaxMin = this.createElement('div', 'tempMaxMin');

        // High
        const highCol = this.createElement('div', 'containerCol');
        const highTitle = this.createElement('h4', 'title', 'High');
        const highValueHolder = this.createElement('div', 'valueHolder');
        const highValue = this.createElement('p', 'value', this.tempToggle === 0 ? Math.trunc(forecast.days[index].tempmax) : this.convertC(forecast.days[index].tempmax));
        const highUnit = this.createElement('p', 'unit', this.tempToggle === 0 ? '°F' : '°C');
        highValueHolder.appendChild(highValue);
        highValueHolder.appendChild(highUnit);
        highCol.appendChild(highTitle);
        highCol.appendChild(highValueHolder);

        // Low
        const lowCol = this.createElement('div', 'containerCol');
        const lowTitle = this.createElement('h4', 'title', 'Low');
        const lowValueHolder = this.createElement('div', 'valueHolder');
        const lowValue = this.createElement('p', 'value', this.tempToggle === 0 ? Math.trunc(forecast.days[index].tempmin) : this.convertC(forecast.days[index].tempmin));
        const lowUnit = this.createElement('p', 'unit', this.tempToggle === 0 ? '°F' : '°C');
        lowValueHolder.appendChild(lowValue);
        lowValueHolder.appendChild(lowUnit);
        lowCol.appendChild(lowTitle);
        lowCol.appendChild(lowValueHolder);

        tempMaxMin.appendChild(highCol);
        tempMaxMin.appendChild(lowCol);

        tempContainer.appendChild(tempIcon);
        tempContainer.appendChild(tempMaxMin);

        containerWrap1.appendChild(currentDate);
        containerWrap1.appendChild(currentConditionIcon);
        containerWrap1.appendChild(tempContainer);

        // --- containerWrap precipOpt ---
        const containerWrap2 = this.createElement('div', 'containerWrap precipOpt');
        const cloudPrecipContainer = this.createElement('div', 'container');

        const cloudIcon = this.createElement('div', 'cloudCoverIcon');
        const cloudCol = this.createElement('div', 'containerCol');
        const cloudTitle = this.createElement('h4', 'title', 'Cloud');
        const cloudValueHolder = this.createElement('div', 'valueHolder');
        const cloudValue = this.createElement('p', 'value', forecast.days[index].cloudcover);
        const cloudUnit = this.createElement('p', 'unit', '%');
        cloudValueHolder.appendChild(cloudValue);
        cloudValueHolder.appendChild(cloudUnit);
        cloudCol.appendChild(cloudTitle);
        cloudCol.appendChild(cloudValueHolder);

        const precipIcon = this.createElement('div', 'precipIcon');
        const precipCol = this.createElement('div', 'containerCol');
        const precipTitle = this.createElement('h4', 'title', 'Precip');
        const precipValueHolder = this.createElement('div', 'valueHolder');
        const precipValue = this.createElement('p', 'value', forecast.days[index].precipprob);
        const precipUnit = this.createElement('p', 'unit', '%');
        precipValueHolder.appendChild(precipValue);
        precipValueHolder.appendChild(precipUnit);
        precipCol.appendChild(precipTitle);
        precipCol.appendChild(precipValueHolder);

        cloudPrecipContainer.appendChild(cloudIcon);
        cloudPrecipContainer.appendChild(cloudCol);
        cloudPrecipContainer.appendChild(precipIcon);
        cloudPrecipContainer.appendChild(precipCol);

        const rainSnowContainer = this.createElement('div', 'container');
        const rainIcon = this.createElement('div', 'precipRainIcon');
        const rainCol = this.createElement('div', 'containerCol');
        const rainTitle = this.createElement('h4', 'title', 'Rain');
        const rainValueHolder = this.createElement('div', 'valueHolder');
        const rainValue = this.createElement('p', 'value', this.speedToggle === 0 ? forecast.days[index].precip : this.convertCm(forecast.days[index].precip));
        const rainUnit = this.createElement('p', 'unit', this.speedToggle === 0 ? "in" : "cm");
        rainValueHolder.appendChild(rainValue);
        rainValueHolder.appendChild(rainUnit);
        rainCol.appendChild(rainTitle);
        rainCol.appendChild(rainValueHolder);

        const snowIcon = this.createElement('div', 'precipSnowIcon');
        const snowCol = this.createElement('div', 'containerCol');
        const snowTitle = this.createElement('h4', 'title', 'Snow');
        const snowValueHolder = this.createElement('div', 'valueHolder');
        const snowValue = this.createElement('p', 'value', this.speedToggle === 0 ? forecast.days[index].snow : this.convertCm(forecast.days[index].snow));
        const snowUnit = this.createElement('p', 'unit', this.speedToggle === 0 ? "in" : "cm");
        snowValueHolder.appendChild(snowValue);
        snowValueHolder.appendChild(snowUnit);
        snowCol.appendChild(snowTitle);
        snowCol.appendChild(snowValueHolder);

        rainSnowContainer.appendChild(rainIcon);
        rainSnowContainer.appendChild(rainCol);
        rainSnowContainer.appendChild(snowIcon);
        rainSnowContainer.appendChild(snowCol);

        containerWrap2.appendChild(cloudPrecipContainer);
        containerWrap2.appendChild(rainSnowContainer);

        if (!forecast.days[index].precip > 0 && !forecast.days[index].snow > 0) {
            rainSnowContainer.style.display = "none";
        } else if (!forecast.days[index].precip > 0) {
            rainIcon.style.display = "none";
            rainCol.style.display = "none";
        } else if (!forecast.days[index].snow > 0) {
            snowIcon.style.display = "none";
            snowCol.style.display = "none";
        }

        // --- containerWrap: Humidity/Dew & Wind ---
        const containerWrap3 = this.createElement('div', 'containerWrap');

        // Humidity & Dew
        const humidityContainer = this.createElement('div', 'container');
        const humidityIcon = this.createElement('div', 'humidityIcon');

        const humidityCol = this.createElement('div', 'containerCol');
        const humidityTitle = this.createElement('h4', 'title', 'Humidity');
        const humidityValueHolder = this.createElement('div', 'valueHolder');
        const humidityValue = this.createElement('p', 'value', forecast.days[index].humidity);
        const humidityUnit = this.createElement('p', 'unit', '%');
        humidityValueHolder.appendChild(humidityValue);
        humidityValueHolder.appendChild(humidityUnit);
        humidityCol.appendChild(humidityTitle);
        humidityCol.appendChild(humidityValueHolder);

        const dewIcon = this.createElement('div', 'dewIcon');
        const dewCol = this.createElement('div', 'containerCol');
        const dewTitle = this.createElement('h4', 'title', 'Dew Point');
        const dewValueHolder = this.createElement('div', 'valueHolder');
        const dewValue = this.createElement('p', 'value', this.tempToggle === 0 ? forecast.days[index].dew : this.convertC(forecast.days[index].dew));
        const dewUnit = this.createElement('p', 'unit', this.tempToggle === 0 ? '°F' : '°C');
        dewValueHolder.appendChild(dewValue);
        dewValueHolder.appendChild(dewUnit);
        dewCol.appendChild(dewTitle);
        dewCol.appendChild(dewValueHolder);

        humidityContainer.appendChild(humidityIcon);
        humidityContainer.appendChild(humidityCol);
        humidityContainer.appendChild(dewIcon);
        humidityContainer.appendChild(dewCol);

        // Wind container
        const windContainer = this.createElement('div', 'container');
        const windIcon = this.createElement('div', 'windIcon');
        const fromCol = this.createElement('div', 'containerCol');
        const fromTitle = this.createElement('h4', 'title', 'From');
        const fromValue = this.createElement('p', 'value', Weather.getWindDir(forecast.days[index].winddir));
        fromCol.appendChild(fromTitle);
        fromCol.appendChild(fromValue);

        const windDirArrow = this.createElement('div', 'windDirArrow');
        windDirArrow.classList.add(Weather.getWindDirIcon(Weather.getWindDir(forecast.days[index].winddir)));

        const speedCol = this.createElement('div', 'containerCol');
        const speedTitle = this.createElement('h4', 'title', 'Speed');
        const speedValueHolder = this.createElement('div', 'valueHolder');
        const speedValue = this.createElement('p', 'value', this.speedToggle === 0 ? forecast.days[index].windspeed : this.convertKm(forecast.days[index].windspeed));
        const speedUnit = this.createElement('p', 'unit', this.speedToggle === 0 ? "mph": "km/h");
        speedValueHolder.appendChild(speedValue);
        speedValueHolder.appendChild(speedUnit);
        speedCol.appendChild(speedTitle);
        speedCol.appendChild(speedValueHolder);

        const gustCol = this.createElement('div', 'containerCol');
        const gustTitle = this.createElement('h4', 'title', 'Gust');
        const gustValueHolder = this.createElement('div', 'valueHolder');
        const gustValue = this.createElement('p', 'value', this.speedToggle === 0 ? forecast.days[index].windgust : this.convertKm(forecast.days[index].windgust));
        const gustUnit = this.createElement('p', 'unit', this.speedToggle === 0 ? "mph": "km/h");
        gustValueHolder.appendChild(gustValue);
        gustValueHolder.appendChild(gustUnit);
        gustCol.appendChild(gustTitle);
        gustCol.appendChild(gustValueHolder);

        windContainer.appendChild(windIcon);
        windContainer.appendChild(fromCol);
        windContainer.appendChild(windDirArrow);
        windContainer.appendChild(speedCol);
        windContainer.appendChild(gustCol);

        containerWrap3.appendChild(humidityContainer);
        containerWrap3.appendChild(windContainer);

        if (!forecast.days[index].windgust > 0 || forecast.days[index].windgust < forecast.days[index].wind) {
            gustCol.style.display = "none";
        }

        // --- containerWrap: Visibility, UV, Sunrise, Sunset, Moon ---
        const containerWrap4 = this.createElement('div', 'containerWrap');

        // Visibility & UV
        const visUVContainer = this.createElement('div', 'container');
        const visibilityIcon = this.createElement('div', 'visibilityIcon');

        const visibilityCol = this.createElement('div', 'containerCol');
        const visibilityTitle = this.createElement('h4', 'title', 'Visibility');
        const visibilityValueHolder = this.createElement('div', 'valueHolder');
        const visibilityValue = this.createElement('p', 'value', this.speedToggle === 0 ? forecast.days[index].visibility : this.convertKm(forecast.days[index].visibility));
        const visibilityUnit = this.createElement('p', 'unit', this.speedToggle === 0 ? "mi": "km");
        visibilityValueHolder.appendChild(visibilityValue);
        visibilityValueHolder.appendChild(visibilityUnit);
        visibilityCol.appendChild(visibilityTitle);
        visibilityCol.appendChild(visibilityValueHolder);

        const uvIcon = this.createElement('div', 'UVindexIcon');
        const uvCol = this.createElement('div', 'containerCol');
        const uvTitle = this.createElement('h4', 'title', 'UV Index');
        const uvValueHolder = this.createElement('div', 'valueHolder');
        const uvValue = this.createElement('p', 'value', forecast.days[index].uvindex);
        const uvUnit = this.createElement('p', 'unit', '/10');
        uvValueHolder.appendChild(uvValue);
        uvValueHolder.appendChild(uvUnit);
        uvCol.appendChild(uvTitle);
        uvCol.appendChild(uvValueHolder);

        visUVContainer.appendChild(visibilityIcon);
        visUVContainer.appendChild(visibilityCol);
        visUVContainer.appendChild(uvIcon);
        visUVContainer.appendChild(uvCol);

        // Sunrise & Sunset
        const sunContainer = this.createElement('div', 'container');
        const sunriseIcon = this.createElement('div', 'sunriseIcon');
        const sunriseCol = this.createElement('div', 'containerCol');
        const sunriseTitle = this.createElement('h4', 'title', 'Sunrise');
        const parsedSunrise = parse(forecast.days[index].sunrise, "HH:mm:ss", new Date());
        const sunriseValue = this.createElement('p', 'value', format(parsedSunrise, "H:mm"));
        sunriseCol.appendChild(sunriseTitle);
        sunriseCol.appendChild(sunriseValue);

        const sunsetIcon = this.createElement('div', 'sunsetIcon');
        const sunsetCol = this.createElement('div', 'containerCol');
        const sunsetTitle = this.createElement('h4', 'title', 'Sunset');
        const parsedSunset = parse(forecast.days[index].sunset, "HH:mm:ss", new Date());
        const sunsetValue = this.createElement('p', 'value', format(parsedSunset, "H:mm"));
        sunsetCol.appendChild(sunsetTitle);
        sunsetCol.appendChild(sunsetValue);

        sunContainer.appendChild(sunriseIcon);
        sunContainer.appendChild(sunriseCol);
        sunContainer.appendChild(sunsetIcon);
        sunContainer.appendChild(sunsetCol);

        // Moon
        const moonContainer = this.createElement('div', 'container');
        const moonIcon = this.createElement('div', 'currentMoonIcon');
        moonIcon.classList.add(Weather.getMoonIcon(Weather.getMoonPhase(forecast.days[index].moonphase)));
        const moonCol = this.createElement('div', 'containerCol');
        const moonTitle = this.createElement('h4', 'title', 'Moon Phase');
        const moonValue = this.createElement('p', 'value', Weather.getMoonPhase(forecast.days[index].moonphase));
        moonCol.appendChild(moonTitle);
        moonCol.appendChild(moonValue);

        moonContainer.appendChild(moonIcon);
        moonContainer.appendChild(moonCol);

        // Append all to containerWrap4
        containerWrap4.appendChild(visUVContainer);
        containerWrap4.appendChild(sunContainer);
        containerWrap4.appendChild(moonContainer);

        // --- Append all ---
        sectionFuture.appendChild(currentHeader);
        sectionFuture.appendChild(containerWrap1);
        sectionFuture.appendChild(containerWrap2);
        sectionFuture.appendChild(containerWrap3);
        sectionFuture.appendChild(containerWrap4);

        const backBtn2 = this.createElement("button", "container");
        backBtn2.id = "backBtn";
        backBtn2.textContent = "Back";
        backBtn2.addEventListener("click", () => {
            this.dayIndex = 0;
            this.redrawOverview();
        });

        content.appendChild(backBtn);
        content.appendChild(sectionFuture);
        this.redrawHourly();
        content.appendChild(backBtn2);

        window.scrollTo(0,0);
    }
}

