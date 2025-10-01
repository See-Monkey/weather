class Display {
    constructor() {}

    createElement(tag, className, textContent) {
        const el = document.createElement(tag);
        el.className = className;
        if (textContent !== undefined) el.textContent = textContent;
        return el;
    }
    
    redrawUpcoming() {
        const content = document.querySelector(".content");
        const sectionUpcoming = this.createElement('section', 'upcoming');
        


        
        content.appendChild(sectionUpcoming);
    }
}

//could you complete the redrawUpcoming() function from the above javascript to create and append DOM elements structured like the HTML below. Use the helper function createElement() to preserve the elements' classes and textContent values. Do not use an if statements or loops.

<section class="upcoming">
    <h3 class="upcomingHeader">Next Week</h3>
    <div class="forecastContainer">
        <div class="forecastCard">
            <div class="containerCol">
                <h3 class="title">Wed</h3>
                <p class="title">10/1</p>
            </div>
            <div class="containerCol">
                <div class="upcomingIcon">
                </div>
                <p class="value">30%</p>
            </div>
            <div class="containerCol">
                <div class="valueHolder">
                    <h3 class="title">75</h3>
                    <h3 class="value">&deg;F</h3>
                </div>
                <div class="valueHolder">
                    <p class="title">54</p>
                    <p class="value">&deg;F</p>
                </div>
            </div>
        </div>
    </div>
</section>