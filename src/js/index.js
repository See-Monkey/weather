console.log("Hi, Mom!");

import "../css/style.css";
import disp from "../js/display.js";

const Display = new disp();

document.addEventListener("click", (e) => {
    let target = e.target;
    
    switch(target.id) {
        case "settingsBtn":
            Display.toggleSettings();
            break;
        case "settingTempBtn":
            Display.toggleTemp();
            break;
        case "settingSpeedBtn":
            Display.toggleSpeed();
            break;
        case "settingModeBtn":
            Display.toggleMode();
            break;
        case "searchBtn":
            Display.search()
            break;
    }
});