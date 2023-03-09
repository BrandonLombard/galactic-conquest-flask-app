// Allows the user to purchase items when they click the 'purchase' button
function completePurchase(noteId) {
    fetch('/complete-purchase', {
        method: 'POST',
        body: JSON.stringify({ noteId: noteId })
    }).then((_res) => {
        window.location.href = "/";
    });
}

function updateGameStats() {
    var gemsEarned = parseInt($('#gems-earned').text());
    var xpEarned = parseInt($('#xp-earned').text());
    var planetsDefeated = parseInt($('#planets-defeated').text());

    fetch('/update-game', {
        method: 'POST',
        body: JSON.stringify({ gemsEarned: gemsEarned })
    }).then((_res) => {
        window.location.href = "/";
    });
}


//  Displays the selected character on the sign up page
function displayCharacter() {
    var selected = document.getElementById("character-options").value;
    var displayCharacter = document.getElementById('display-character-image');
    // If no player options are selected
    if (selected == "none") {
        displayCharacter.innerHTML = `<img src="./static/images/game-assets/.png" class="display-signup-character" />`;
        return;
    } else {
        displayText = `<div style="display: flex; margin-top: 10px;"><img src="./static/images/game-assets/${selected}.png" class="display-signup-character" />`;
        displayText += `<p class="display-signup-character" style="margin-left: 5px;">${startingCharacterData[selected][0]}<br>`;
        displayText += `Origin: ${startingCharacterData[selected][1]}<br>`;
        displayText += `Ability: ${startingCharacterData[selected][2]}`;
        displayText += `<img src='../static/images/game-assets/${startingCharacterData[selected][1]}.png' class='icon'>`;
        displayText += `<img src='../static/images/game-assets/character${startingCharacterData[selected][3]}-ship.png' class='icon' style='width: 75px;'>`;
        displayText += `</p></div>`;
        displayCharacter.innerHTML = displayText;
    }
}

// Loads the game character's profile
function loadProfile() {
    var profileImage = document.getElementById("character-image");
    var displayText = `<img src="/images/game-assets/{{user.character}}.png">`;
    profileImage.innerHTML = displayText;
    
}

// Generates the range based on the amount of experience points the player has
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

// Toggle between game screens, such as Map, Shop, and Help
function toggleMap(className) {

    var map = document.querySelector(".map");
    var shop = document.querySelector(".shop");
    var game = document.querySelector(".game");
    var help = document.querySelector(".help");

    const menuElements = {
        "map": map, 
        "shop": shop,
        "game": game,
        "help": help
    };
    // Loop through the menu options and change them to either visible or hidden
    for (const element in menuElements) {
        elementString = element.toString();
        // If the element iteration variable is the same as the selected one
        // Then make it visible in the right column
        if (elementString == className) {
            menuElements[element].style.visibility = "visible";
        } 
        //  Otherwise, make that element hidden
        else {
            menuElements[element].style.visibility = "hidden";
        };

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

displayCharacter();
