import weather from "../js/weather.js";
import { format, addDays } from "date-fns";

const Weather = new weather();
let forecast = {};

export default class Display {
    constructor() {
        this.settingsToggle = 0;
        this.tempToggle = 0;
        this.speedToggle = 0;
        this.modeToggle = 0;
        this.displayType = "empty";
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
    }

    modeLight() {
        const settingModeBtn = document.querySelector("#settingModeBtn");
        settingModeBtn.classList.remove("active");

        this.modeToggle = 0;
    }

    modeDark() {
        const settingModeBtn = document.querySelector("#settingModeBtn");
        settingModeBtn.classList.add("active");

        this.modeToggle = 1;
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
        console.log(Weather.getWindDir(forecast.currentConditions.winddir));
        await this.delay(2000);
        this.redrawOverview();
        console.log(forecast);
        console.log(forecast.currentConditions.temp);
        console.log(this.convertC(forecast.currentConditions.temp));
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
            this.redrawFuture();
        }
    }

    redrawOverview() {
        this.displayType = "overview";
        const content = document.querySelector(".content");
        content.innerHTML = "";

        // current
        const current = document.createElement("section");
        current.classList.add("current")


        // upcoming
        const upcoming = document.createElement("section");
        upcoming.classList.add("upcoming")


        content.appendChild(current);
        content.appendChild(upcoming);
    }

    redrawFuture(index) {
        this.displayType = "future";
        const content = document.querySelector(".content");
        content.innerHTML = "";

        // future
        const future = document.createElement("section");
        future.classList.add("future");


        content.appendChild(future);
    }
}

// =============== testing =============== //
const today = new Date();
const nextWeek = addDays(today, 7);
forecast = Weather.fetchWeather("salt lake city, ut", format(today, "yyyy-MM-dd"), format(nextWeek, "yyyy-MM-dd"));
console.log(forecast);

