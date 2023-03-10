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
        var updatedPlayerX = playerX + 30;
        laserImage.style.left = updatedPlayerX + "px";
        laserImage.className = "no-select";



        // This moves the laser on a timer
        function moveLaser(laserImage) {
            var laserPosY = laserImage.offsetTop - 3;
            var laserPosX = laserImage.offsetLeft - 3;
            // If the laser reaches a certain point,
            // Stop the timer, remove the image, and remove it from the array
            if (laserPosY < 0) {
                clearInterval(shootLaser);
                laserImage.remove();
                levelLasers.shift();
            };
            // Is laser is within a specified set of x and y coordinates
            // Y axis
            if (laserPosY > -100 && laserPosY < 600) {
                laserImage.style.top = laserPosY + "px";
            }
            // X Axis
            else if (laserPosX > -100 && laserPosX < 600) {
                laserImage.style.left = laserPosX + "px";
            };
        }

        function delayLasers() {
            if (canShoot == true) {
                canShoot = false;
            } else {
                canShoot = true;
            }
            
            
        }

        if (name == ' ' || name == 'f' || name == 'w' || name == 'arrowup') {
            var delayNum = 1000 - (parseInt($('#user-speed').text()) * 10);
            if (canShoot) {
                canvas.append(laserImage);
                laserImage.style.transform = playerShip.style.transform;
                clearInterval(shootLaser);
                laserImage.setAttribute("id", `laser${laserNum}`);
                levelLasers.push(laserImage);
                var shootLaser = setInterval(moveLaser, 10, laserImage);
                laserNum++;
                canShoot = false;
                setTimeout(delayLasers, delayNum);
            } 

            
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
    description.innerHTML = `Lead a full assault on ${levelData[planetNum][0]} and defeat the evil Commander ${levelData[planetNum][1]} and their fleet of Cosmic Empire ships. `;
}

// Sets the enemy's x and y position and puts them on the screen
function buildEnemy(enemyType, size=75) {
    // Add the enemy image
    var enemyImage = document.createElement('img');
    enemyImage.src = `../static/images/game-assets/${enemyType}.png`;

    // Set the size and position
    enemyImage.style.height = size + "px";
    enemyImage.style.position = 'absolute';
    var randomLeft = Math.random() * 400;
    enemyImage.style.left = randomLeft + "px";

    // Add the new enemy to the screen
    var canvas = document.querySelector('.canvas');
    canvas.appendChild(enemyImage);

    // Use a CSS keyframe that makes the enemy move downward
    enemyImage.className = 'animate-down';

    // Detect if the enemy and character collide
    var characterImage = document.getElementById('character-ship');
    var menuBackground = document.getElementById('menu-background');
    var laser = document.querySelector('.no-select');

    checkCharacterCollision = setInterval(checkCollision, 100, enemyImage, characterImage);
    checkBackgroundCollision = setInterval(checkCollision, 100, enemyImage, menuBackground);
    checkLaserCollision = setInterval(checkAllLasers, 10, enemyImage, levelLasers);
    
}

function enemyShip(levelNum) {
    buildEnemy(`planet${levelNum}-ship`);
}

function enemyBomber(levelNum) {
    buildEnemy('bomber');
}

function enemyBoss(levelNum) {
    buildEnemy(`boss-ship`, 100);
}

function enemyTurret(levelNum) {
    buildEnemy(`turret`);
}

function enemyObstacle(levelNum) {
    randomObstacle = Math.round(Math.random()*6);
    buildEnemy(`obstacle${randomObstacle}`);
}

function addGem(levelNum) {
    buildEnemy('gems', 45);
}

// Adds enemies in the game
function addEnemy(enemyObj, levelNum) {
    // Get a random value from the enemyObj
    var enemyObjKeys = Object.keys(enemyObj);
    var enemyObjLength = enemyObjKeys.length;
    var randomNum = Math.floor(Math.random() * enemyObjLength);
    var randomEnemyKey = enemyObjKeys[randomNum];
    var randomEnemyValue = enemyObj[randomEnemyKey];

    // If that value is zero, remove it from the object
    // Else if the enemy object is less than 0 then stop adding enemies
    // Else decrement the enemy from the enemy object and add that random enemy
    if (randomEnemyValue <= 0) {
        delete enemyObj[randomEnemyKey]
    } else if (enemyObjLength <= 0) {
        stopAddingEnemies(levelNum);
    } else {
        if (randomEnemyKey == 'ships') {
            enemyShip(levelNum);
        } else if (randomEnemyKey == 'bombers') {
            enemyBomber(levelNum);
        } else if (randomEnemyKey == 'obstacles') {
            enemyObstacle(levelNum);
        } else if (randomEnemyKey == 'turrets') {
            enemyTurret(levelNum);
        } else if (randomEnemyKey == 'gems') {
            addGem(levelNum);
        } else {
            enemyBoss(levelNum);
        };
        enemyObj[randomEnemyKey] = enemyObj[randomEnemyKey] - 1;
    }

    console.log(enemyObj);
}

// Builds the playable level with its assets
function buildLevel() {
    //  Display the initital menu screen
    var levelMenu = document.querySelector('.level-menu');
    levelMenu.style.visibility = 'hidden';

    // Get the player's health stats and update their health in game accordingly
    var playerHealthStats = parseInt($('#user-armor').text());
    var healthBar = document.getElementById('healthbar');
    var newHealth = parseInt(healthBar.value) + playerHealthStats;
    healthBar.setAttribute("value", newHealth);
    healthBar.setAttribute("max", newHealth);

    var subtitle = document.getElementById('level-subtitle').textContent;
    var planetNum = subtitle.replace("Level ", "");
    let levelNum = parseInt(planetNum);

    console.log("Level #" + levelNum);

    // Create a new list with the levelData
    var numShips = levelData[levelNum][2];
    var numBombers = levelData[levelNum][3];
    var numObstacles = levelData[levelNum][4];
    var numTurrets = levelData[levelNum][5];
    var numBosses = levelData[levelNum][6];
    var numGems = levelData[levelNum][7];

    enemyObj = {
        'ships': numShips, 
        'bombers': numBombers, 
        'obstacles': numObstacles, 
        'turrets': numTurrets, 
        'bosses': numBosses,
        'gems': numGems
    }
    
    // Makes the enemies show up faster by 0.1 seconds every level
    var speed = 2 - (0.1 * levelNum);
    // Call the addEnemy() function on a timer a set amount of times
    playingGame = setInterval(addEnemy, speed * 1000, enemyObj, levelNum);
    trackEnemiesTimer = setInterval(trackEnemies, 10, levelNum);
}

// Function that  determines how many enemies are still in the level
function trackEnemies(levelNum) {
    var numEnemies = $('.animate-down').length;
    if (Object.keys(enemyObj).length <= 0 && numEnemies <= 0) {
        var gems = parseInt($("#player-gems").text());
        var xp = parseInt($("#player-exp-points").text());
        $('#gems-earned').val(gems);
        $('#xp-earned').val(xp);
        $('#menu-end').css("visibility", "visible");
        $('#end-title').text("Great job, Agent!");
        $('#end-planet-name').text(`You've defeated Galaxion's fleet on ${levelData[levelNum][0]}, you've earned:`);
    };
}

// Stops adding enemies to the screen
function stopAddingEnemies(levelNum) {
    clearInterval(playingGame);
}

// Displays the planet names over the planet image on the map
function displayText(planet, planetNum, locked=false) {
    // `planet` is the planet image element
    // `planetNum` is the level they're playing

    // Obtain
    var planetName = document.getElementById('planet-name');
    planetName.style.visibility = "visible";
    if (locked == true) {
        planetName.innerHTML = `${levelData[planetNum][0]}`;
    } else {
        planetName.innerHTML = `${levelData[planetNum][0]}`;

    }
    
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

// Checks all of the lasers on the screen and then determines if that collides with the enemy
function checkAllLasers(enemyImage, laserImage) {
    for (var i = 0; i < laserImage.length; i++) {
        var colliding = checkCollision(enemyImage, laserImage[i])
    }
}

// Detect when a player and enemy character collide
function checkCollision(enemyImage, characterImage) {
    const rect1 = enemyImage.getBoundingClientRect();
    const rect2 = characterImage.getBoundingClientRect();
    
    // Check if the two elements intersect
    var collides = !(
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.left > rect2.right
    );
    if (collides) {
        var playerHealth = document.getElementById('healthbar');
        var playerGems = document.querySelector('#player-gems > div');
        var playerXP = document.querySelector('#player-exp-points > div');
        var enemyImageSrc = enemyImage.src;
        var characterImageSrc = characterImage.src;
        
        // If the player's helath is less than or equal to zero, then stop playing
        if (playerHealth.value <= 0) {
            var gameOver = document.getElementById('game-lose');
            gameOver.style.visibility = "visible";
            clearInterval(playingGame);
        } 


        if (characterImage.id == "menu-background" && !(enemyImageSrc.includes('gem') || enemyImageSrc.includes('obstacle'))) {
            enemyImage.remove();
            playerHealth.value -= 15;
            return;
        } else if (characterImage.id == "menu-background" && (enemyImageSrc.includes('gem') || enemyImageSrc.includes('obstacle'))) {
            enemyImage.remove();
            return;
        };
        
        // Determine if the player hits an enemy with a laser
        if (characterImageSrc.includes('laser')) {
            characterImage.remove();
            // If they shoot the gems, they break but no XP is awarded
            if (!enemyImageSrc.includes('gem')) {
                // Award XP for shooting enemies
                var newPlayerXP = parseInt(playerXP.textContent) + 1;
                playerXP.textContent = newPlayerXP;
            }
            // Remove enemy and return from the function
            enemyImage.remove();
            return;
        }

        // Determine which game element touches the player directly
        // And increment the player's stats accordingly
        if (enemyImageSrc.includes('gem')) {
            var numGems = parseInt(playerGems.textContent);
            numGems += 50;
            playerGems.textContent = numGems;
        } else if (enemyImageSrc.includes('planet')) {
            playerHealth.value -= 10;
        } else if (enemyImageSrc.includes('boss')) {
            playerHealth.value -= 25;
        } else if (enemyImageSrc.includes('obstacle')) {
            playerHealth.value -= 15;
        };
        enemyImage.remove();
        
    }
  }

// This updates the shop when the user interacts with it (i.e. clicks a '+' button)
function updateShop(itemId, command, price, gems) {
    var itemNumber = document.getElementById(itemId);
    var totalPrice = document.getElementById("total-price");
    
    // Get data for the update numbers
    var strengthNumber = parseInt(document.getElementById('strength-number').value);
    var speedNumber = parseInt(document.getElementById('speed-number').value);
    var armorNumber = parseInt(document.getElementById('armor-number').value);

    // Calculate the total cost of the player's selections
    var totalPriceCurrent = parseInt(totalPrice.value);


    var currentGems = parseInt(totalPrice.value);
    

    // Makes it so the player can't go negative on their selections and
    // they won't go over their budget
    if (command == 'sub') {
        if (parseInt(itemNumber.value) > 0) {
            itemNumber.value = parseInt(itemNumber.value) - 1;
            totalPrice.value = parseInt(totalPrice.value) - price;
        }
        
    } else if (command == 'add') {
        if (currentGems+price <= gems) {
            itemNumber.value = parseInt(itemNumber.value) + 1;
            totalPrice.value = parseInt(totalPrice.value) + price;
        }
        
    }
}
