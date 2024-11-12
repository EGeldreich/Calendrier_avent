//----- ELEMENTS
const boxEl = document.querySelectorAll('.box');

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

// randomize + - 2 around given number
const randomizeAround = (x) => {
    let min = x - 2;
    let max = x + 2;
    return Math.floor(Math.random() * (max - min) + min);
}

// randomize between a min x and a max y
const randomizeMinMax = (x, y) => {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

// Generate modals
const modalBuilder = (x) => {
    // Create an html model with correct classes, and sentences defined in the "sentences" array
    let modalModel = `
        <div class="modal modal${x+1}">
            <div class="modal-content">
                <p>${sentences[x]}</p>
                <span class="close">&times;</span>
            </div>
        </div>
    `;
    // Insert at the end of the main tag
    document.querySelector('main').insertAdjacentHTML("beforeend",modalModel);
}

// Create 24 modals
for (i = 0; i < 24; i++) {
    modalBuilder(i);
}


//----- RANDOMIZE NUMBERS
// Empty array that will hold used numbers
const usedNumbers = [];

// Function to fill usedNumbers with a chosen number of numbers in a random order
const giveRandomNumbers = (nbMax) => {
    let n = 0;

    // Loop until array is filled
    while (n < nbMax) {

        // Create random number between 1 and a max number
        // let randomNumber = Math.floor(Math.random() * nbMax);
        let randomNumber = Math.floor(Math.random() * nbMax) + 1;

        // If the number is not already in, push it
        if (usedNumbers.indexOf(randomNumber) === -1){
            usedNumbers.push(randomNumber);
        }
        // Set n as array length, as not all loop will put a new number
        n = usedNumbers.length;
}}

// Call function with the wanted number
giveRandomNumbers(24)


//----- PUT NUMBERS IN DIVS
// Insert a paragraphe with a random number in each .box div
// -1 needed to transform 1 to 24 into 0 to 23
// Here, the divs are filled in the random order of the usedNumbers Array
// but in the end, the div y will always end up with the number in the yth position in the array
usedNumbers.forEach((x) =>
    boxEl[x-1].insertAdjacentHTML("beforeend",`<p>${usedNumbers[x-1]}</p>`)
);

//----- CREATE RANDOMLY PLACED BREAKS
// function to place a div with a class of break in a + - 2 random spot
const randomizeBreak = (x) => {
    // create div with break class
    const breakDiv = document.createElement('div');
    breakDiv.classList.add('break');

    // place the div before a + - 2 random .box div
    boxEl[randomizeAround(x)].insertAdjacentElement("beforebegin", breakDiv);
}

// Place 3 breaks before (+ - 2) 6 12 and 18 .box div
for (i = 6; i < 19; i += 6){
    randomizeBreak(i);
}


//-----GIVE RANDOM COLORS
boxEl.forEach(box => {
    box.classList.add(`color${randomizeMinMax(1, 4)}`);
});


//----- MODAL POPUPS
//Give numbered class to boxes
usedNumbers.forEach((x) =>
    boxEl[x-1].classList.add(`day${usedNumbers[x-1]}`)
);


boxEl.forEach(box => {
    box.addEventListener('click', () => {
    
        // Get the correct number from each box
        let dayNumber = Array.from(box.classList).find(cls => cls.startsWith('day')).replace('day', '');

        // get the modal corresponding to the clicked box
        let modal = document.querySelector(`.modal${dayNumber}`);
        
        // Toggle the modal-open class for the right modal
        modal.classList.toggle('modal-open');
    });
});

