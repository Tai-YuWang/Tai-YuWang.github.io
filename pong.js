const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let gameRunning = true;

//ball vari
const ball = {
	x: 300,
	y: 200,
	color: "blue",
	dx: 2,
	dy: 2,
};

//players vari
const player = {
	x: 590,
	y: 200,
	color: "black",
	speed: 3,
};

//generating a random number
function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

//key presses
const keys = {};

function drawPlayerRect(){
	ctx.fillStyle = player.color;
	ctx.fillRect(player.x, player.y, 10, 50);
}

//creating pong ball
function drawBall(){
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(
        ball.x,
        ball.y,
        10,
        0,
        2*Math.PI
    );
    ctx.fill();
}

//moving ball
function moveBall(){
	ball.x = ball.x + ball.dx;
    ball.y = ball.y + ball.dy;

    if(ball.x > 600 || ball.x < 0){
        gameRunning = false;
    }

    if(ball.y > 400 || ball.y < 0){
        ball.dy = ball.dy * -1;
    }
	
}

//moving player
function movePlayer(){
    if(keys['ArrowDown'] && (player.y < 350)) {
        player.y += player.speed;
    }
    if(keys['ArrowUp'] && (player.y > 0)) { 
        player.y -= player.speed;
    }
}

function checkCollision(){
let ball_min_x = ball.x - 10
let ball_max_x = ball.x + 10
let ball_min_y = ball.y - 10
let ball_max_y = ball.y + 10

let player_min_x = player.x
let player_max_x = player.x + 10 
let player_min_y = player.y
let player_max_y = player.y + 50

if (ball_max_y > player_min_y &&
    ball_min_y < player_max_y &&
    ball_max_x > player_min_x &&
    ball_min_x < player_max_x){
    ball.dy = ball.dy * -1
	ball.dx = ball.dx * -1
	console.log("Hello");
}

}

//animation function
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	movePlayer();
	drawPlayerRect();
	moveBall();
	drawBall();
	checkCollision();

requestAnimationFrame(animate);

function handleKeyPress(e){
    keys[e.key] = true;
}

document.addEventListener('keydown', handleKeyPress);

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});    

}
animate();
