    //WIP copy / paste file only
    
    // Helper to create element with class and optional text
    createElement(tag, className, textContent) {
        const el = document.createElement(tag);
        el.className = className;
        if (textContent !== undefined) el.textContent = textContent;
        return el;
    }

    // --- Section.current ---
    const section = this.createElement('section', 'current');

    // --- currentHeader ---
    const currentHeader = this.createElement('div', 'currentHeader');
    const currentHeaderMain = this.createElement('div', 'currentHeaderMain');
    const h2 = this.createElement('h2', 'resolvedAddress', 'Salt Lake City, UT, United States');
    const h4Desc = this.createElement('h4', 'forecastDescription', 'Cooling down with a chance of rain Tuesday.');

    currentHeaderMain.appendChild(h2);
    currentHeaderMain.appendChild(h4Desc);

    const headerContainer = this.createElement('div', 'container');
    const latLonIcon = this.createElement('div', 'latLonIcon');

    const latCol = this.createElement('div', 'containerCol');
    const latTitle = this.createElement('h4', 'title', 'Lat');
    const latValue = this.createElement('p', 'value', '40.7036');
    latCol.appendChild(latTitle);
    latCol.appendChild(latValue);

    const lonCol = this.createElement('div', 'containerCol');
    const lonTitle = this.createElement('h4', 'title', 'Lon');
    const lonValue = this.createElement('p', 'value', '-111.888');
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
    const date = this.createElement('h3', 'date', 'Sunday, September 28th, 2025');
    const currentDescription = this.createElement('h4', 'currentDescription', 'Partly cloudy throughout the day.');

    currentDate.appendChild(date);
    currentDate.appendChild(currentDescription);

    const currentConditionIcon = this.createElement('div', 'currentConditionIcon');

    const tempContainer = this.createElement('div', 'tempContainer');
    const tempIcon = this.createElement('div', 'tempIcon');

    const currentTemp = this.createElement('div', 'currentTemp');
    const valueHolderMain = this.createElement('div', 'valueHolder');
    const tempValue = this.createElement('h4', 'value', '74');
    const tempUnit = this.createElement('p', 'unit', '°F');
    valueHolderMain.appendChild(tempValue);
    valueHolderMain.appendChild(tempUnit);

    const feelCol = this.createElement('div', 'containerCol');
    const feelTitle = this.createElement('h4', 'title', 'Feel');
    const feelValueHolder = this.createElement('div', 'valueHolder');
    const feelValue = this.createElement('p', 'value', '73');
    const feelUnit = this.createElement('p', 'unit', '°F');
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
    const highValue = this.createElement('p', 'value', '82');
    const highUnit = this.createElement('p', 'unit', '°F');
    highValueHolder.appendChild(highValue);
    highValueHolder.appendChild(highUnit);
    highCol.appendChild(highTitle);
    highCol.appendChild(highValueHolder);

    // Low
    const lowCol = this.createElement('div', 'containerCol');
    const lowTitle = this.createElement('h4', 'title', 'Low');
    const lowValueHolder = this.createElement('div', 'valueHolder');
    const lowValue = this.createElement('p', 'value', '65');
    const lowUnit = this.createElement('p', 'unit', '°F');
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
    const cloudValue = this.createElement('p', 'value', '66');
    const cloudUnit = this.createElement('p', 'unit', '%');
    cloudValueHolder.appendChild(cloudValue);
    cloudValueHolder.appendChild(cloudUnit);
    cloudCol.appendChild(cloudTitle);
    cloudCol.appendChild(cloudValueHolder);

    const precipIcon = this.createElement('div', 'precipIcon');
    const precipCol = this.createElement('div', 'containerCol');
    const precipTitle = this.createElement('h4', 'title', 'Precip');
    const precipValueHolder = this.createElement('div', 'valueHolder');
    const precipValue = this.createElement('p', 'value', '23');
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
    const rainValue = this.createElement('p', 'value', '0.8');
    const rainUnit = this.createElement('p', 'unit', 'in');
    rainValueHolder.appendChild(rainValue);
    rainValueHolder.appendChild(rainUnit);
    rainCol.appendChild(rainTitle);
    rainCol.appendChild(rainValueHolder);

    const snowIcon = this.createElement('div', 'precipSnowIcon');
    const snowCol = this.createElement('div', 'containerCol');
    const snowTitle = this.createElement('h4', 'title', 'Snow');
    const snowValueHolder = this.createElement('div', 'valueHolder');
    const snowValue = this.createElement('p', 'value', '0.0');
    const snowUnit = this.createElement('p', 'unit', 'in');
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

    // --- containerWrap: Humidity/Dew & Wind ---
    const containerWrap3 = this.createElement('div', 'containerWrap');

    // Humidity & Dew
    const humidityContainer = this.createElement('div', 'container');
    const humidityIcon = this.createElement('div', 'humidityIcon');

    const humidityCol = this.createElement('div', 'containerCol');
    const humidityTitle = this.createElement('h4', 'title', 'Humidity');
    const humidityValueHolder = this.createElement('div', 'valueHolder');
    const humidityValue = this.createElement('p', 'value', '8');
    const humidityUnit = this.createElement('p', 'unit', '%');
    humidityValueHolder.appendChild(humidityValue);
    humidityValueHolder.appendChild(humidityUnit);
    humidityCol.appendChild(humidityTitle);
    humidityCol.appendChild(humidityValueHolder);

    const dewIcon = this.createElement('div', 'dewIcon');
    const dewCol = this.createElement('div', 'containerCol');
    const dewTitle = this.createElement('h4', 'title', 'Dew Point');
    const dewValueHolder = this.createElement('div', 'valueHolder');
    const dewValue = this.createElement('p', 'value', '45.5');
    const dewUnit = this.createElement('p', 'unit', '°F');
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
    const fromValue = this.createElement('p', 'value', 'W');
    fromCol.appendChild(fromTitle);
    fromCol.appendChild(fromValue);

    const windDirArrow = this.createElement('div', 'windDirArrow');

    const speedCol = this.createElement('div', 'containerCol');
    const speedTitle = this.createElement('h4', 'title', 'Speed');
    const speedValueHolder = this.createElement('div', 'valueHolder');
    const speedValue = this.createElement('p', 'value', '6.8');
    const speedUnit = this.createElement('p', 'unit', 'mph');
    speedValueHolder.appendChild(speedValue);
    speedValueHolder.appendChild(speedUnit);
    speedCol.appendChild(speedTitle);
    speedCol.appendChild(speedValueHolder);

    const gustCol = this.createElement('div', 'containerCol');
    const gustTitle = this.createElement('h4', 'title', 'Gust');
    const gustValueHolder = this.createElement('div', 'valueHolder');
    const gustValue = this.createElement('p', 'value', '12.7');
    const gustUnit = this.createElement('p', 'unit', 'mph');
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

    // --- containerWrap: Visibility, UV, Sunrise, Sunset, Moon ---
    const containerWrap4 = this.createElement('div', 'containerWrap');

    // Visibility & UV
    const visUVContainer = this.createElement('div', 'container');
    const visibilityIcon = this.createElement('div', 'visibilityIcon');

    const visibilityCol = this.createElement('div', 'containerCol');
    const visibilityTitle = this.createElement('h4', 'title', 'Visibility');
    const visibilityValueHolder = this.createElement('div', 'valueHolder');
    const visibilityValue = this.createElement('p', 'value', '9.9');
    const visibilityUnit = this.createElement('p', 'unit', 'mi');
    visibilityValueHolder.appendChild(visibilityValue);
    visibilityValueHolder.appendChild(visibilityUnit);
    visibilityCol.appendChild(visibilityTitle);
    visibilityCol.appendChild(visibilityValueHolder);

    const uvIcon = this.createElement('div', 'UVindexIcon');
    const uvCol = this.createElement('div', 'containerCol');
    const uvTitle = this.createElement('h4', 'title', 'UV Index');
    const uvValueHolder = this.createElement('div', 'valueHolder');
    const uvValue = this.createElement('p', 'value', '7');
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
    const sunriseValue = this.createElement('p', 'value', '7:21');
    sunriseCol.appendChild(sunriseTitle);
    sunriseCol.appendChild(sunriseValue);

    const sunsetIcon = this.createElement('div', 'sunsetIcon');
    const sunsetCol = this.createElement('div', 'containerCol');
    const sunsetTitle = this.createElement('h4', 'title', 'Sunset');
    const sunsetValue = this.createElement('p', 'value', '19:14');
    sunsetCol.appendChild(sunsetTitle);
    sunsetCol.appendChild(sunsetValue);

    sunContainer.appendChild(sunriseIcon);
    sunContainer.appendChild(sunriseCol);
    sunContainer.appendChild(sunsetIcon);
    sunContainer.appendChild(sunsetCol);

    // Moon
    const moonContainer = this.createElement('div', 'container');
    const moonIcon = this.createElement('div', 'currentMoonIcon');
    const moonCol = this.createElement('div', 'containerCol');
    const moonTitle = this.createElement('h4', 'title', 'Moon Phase');
    const moonValue = this.createElement('p', 'value', 'Waxing Gibbous');
    moonCol.appendChild(moonTitle);
    moonCol.appendChild(moonValue);

    moonContainer.appendChild(moonIcon);
    moonContainer.appendChild(moonCol);

    // Append all to containerWrap4
    containerWrap4.appendChild(visUVContainer);
    containerWrap4.appendChild(sunContainer);
    containerWrap4.appendChild(moonContainer);

    // --- Append all ---
    section.appendChild(currentHeader);
    section.appendChild(containerWrap1);
    section.appendChild(containerWrap2);
    content.appendChild(section);
