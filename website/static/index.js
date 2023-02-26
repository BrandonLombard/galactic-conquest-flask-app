// Deletes the note
function deleteNote(noteId) {
    fetch('/delete-note', {
        method: 'POST',
        body: JSON.stringify({ noteId: noteId })
    }).then((_res) => {
        window.location.href = "/";
    });
}

function displayCharacter() {
    var selected = document.getElementById("character-options").value;
    var displayCharacter = document.getElementById('display-character-image');
    if (selected == "none") {
        displayCharacter.innerHTML = `<img src="./static/images/game-assets/.png" class="display-signup-character" />`;
        return;
    } else {
        displayText = `<div style="display: flex; margin-top: 10px;"><img src="./static/images/game-assets/${selected}.png" class="display-signup-character" />`;
        displayText += `<p class="display-signup-character" style="margin-left: 5px;">${startingCharacterData[selected][0]}<br>`;
        displayText += `Origin: ${startingCharacterData[selected][1]}<br>`;
        displayText += `Ability: ${startingCharacterData[selected][2]}`;
        displayText += `<img src='../static/images/game-assets/${startingCharacterData[selected][1]}.png' class='icon'>`;
        displayText += `<img src='../static/images/game-assets/character${startingCharacterData[selected][3]}-ship.png' class='icon rotate-left'>`;
        displayText += `</p></div>`;
        displayCharacter.innerHTML = displayText;
    }
}

function loadProfile() {
    var profileImage = document.getElementById("character-image");
    var displayText = `<img src="/images/game-assets/{{user.character}}.png">`;
    profileImage.innerHTML = displayText;
    
}

function getRank(expPoints) {
    return;
}

function getCharacterData() {
    // Get the username data from the html file
    var username = document.getElementById("username").textContent;
    username = username.replaceAll(" ", "")
    username = username.replaceAll("\n", "")

    // Obtain character's display name
    var newData = startingCharacterData[username][0];

    // Update their character's display username on the page
    var newUsername = document.getElementById("username");
    newUsername.innerHTML = newData; 

    // Find their origin, or what planet the character is from
    var originData = startingCharacterData[username][1];

    // Update the planet image on the screen based on the character's origin
    var userImage = document.getElementById("userimage");
    userImage.style.backgroundImage = `url(./static/images/game-assets/${originData}.png)`;
    
}

function toggleMap(className) {
    var map = document.querySelector(".map");
    var shop = document.querySelector(".shop");
    var game = document.querySelector(".game");
    if (className == "map") {
        map.style.visibility = "visible"
        shop.style.visibility = "hidden"
        game.style.visibility = "hidden"
    } else if (className == "game") {
        map.style.visibility = "hidden"
        shop.style.visibility = "hidden"
        game.style.visibility = "visible"
    } else {
        map.style.visibility = "hidden"
        shop.style.visibility = "visible"
        game.style.visibility = "hidden"
    }
}

// Function that opens the game screen when the player clicks on a planet
function openGame(num, character) {
    // Param 'num' refers to the planet number they have clicked.
    toggleMap("game");
    // This function actually loads the game
    // Refer to game.js
    loadGame(num, character);
}

// Character information that is displayed while signing up. 
// See function displayCharacter() above
const startingCharacterData = {
    'character1': ['Atlas Infinity', 'Earth', 'Armor', 1],
    'character2': ['Drexar Vortex', 'Novara', 'Speed', 2],
    'character3': ['Hanzo Shadowstrike', 'Avalon', 'Strength', 3],
    'galaxion': ['Galaxion', 'Tartarus', 'Pure Evil', 4]
};


displayCharacter();
