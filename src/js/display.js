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

    search() {

    }
}