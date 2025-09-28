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

    async search() {
        const searchInput = document.querySelector("#searchInput");
        const today = new Date();
        const nextWeek = addDays(today, 7);
        console.log(today);
        forecast = await Weather.fetchWeather(searchInput.value, format(today, "yyyy-MM-dd"), format(nextWeek, "yyyy-MM-dd"));
        console.log(forecast);
        console.log(forecast.currentConditions.temp);
        console.log(this.convertC(forecast.currentConditions.temp));
    }
}

// =============== testing =============== //
