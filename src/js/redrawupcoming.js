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