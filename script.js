//----- ELEMENTS
const boxEl = document.querySelectorAll('.box');
const ribbonEl = document.querySelectorAll('.horizontal-ribbon');
const sentences = [
    "One",
    "Two",
    "Three",
    "four",
    "five",
    "six",
    "seven",
    "height",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "heightteen",
    "nineteen",
    "twenty",
    "twentyone",
    "twerntytwo",
    "twenty3",
    "twenty4"
];

//----- GENERAL FUNCTIONS
//-- randomize + - 2 around given number
const randomizeAround = (x) => {
    let min = x - 2;
    let max = x + 2;
    return Math.floor(Math.random() * (max - min) + min);
}

//-- randomize between a min x and a max y
const randomizeMinMax = (x, y) => {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

//-- Generate modals
const modalBuilder = (x) => {
    let modalModel = `
        <div class="modal modal${x+1}">
            <div class="modal-content">
                <p>${sentences[x]}</p>
                <span class="close">&times;</span>
            </div>
        </div>
    `; // Create an html model with correct classes, and sentences defined in the "sentences" array
    document.querySelector('main').insertAdjacentHTML("beforeend",modalModel); // Insert it at the end of the main tag
}

//-- Create 24 modals
for (i = 0; i < 24; i++) {
    modalBuilder(i);
}


//----- RANDOMIZE NUMBERS
//-- Empty array that will hold used numbers
const usedNumbers = [];

//-- Function to fill usedNumbers with a chosen number of numbers in a random order
const giveRandomNumbers = (nbMax) => {
    let n = 0; // Set counter

    while (n < nbMax) { // Loop until array is filled

        let randomNumber = Math.floor(Math.random() * nbMax) + 1; // Create random number between 1 and a max number

        
        if (usedNumbers.indexOf(randomNumber) === -1){ // If the number is not already in
            usedNumbers.push(randomNumber); // Push it
        }
        n = usedNumbers.length; // Set n as array length, as not all loop will put a new number
}}

//-- Call function with the wanted number
giveRandomNumbers(24)


//----- PUT NUMBERS IN DIVS
//-- Insert a paragraphe with a random number in each .box div
usedNumbers.forEach((x) =>
    boxEl[x-1].insertAdjacentHTML("beforeend",`<p>${usedNumbers[x-1]}</p>`)
    // -1 needed to transform 1 to 24 into 0 to 23
    // Here, the divs are filled in the random order of the usedNumbers Array
    // but in the end, the div y will always end up with the number in the yth position in the array
);

//----- CREATE RANDOMLY PLACED BREAKS
//-- function to place a div with a class of break in a + - 2 random spot
const randomizeBreak = (x) => {
    const breakDiv = document.createElement('div'); // Create a div
    breakDiv.classList.add('break'); // Give it the 'break' class

    boxEl[randomizeAround(x)].insertAdjacentElement("beforebegin", breakDiv); // Place the div before a + - 2 random .box div
}

//-- Place breaks
for (i = 6; i < 19; i += 6){
    randomizeBreak(i); // Put 3 breaks, around the 6th, 12th and 18th div
}

//-----GIVE RANDOM COLORS
boxEl.forEach(box => {
    box.classList.add(`color${randomizeMinMax(1, 8)}`); // For each box, give it a class of color1 to color8
});

//-----GIVE RANDOM RIBBON PLACEMENT
ribbonEl.forEach(ribbon => {
    console.log(ribbon);
    ribbon.classList.add(`horizontal-ribbon__modifier${randomizeMinMax(1, 3)}`); // For ribbon, give it a random modifier class
});

//----- BUTTON ORDERS AND MODALS HANLER
//-- Give numbered class to boxes
usedNumbers.forEach((x) =>
    boxEl[x-1].classList.add(`day${usedNumbers[x-1]}`) // Same logic as the <p> insertion for the -1
);

//-- Set a counter
let lastClickedDay = 0;

//-- Preactivate day 1
let dayOne = document.querySelector('.day1');
dayOne.classList.remove('not-yet');
dayOne.classList.add('now');

//-- Activate buttons in order, and open the corresponding modal
boxEl.forEach(box => {

    const dayNumber = parseInt(box.className.match(/day(\d+)/)[1]); // Get the correct number from each box

    //-- On click, open the modal if it's the following box
    box.addEventListener('click', () => { // Add event listener to each box
        if (dayNumber === lastClickedDay + 1) { // If it's the right box, do ->

            const modalEl = document.querySelector(`.modal${dayNumber}`); // Get the corresponding modal
            modalEl.classList.add('modal-open'); // Add the modal-open class
            
            //-- Handle relevant classes
            box.classList.remove('now'); // Remove clickable class from the box we just clicked
            box.classList.add('opened'); // Add a styling class
            
            const nextDay = document.querySelector(`.day${dayNumber+1}`); // Get the next day box
            nextDay.classList.add('now'); // Add the clickable class
   
            lastClickedDay++; // +1 to counter
        } else {
            return; // If it's not the right box, do nothing
        }
    });
});

//-- Close modal
// get all modals
const modals = document.querySelectorAll('.modal');

//-- For each modal, remove modal-open class on click
modals.forEach(modal => 
    modal.addEventListener('click', () => { // only opened modal are clickable as others as not displayed
    modal.classList.remove('modal-open');
    console.log('im in');
    })
);

