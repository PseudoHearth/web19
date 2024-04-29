const animalImages = [
    "ant1.jpg",
    "ant2.jpg",
    "ant3.jpg",
    "ant4.jpg",
    "fly1.jpg",
    "fly2.jpg",
    "fly3.jpg",
    "fly4.jpg",
    "fly5.jpg",
    "spider1.jpg",
    "spider2.jpg",
    "spider3.jpg",
    "spider4.jpg",
    "spider5.jpg",
    "cat1.jpg",
    "cat2.jpg",
    "cat3.jpg",
    "cat4.jpg",
    "cat5.jpg",
    "dog1.jpg",
    "dog2.jpg",
    "dog3.jpg",
    "dog4.jpg",
    "dog5.jpg",
    "rabbit1.jpg",
    "rabbit3.jpg",
    "rabbit4.jpg",
    "rabbit5.jpg",
    "aqfish1.jpg",
    "aqfish2.jpg",
    "aqfish3.jpg",
    "aqfish5.jpg",
    "wildfish1.jpg",
    "wildfish2.jpg",
    "wildfish3.jpg",
    "wildfish4.jpg",
    "wildfish5.jpg",
    "starfish1.jpg",
    "starfish2.jpg",
    "starfish3.jpg",
    "starfish5.jpg",
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}


const totalBlocks = 16;


const randomIndexes = Array.from({ length: animalImages.length }, (_, i) => i);
for (let i = randomIndexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomIndexes[i], randomIndexes[j]] = [randomIndexes[j], randomIndexes[i]];
}
const remainingImages = [...animalImages]; 


function createGameBoard() {
    const gameBoard = $("#game-board");
    shuffleArray(animalImages); 
    for (let i = 0; i < totalBlocks; i++) {
        const block = $("<div></div>").addClass("block");
        const randomImageSrc = animalImages[i]; 
        const image = $("<img>").attr("src", randomImageSrc);
        block.append(image);
        gameBoard.append(block);
    }
}


function displayAnimal() {
    const randomBlockIndex = getRandomIndex(totalBlocks);
    const randomImageSrc = $('#game-board .block').eq(randomBlockIndex).find('img').attr('src'); 
    const animalDisplay = $("#animal-display");
    animalDisplay.empty();
    const animalImg = $("<img>").attr("src", randomImageSrc).draggable();
    animalDisplay.append(animalImg);
}

function blockClickHandler() {
    const clickedImageSrc = $(this).find('img').attr('src'); 

    
    if (clickedImageSrc === $('#animal-display img').attr('src')) {
        $(this).fadeOut(400, function() { $(this).remove(); }); 

        
        const remainingImagesCount = $('#game-board .block').length;
        if (remainingImagesCount > 0) {
            const randomBlockIndex = getRandomIndex(remainingImagesCount);
            const newImageSrc = $('#game-board .block').eq(randomBlockIndex).find('img').attr('src');
            $('#animal-display img').attr('src', newImageSrc);
        } else {
         
            alert('Гра завершена!');
        }
    }
}



function updateMainBlockManually() {
    updateMainBlockImage();

}
function updateMainBlockAutomatically() {
    const remainingImagesCount = $('#game-board .block').length;
    if (remainingImagesCount > 0) {
        const randomBlockIndex = getRandomIndex(remainingImagesCount);
        const newImageSrc = $('#game-board .block').eq(randomBlockIndex).find('img').attr('src');
        $('#animal-display img').attr('src', newImageSrc);
    } else {
        
        alert('Гра завершена!');
    }
}
function updateMainBlockImage() {
    const remainingImagesCount = $('#game-board .block').length;
    if (remainingImagesCount > 0) {
        let newImageSrc = null;
        let attempts = 0;
        while (newImageSrc === null && attempts < 100) { 
            const randomBlockIndex = getRandomIndex(remainingImagesCount);
            newImageSrc = $('#game-board .block').eq(randomBlockIndex).find('img').attr('src');
            if (newImageSrc === $('#animal-display img').attr('src')) {
                
                newImageSrc = null;
            }
            attempts++;
        }
        if (newImageSrc !== null) {
            $('#animal-display img').attr('src', newImageSrc);
        } else {
            alert('Гра завершена!'); 
        }
    } else {
        alert('Гра завершена!');
    }
}


$(document).ready(function() {
   
    animalImages.sort(() => Math.random() - 0.5);
    createGameBoard();
    displayAnimal();
    
    $('#game-board').on('click', '.block', blockClickHandler);
    $('#animal-display').on('click', 'img', updateMainBlockImage);
});