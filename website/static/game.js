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

function loadGame (planetNum, character) {
    var canvas = document.querySelector('.canvas');
    player = addPlayer(character, canvas);
    
    moveBG(canvas, planetNum);
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
    ;

    // Determine when the user presses a key
    document.addEventListener('keydown', (event) => {
        var name = event.key;
        var code = event.code;

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

        if (name == ' ' || name == 'f') {
            canvas.append(laserImage);
            laserImage.style.transform = playerShip.style.transform;
            clearInterval(shootLaser);
            var shootLaser = setInterval(moveLaser, 10);
        };

        if (name == 'a') {
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
        if (name == 'd') {
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

