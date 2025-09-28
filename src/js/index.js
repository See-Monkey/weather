console.log("Hi, Mom!");

import "../css/style.css";

document.addEventListener("click", (e) => {
    let target = e.target;
    
    switch(target.id) {
        case "settingsBtn":
            console.log("settings button clicked");
            break;
        case "settingTempBtn":
            console.log("temperature toggle clicked");
            break;
        case "settingSpeedBtn":
            console.log("speed toggle clicked");
            break;
        case "settingModeBtn":
            console.log("mode toggle clicked");
            break;
        case "searchBtn":
            console.log("search button clicked");
            break;
    }
});