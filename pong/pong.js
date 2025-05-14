const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let gameRunning = true;
let frameCount = 0;
const balls = [];
let score = 0;

//generating a random number angle
function getRandomAngleX() {
if (score > 5400){
	console.log("MAX_X");
    return Math.ceil(Math.random() * 3) + 16;
} else if (score > 4500){
    return Math.ceil(Math.random() * 3) + 13;
} else if (score > 3600){
    return Math.ceil(Math.random() * 3) + 11;
} else if (score > 2700){
    return Math.ceil(Math.random() * 3) + 9;
} else if (score > 1800){
    return Math.ceil(Math.random() * 3) + 7;
} else if (score > 900){
    return Math.ceil(Math.random() * 3) + 6;
} else if (score > 0){
    return Math.ceil(Math.random() * 3) + 3;
}
}

//generating a random number position
function getRandomAngleY() {
if (score > 5400){
    console.log("MAX_X");
    return Math.ceil(Math.random() * 33) - 16;
} else if (score > 3600){
    return Math.ceil(Math.random() * 21) - 10;
} else if (score > 1800){
    return Math.ceil(Math.random() * 11) - 5;
} else if (score > 0){
    return Math.ceil(Math.random() * 7) - 3;
}
}

//generating a random number position
function getRandomNumber() {
    return Math.floor(Math.random() * 390) + 5;
}

const ball = {
    x: 10,
    y: 200,
    color: "blue",
    dx: 1,
    dy: 1,
};
   

//players vari
const player = {
	x: 590,
	y: 200,
	color: "black",
	speed: 3,
};

function generateball () {
    const ball = {
    x: 0,
    y: 1 * getRandomNumber(),
    color: "blue",
    dx: 1 * getRandomAngleX(),
    dy: 1 * getRandomAngleY(),
};
   
    balls.push(ball)
}

//key presses
const keys = {};

function drawPlayerRect(){
	ctx.fillStyle = player.color;
	ctx.fillRect(player.x, player.y, 10, 50);
}

//creating pong ball
function drawBall(){
	balls.forEach(ball => {
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
});
	balls.push(ball);
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

function checkCollision(ball){
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
    gameRunning = false
	console.log("lose");
}

}

function update() {
	frameCount++;
	if (frameCount % 60 === 0) { generateball(); } 

	//moveballs
		balls.forEach(ball => {
			ball.x += ball.dx;
			ball.y += ball.dy; 
			checkCollision(ball);
});
		balls.forEach((ball, index) => {
			if (ball.x  > 600){
		balls.splice(index, 1);
}
	if (ball.y < 10 || ball.y > 390){
		ball.dy = ball.dy * -1;
}
});
}

function drawScore(){
    ctx.font = "10px Arial";
	ctx.fillStyle = "red"
    ctx.fillText(score, 10, 10);
}

//animation function
function animate() {

if (gameRunning){
	score++;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	movePlayer();
	drawPlayerRect();
	drawBall();
	update();
	drawScore();

requestAnimationFrame(animate);

function handleKeyPress(e){
    keys[e.key] = true;
}

document.addEventListener('keydown', handleKeyPress);

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});    

} else {
	alert("you lose");
}
}
animate();
