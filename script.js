const playerElement = document.querySelector('.player');
const playerHpBar = document.getElementById('playerHpBar');
let playerHP = 100; // Set the initial HP
const playerIdleFrameCount = 3;
const playerAttackFrameCount = 2;  // Updated attack frame count
let currentFrame = 0;
let isAttacking = false;
let isAttackingLeft = false;
let score = 0;


function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}

// List of image URLs to preload for idle frames
// List of image URLs to preload for idle frames
const idleImageUrls = [
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_00_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_01_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_02_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_03_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_04_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_05_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_06_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_07_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_08_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_09_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_10_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_11_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_12_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_13_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_14_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_15_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_16_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_17_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_18_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_19_delay-0.04s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_20_delay-0.04s.png'
];


// List of image URLs to preload for attack frames
const attackImageUrls = [
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/attack%20(1).png',
  'https://raw.githubusercontent.com/Ben00000000/Robot/main/attack%20(2).png'
    // Updated attack frame
];

// List of image URLs to preload for chasing shape frames
const chasingShapeImageUrls = [
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_00_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_01_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_02_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_03_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_04_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_05_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_06_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_07_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_08_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_09_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_10_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_11_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_12_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_13_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_14_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_15_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_16_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_17_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_18_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_19_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_20_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_21_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_22_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_23_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_24_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_25_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_26_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_27_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_28_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_29_delay-0.02s.png',
    'https://raw.githubusercontent.com/Ben00000000/Robot/main/frame_30_delay-0.02s.png'
];


// Array to store preloaded images
const chasingShapeFrames = [];
const playerIdleFrames = [];
const playerAttackFrames = [];

const preloadImages = () => {
    const images = [];

    // Preload idle frames
    for (let i = 0; i < playerIdleFrameCount; i++) {
        const imageUrl = idleImageUrls[i];
        const img = new Image();
        img.src = imageUrl;
        images.push(img);
    }

    // Preload attack frames
    for (let i = 0; i < playerAttackFrameCount; i++) {
        const imageUrl = attackImageUrls[i];
        const img = new Image();
        img.src = imageUrl;
        images.push(img);
    }

    // Preload chasing shape frames
    for (let i = 0; i < chasingShapeImageUrls.length; i++) {
        const imageUrl = chasingShapeImageUrls[i];
        const img = new Image();
        img.src = imageUrl;
        images.push(img);
    }

    let imagesLoaded = 0;

    const checkAllImagesLoaded = () => {
        imagesLoaded++;

        if (imagesLoaded === images.length) {
            // All images are loaded, start the animation
            animatePlayer();
        }
    };

    images.forEach((img, index) => {
        // Separate preloaded images for idle, attack, and chasing shape frames
        if (index < playerIdleFrameCount) {
            playerIdleFrames.push(img);
        } else if (index < playerIdleFrameCount + playerAttackFrameCount) {
            playerAttackFrames.push(img);
        } else {
            chasingShapeFrames.push(img);
        }

        img.onload = checkAllImagesLoaded;
    });
};

preloadImages();

const frameInterval = 40; // Interval between frames in milliseconds
let lastTimestamp = 0;

function animatePlayer(timestamp) {
  
   if (playerHP <= 0) {
        // Player is defeated, show game over screen
        showGameOverScreen();
        return; // Stop animation if the game is over
    }
  
    if (!lastTimestamp) {
        lastTimestamp = timestamp;
    }

    const elapsedMilliseconds = timestamp - lastTimestamp;

    if (elapsedMilliseconds > frameInterval) {
        if (isAttacking) {
            const frameNumber = currentFrame;
            const attackFrame = playerAttackFrames[frameNumber % playerAttackFrameCount];

            playerElement.style.backgroundImage = `url('${attackFrame.src}')`;

            // Do not update the frame if the circle is still shooting
            if (!isAttackingLeft) {
                currentFrame = (currentFrame + 1) % playerAttackFrameCount;
            }
        } else {
            const idleFrame = playerIdleFrames[currentFrame % playerIdleFrameCount];
            playerElement.style.backgroundImage = `url('${idleFrame.src}')`;

            currentFrame = (currentFrame + 1) % playerIdleFrameCount;
        }

        lastTimestamp = timestamp;
    }

    setTimeout(() => {
        requestAnimationFrame(animatePlayer);
    }, frameInterval);
}


let allowedCircleSpawns = 10; // Set the desired limit

let createdCircle; // Store a reference to the created circle

function handleAttack(tapX, tapY) {
   if (playerHP <= 0) {
        return; // Stop moving if the game is over
    }
    if (allowedCircleSpawns > 0) {
        isAttacking = true;
        allowedCircleSpawns--;

        const playerRect = playerElement.getBoundingClientRect();
        isAttackingLeft = tapX < playerRect.left + playerRect.width / 2;

        const circleElement = document.createElement('div');
        circleElement.className = 'circle';
        document.body.appendChild(circleElement);

        createdCircle = circleElement; // Store the reference

        if (isAttackingLeft) {
            circleElement.style.left = `${playerRect.left}px`;
        } else {
            circleElement.style.left = `${playerRect.left + playerRect.width}px`;
        }
         // Adjust the starting point to the middle of the player along the y-axis
        const playerMidY = playerRect.top + playerRect.height / 2;
        circleElement.style.top = `${playerMidY - circleElement.clientHeight / 2}px`;

        circleElement.style.display = 'block';

        setTimeout(() => {
            circleElement.style.transition = 'transform 0.5s ease-out';
            circleElement.style.transform = `translate(${tapX - playerRect.left}px, ${tapY - playerRect.top}px)`;
        }, 100);

        setTimeout(() => {
            isAttacking = false;
            document.body.removeChild(circleElement);
            allowedCircleSpawns++;
           
            currentFrame = (currentFrame + 1) % playerAttackFrameCount;
        }, 600);
    }
}


let isClicking = false; // Flag to track if the click is being held

document.addEventListener('mousedown', (event) => {
    isClicking = true;
    const tapX = event.clientX;
    const tapY = event.clientY;
    handleAttack(tapX, tapY);
});

document.addEventListener('mouseup', () => {
    isClicking = false;
    isAttacking = false; // Release the attack when click is released
    currentFrame = 0; // Reset the frames when click is released
});

document.addEventListener('touchstart', (event) => {
    event.preventDefault();
    isClicking = true;
    const tapX = event.touches[0].clientX;
    const tapY = event.touches[0].clientY;
    handleAttack(tapX, tapY);
});

document.addEventListener('touchend', () => {
    isClicking = false;
    isAttacking = false; // Release the attack when touch is released
    currentFrame = 0; // Reset the frames when touch is released
});

// Continuously update the attack position while holding
document.addEventListener('mousemove', (event) => {
    if (isClicking) {
        const tapX = event.clientX;
        const tapY = event.clientY;
        handleAttack(tapX, tapY);
    }
});

document.addEventListener('touchmove', (event) => {
    if (isClicking) {
        event.preventDefault();
        const tapX = event.touches[0].clientX;
        const tapY = event.touches[0].clientY;
        handleAttack(tapX, tapY);
    }
});


const shapeGenerationInterval = 5000; // 5 seconds
const numberOfShapes = 5;
const chasingShapeSpeed = 2; // Adjust the speed as needed (lower value means slower speed)

function generateChasingShapes() {
    if (playerHP <= 0) {
        return; // Stop respawning if the game is over
    }

    for (let i = 0; i < numberOfShapes; i++) {
        const chasingShape = document.createElement('div');
        chasingShape.className = 'chasing-shape';
        document.body.appendChild(chasingShape);

        const startX = window.innerWidth + Math.random() * 200; // Adjust the offset as needed
        const startY = Math.random() * (window.innerHeight - chasingShape.clientHeight);

        // Ensure the shape is spawned within the screen width
        chasingShape.style.left = `${Math.min(startX, window.innerWidth - chasingShape.clientWidth)}px`;
        chasingShape.style.top = `${startY}px`;

        // Set the initial frame for the chasing shape
        const initialFrame = Math.floor(Math.random() * chasingShapeFrames.length);
        chasingShape.style.backgroundImage = `url('${chasingShapeFrames[initialFrame].src}')`;

        function move() {
            if (playerHP <= 0) {
                return; // Stop moving if the game is over
            }

            const frameNumber = Math.floor((Date.now() / 20) % chasingShapeFrames.length);
            chasingShape.style.backgroundImage = `url('${chasingShapeFrames[frameNumber].src}')`;

            const playerRect = playerElement.getBoundingClientRect();
            const playerCenterX = playerRect.left + playerRect.width / 2;
            const playerCenterY = playerRect.top + playerRect.height / 2;

            const deltaX = playerCenterX - parseFloat(chasingShape.style.left);
            const deltaY = playerCenterY - parseFloat(chasingShape.style.top);
            const distanceToPlayer = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            const velocityX = (deltaX / distanceToPlayer) * chasingShapeSpeed;
            const velocityY = (deltaY / distanceToPlayer) * chasingShapeSpeed;

            chasingShape.style.left = `${parseFloat(chasingShape.style.left) + velocityX}px`;
            chasingShape.style.top = `${parseFloat(chasingShape.style.top) + velocityY}px`;

            if (parseFloat(chasingShape.style.left) > window.innerWidth) {
                chasingShape.style.left = `${window.innerWidth - chasingShape.clientWidth}px`;
                chasingShape.style.top = `${Math.random() * (window.innerHeight - chasingShape.clientHeight)}px`;
            }

            if (parseFloat(chasingShape.style.top) > window.innerHeight) {
                document.body.removeChild(chasingShape);
            } else {
                const shapeRect = chasingShape.getBoundingClientRect();

                if (
                    shapeRect.left < playerRect.right &&
                    shapeRect.right > playerRect.left &&
                    shapeRect.top < playerRect.bottom &&
                    shapeRect.bottom > playerRect.top
                ) {
                    document.body.removeChild(chasingShape);
                    decreasePlayerHp(1);
                }

                if (createdCircle) {
                    const circleRect = createdCircle.getBoundingClientRect();

                    if (
                        circleRect.left < shapeRect.right &&
                        circleRect.right > shapeRect.left &&
                        circleRect.top < shapeRect.bottom &&
                        circleRect.bottom > shapeRect.top
                    ) {
                        document.body.removeChild(createdCircle);
                        document.body.removeChild(chasingShape);
                        isAttacking = false;
                        allowedCircleSpawns++;
                        score++;
                        updateScore();
                    }
                }

                requestAnimationFrame(move);
            }
        }

        move();
    }
}



// Generate chasing shapes at regular intervals
setInterval(generateChasingShapes, shapeGenerationInterval);


function updateHpBarPosition() {
    const playerRect = playerElement.getBoundingClientRect();
    const hpBarContainer = document.querySelector('.hp-bar-container');

    hpBarContainer.style.top = `${playerRect.top - 30}px`; // Adjust the offset as needed
    hpBarContainer.style.left = `${playerRect.left + (playerRect.width - hpBarContainer.offsetWidth) / 2}px`;
}

function updateHpBar() {
    const percentage = (playerHP <= 0 ? 0 : playerHP) + '%';
    playerHpBar.style.width = percentage;

    // Check if player HP is zero and take appropriate action
    if (playerHP <= 0) {
        // Player is defeated, handle it here (e.g., game over logic)
        console.log('Game Over');
    }
}

// Function to decrease player HP
function decreasePlayerHp(amount) {
    playerHP -= amount;
    updateHpBar();
  
}

// Call this function whenever the player's position changes
function handlePlayerPositionUpdate() {
    updateHpBarPosition();
}

function showGameOverScreen() {
    const gameOverScreen = document.getElementById('gameOverScreen');
    const finalScoreElement = document.getElementById('finalScore');
    finalScoreElement.textContent = score; // Assuming you want to display the final score
    gameOverScreen.style.display = 'block';
}

function restartGame() {
    // Reset necessary game variables, player position, etc.
  
    playerHP = 100;
    score = 0;
    updateScore();
    updateHpBar();
    // Other reset logic as needed
  
      // Remove all chasing shapes from the DOM
    const chasingShapes = document.querySelectorAll('.chasing-shape');
    chasingShapes.forEach(shape => {
        document.body.removeChild(shape);
    })

    // Hide game over screen
    document.getElementById('gameOverScreen').style.display = 'none';

    // Restart the animation
    animatePlayer();
}


updateScore();
animatePlayer(); // Keep this line at the end of the script