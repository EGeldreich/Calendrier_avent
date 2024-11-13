//----- ELEMENTS
const boxEl = document.querySelectorAll('.box');
const ribbonEl = document.querySelectorAll('.horizontal-ribbon');
const resetEl = document.querySelector('.reset');
const sentences = [
    "Aujourd'hui, enfile ton pull de Noël préféré !",
    "Pense à ton repas de fête idéal.",
    "Fais une décoration maison pour le sapin.",
    "Choisis un film de Noël à regarder.",
    "Offre un chocolat à quelqu'un que tu aimes.",
    "Écoute une chanson de Noël en boucle !",
    "Prépare une boisson chaude et réconfortante.",
    "Allume une bougie parfumée.",
    "Ce soir, compte les étoiles comme des cadeaux.",
    "Fais un vœu sous le gui.",
    "Décore un biscuit de Noël.",
    "Écris une petite lettre de Noël.",
    "Mets-toi au chaud avec un plaid doux.",
    "Prépare une surprise pour quelqu'un.",
    "Prends le temps d'admirer les lumières.",
    "Cuisines une recette de famille.",
    "Raconte un souvenir de Noël.",
    "Chante une chanson de Noël à voix haute.",
    "Rêve à ta liste de cadeaux idéale.",
    "Prépare-toi à un réveillon mémorable !",
    "Savoure une clémentine en pensant à l'hiver.",
    "Relis une carte de vœux reçue.",
    "Glisse un mot doux dans un cadeau.",
    "Passe un merveilleux et joyeux Noël !"
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

//-- Randomize colors
boxEl.forEach(box => {
    box.classList.add(`color${randomizeMinMax(1, 8)}`); // For each box, give it a class of color1 to color8
});

//-- Randomize ribbon placement
ribbonEl.forEach(ribbon => {
    ribbon.classList.add(`horizontal-ribbon__modifier${randomizeMinMax(1, 3)}`); // For ribbon, give it a random modifier class
});

//-- Reset Button
resetEl.addEventListener('click', () => {
    let storedDays = []; // Set storedDays as empty
    localStorage.setItem('storedDays', JSON.stringify(storedDays));
    location.reload();
})

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

//----- GIVE NUMBERED CLASSES TO BOXES - usefull later
usedNumbers.forEach((x) =>
    boxEl[x-1].classList.add(`day${usedNumbers[x-1]}`) // Same logic as the <p> insertion for the -1
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



//----- LOCAL STORAGE HANDLER
let lastClickedDay = 0;
//-- Function to handle Local Storage
const localStorageHandler = () => {
    let storedDays = JSON.parse(localStorage.getItem('storedDays')) || []; // Get already stored days OR create empty array

    //-- Handle classes
    storedDays.forEach(day => { // For each value stored, do
        const dayEl = document.querySelector(`.day${day}`); // Get corresponding box
        dayEl.classList.add('opened'); // Add the styling opened class
    });
    if (storedDays.length > 0) { // IF the array is not empty
        lastClickedDay = Math.max(...storedDays); // Set LastclickedDay to the highest number
        const nextDayEl = document.querySelector(`.day${lastClickedDay + 1}`); // Get the next day
        nextDayEl.classList.add('now'); // Give it the right class
        nextDayEl.classList.remove('not-yet'); // Remove not-yet class
    } else { // IF the array is empty
        let dayOne = document.querySelector('.day1'); // Handle day 1
        dayOne.classList.remove('not-yet');
        dayOne.classList.add('now');
    }
};
window.addEventListener('DOMContentLoaded', localStorageHandler);


//----- BUTTON ORDERS AND MODALS HANDLER
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

            //-- Handle Local Storage
            let storedDays = JSON.parse(localStorage.getItem('storedDays')) || []; // Get already stored days OR create empty array
            storedDays.push(dayNumber); // Push the clicked day number
            localStorage.setItem('storedDays', JSON.stringify(storedDays)); // Set local storage with new value
            console.log(storedDays);
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
    })
);

