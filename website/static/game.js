// This moves the level's background
function moveBG (canvas, planetNum) {
    var planetBg = document.createElement("img");
    planetBg.src = `../static/images/game-assets/planet${planetNum}-bg.png`;
    planetBg.classList.add("planet-bg", "first-bg");
    canvas.append(planetBg);
    
    var planetBg2 = document.createElement("img");
    planetBg2.src = `../static/images/game-assets/planet${planetNum}-bg.png`;
    planetBg2.classList.add("planet-bg", "second-bg");
    canvas.append(planetBg2);
}

function loadGame(planetNum, character) {
    // Adds the player into the game
    var canvas = document.querySelector('.canvas');
    player = addPlayer(character, canvas);
    // Starts the moving background in the game
    moveBG(canvas, planetNum);
    // Add the level start menu data
    startMenuData(planetNum);
}

function addPlayer(character, canvas) {
    var playerShip = document.querySelector("#character-ship");
    var speed = 10;
    var playerY = playerShip.offsetTop;
    var playerX = playerShip.offsetLeft;

    // Make the ship move depending on mouse pointer movement
    function getCenter(element) {
        const {left, top, width, height} = element.getBoundingClientRect();
        return {x: left + width / 2, y: top + height / 2}
    }
    
    // Determine when the user presses a key
    document.addEventListener('keydown', (event) => {
        var name = event.key;
        var code = event.code;
        // Make input characters lowercase to make sure it still works if caps lock is on
        name = name.toLowerCase();
        // Creates the laser for the player's blasters
        var laserImage = document.createElement("img");
        laserImage.src = "../static/images/game-assets/laser1.png";
        laserImage.style.width = "15px";
        laserImage.style.height = "25px";
        laserImage.style.position = "absolute";
        laserImage.style.top = playerY + "px";
        var updatedPlayerX = playerX + 27;
        laserImage.style.left = updatedPlayerX + "px";
        laserImage.className = "no-select";

        // This moves the laser on a timer
        function moveLaser () {
            var laserPosY = laserImage.offsetTop - 3;
            var laserPosX = laserImage.offsetTop - 3;
            
            // Is laser is within a specified set of x and y coordinates
            // Y axis
            if (laserPosY > -100 && laserPosY < 600) {
                laserImage.style.top = laserPosY + "px";
            } 
            // X Axis
            else if (laserPosX > -100 && laserPosX < 600) {
                laserImage.style.left = laserPosX + "px";
            }
        }

        if (name == ' ' || name == 'f' || name == 'w' || name == 'arrowup') {
            canvas.append(laserImage);
            laserImage.style.transform = playerShip.style.transform;
            clearInterval(shootLaser);
            var shootLaser = setInterval(moveLaser, 10);
        };

        if (name == 'a' || name == "arrowleft") {
            // If the player's x coordinate is less than 0, reverse the speed
            if (playerX < 0) {
                playerX = playerX + speed;
                playerShip.style.left = playerX + "px";
            } 
            // Decrement the player's x coordinate by the speed
            playerX = playerX - speed;
            playerShip.style.left = playerX + "px";
        };
        // If the player's x coordinate is greater than 380, reverse the speed
        if (name == 'd' || name == "arrowright") {
            if (playerX > 380) {
                playerX = playerX - speed;
                playerShip.style.left = playerX + "px";
            } 
            // Increment the player's x coordinate by the speed
            playerX = playerX + speed;
            playerShip.style.left = playerX + "px";
        };
    }, false);


}

// Level data that gets displayed on the start menu
function startMenuData(planetNum) {
    var title = document.getElementById('level-title');
    var subtitle = document.getElementById('level-subtitle');
    var character = document.getElementById('level-character');
    var description = document.getElementById('level-description');

    title.textContent = `Battle of ${levelData[planetNum][0]}`;
    subtitle.textContent = `Level ${planetNum}`;
    character.innerHTML = `<img src='../static/images/game-assets/bot${planetNum}.png'>`;
    description.innerHTML = `Lead a full assault on ${levelData[planetNum][0]} and defeat Commander ${levelData[planetNum][1]} and their fleet of Cosmic Empire ships. `;
}

function enemyShip() {

}

function enemyBomber() {

}

function enemyBoss() {

}

function enemyTurret() {

}

function enemyObstacle() {

}

// Adds enemies in the game
function addEnemy(enemyList, levelNum) {
    // Get a random index value from the enemyList
    var enemyListLength = enemyList.length;
    var randomNum = Math.floor(Math.random() * enemyListLength);

    // If that index value is zero, remove it from the list
    if (enemyList[randomNum] <= 0) {
        enemyList.splice(randomNum, 1);
    } else if (enemyListLength <= 0) {
        buildLevel(levelNum, true);
    } else {
        enemyList[randomNum] = enemyList[randomNum] - 1;
    }

    console.log(enemyList);
}

// Builds the playable level with its assets
function buildLevel(won=false) {
    //  Display the initital menu screen
    var levelMenu = document.querySelector('.level-menu');
    levelMenu.style.visibility = 'hidden';

    var subtitle = document.getElementById('level-subtitle').textContent;
    var planetNum = subtitle.replace("Level ", "");
    console.log(subtitle);

    // Create a new list with the levelData
    var numShips = levelData[levelNum][2];
    var numBombers = levelData[levelNum][3];
    var numObstacles = levelData[levelNum][4];
    var numTurrets = levelData[levelNum][5];
    var numBosses = levelData[levelNum][6];
    var enemyList = [numShips, numBombers, numObstacles, numTurrets, numBosses]
    
    // Call the addEnemy() function on a timer a set amount of times
    if (won == false) {
        const playingGame = setInterval(addEnemy, 1000, enemyList, levelNum);
    }
    // If they won the game, then stop the interval and display win screen
    if (won == true) {
        clearInterval(playingGame);
    }
    
}

// Displays the planet names over the planet image on the map
function displayText(planet, planetNum) {
    // `planet` is the planet image element
    // `planetNum` is the level they're playing

    // Obtain
    var planetName = document.getElementById('planet-name');
    planetName.style.visibility = "visible";
    planetName.textContent = `${levelData[planetNum][0]}`;

    // Find the currently selected planet's position
    var topPos = planet.offsetTop + 75;
    var leftPos = planet.offsetLeft;

    // Positions the planet name over the planet based on its coordinates
    planetName.style.top = topPos + "px";
    planetName.style.left = leftPos + "px";
}

// Clears the planet names from the planet images when the user 
// doesn't hover over it anymore
function clearText(x) {
    var planetName = document.getElementById('planet-name');
    planetName.style.visibility = "hidden";
}