const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//ball vari
const ball = {
	x: 300,
	y: 200,
	color: "blue",
	dx: 3,
	dy: 3,
};


//players vari
const player = {
	x: 590,
	y: 200,
	color: "black",
	speed: 3,
};
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

    if(ball.x > 600){
        ball.dx = ball.dx * -1;
    }
    if(ball.x < 0){
        ball.dx = ball.dx * -1;
    }

    if(ball.y > 400){
        ball.dy = ball.dy * -1;
    }
    if(ball.y < 0){
        ball.dy = ball.dy * -1;
    }
}
//moving player
function movePlayer(){
    if(keys['ArrowDown'] && (player.y < 400)) {
        player.y += player.speed;
    }
    if(keys['ArrowUp'] && (player.y > 0)) { 
        player.y -= player.speed;
    }
}
//animation function
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	movePlayer();
	drawPlayerRect();
	moveBall();
	drawBall();

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
