// Environment Attributes
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
draw();
let score = 0;

// Ball Attributes
const ballRadius = 10;
let ballColor = "blue";

// Paddle Attributes
const paddleHeight = 10;
const paddleWidth = 75;
let rightPressed = false;
let leftPressed = false;
let paddleX = (canvas.width - paddleWidth) / 2;

// Brick Attributes
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// Movement Attributes
let x = Math.floor(Math.random() * canvas.width);
let y = canvas.height - 30;
let dx = 3;
let dy = -3;

// Build Brick Pattern
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (
                    x > b.x &&
                    x < b.x + brickWidth &&
                    y > b.y &&
                    y < b.y + brickHeight
                ) {
                    dy = -dy;
                    b.status = 0;
                    //ballColor = getColorCode();
                    ++score;
                    if (score === (brickRowCount * brickColumnCount)) {
                        alert(`CONGRATULATIONS!\n Score: ${score}`);
                        document.location.reload();
                       // clearInterval(interval); // Needed for Chrome to end game
                    }
                }
            }
        }
    }
}

// Random Color Generator
function getColorCode() {
    let makeColorCode = '0123456789ABCDEF';
    let code = '#';
    for (let count = 0; count < 6; ++count) {
        code += makeColorCode[Math.floor(Math.random() * 16)];
    }
    return code;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, (canvas.height - paddleHeight), paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();

    x += dx;
    y += dy;
    if (((x + dx) < ballRadius) || ((x + dx) > (canvas.width - ballRadius))) {
        // ballColor = getColorCode();
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            /*             
            if ((-dy) < 8) {
                --dy;
            } 
            */
        } else {
            alert("GAME OVER");
            document.location.reload();
           // clearInterval(interval); // Needed for Chrome to end game
        }
    }
    if (rightPressed && (paddleX < (canvas.width - paddleWidth))) {
        paddleX += 7;
    } else if (leftPressed && (paddleX > 0)) {
        paddleX -= 7;
    }

    requestAnimationFrame(draw);


    /*  --Tutorial Solution to paddle movement--
        if (rightPressed) {
            paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
        } else if (leftPressed) {
            paddleX = Math.max(paddleX - 7, 0);
        } 
    */

}

/*--Player Controls--*/
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

/*--End of Controls--*/