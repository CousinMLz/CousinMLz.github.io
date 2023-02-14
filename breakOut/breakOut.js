const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const interval = setInterval(draw, 10);
const ballRadius = 10;
let ballColor = "blue";
const paddleHeight = 10;
const paddleWidth = 75;
let rightPressed = false;
let leftPressed = false;
let paddleX = (canvas.width - paddleWidth) / 2;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

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

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, (canvas.height - paddleHeight), paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;
    if (((x + dx) < ballRadius) || ((x + dx) > (canvas.width - ballRadius))) {
        ballColor = getColorCode();
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            if((-dy) < 6){
                --dy;
            }
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
    if (rightPressed && (paddleX < (canvas.width - paddleWidth))) {
        paddleX += 7;
    } else if (leftPressed && (paddleX > 0)) {
        paddleX -= 7;
    }

    /*  -------Tutorial Solution to paddle movement-------
        if (rightPressed) {
            paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
        } else if (leftPressed) {
            paddleX = Math.max(paddleX - 7, 0);
        } 
    */

}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
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