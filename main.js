const MainCanvas = document.getElementById("MainCanvas");
const MainContext = MainCanvas.getContext("2d");
const CanvasWrapper = document.querySelector("#wrapper");
const GameArea = new CanvasManager(new Vector2(1280, 720), MainCanvas, CanvasWrapper);
const keyInput = new keyInputManager();
const Sound = new SoundManager();
GameArea.refresh();

let IsGameRunning = false;

Sound.LoadSound("click", "assets/click.mp3");
Sound.LoadSound("hit", "assets/hit.mp3");
function gameStart() {
    Sound.PlaySound("click"); 
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#game").style.display = "block";
    IsGameRunning = true;
}


    
//aiueo

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
           if(y= y-paddleHeight){
            dy = -dy  ;
			 }
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10);


//当たり判定

//グリッド
const board = [
    "          ",
    "          ",
    " ▪▪▪▪▪▪▪▪ ",
    " ▪▪▪▪▪▪▪▪ ",
    " ▪▪▪▪▪▪▪▪ "
];
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "▪") {
            new CanvasComponents({
                ctx: MainContext,
                img: "assets/bar.png",
                size: new Vector2(GameArea.x / 10 , 30),
                position: new Vector2((GameArea.x / 10 / 2) + j * (GameArea.x / 10), 15 + i * 30),
                update: function () {
                    if (
                        (
                            //横長の判定
                            ball.position.x > this.position.x - this.size.x / 2 - ball.size.x / 2 &&
                            ball.position.x < this.position.x + this.size.x / 2 + ball.size.x / 2 &&
                            ball.position.y > this.position.y - this.size.y / 2 &&
                            ball.position.y < this.position.y + this.size.y / 2
                        ) || ( 
                            //縦長の判定
                            ball.position.x > this.position.x - this.size.x / 2 &&
                            ball.position.x < this.position.x + this.size.x / 2 &&
                            ball.position.y > this.position.y - this.size.y / 2 - ball.size.y / 2 &&
                            ball.position.y < this.position.y + this.size.y / 2 + ball.size.y / 2
                        )
                    ) {
                        Sound.PlaySound("hit");
                        board[i] = board[i].slice(0, j) + " " + board[i].slice(j + 1);
                        if (ball.position.x > this.position.x - this.size.x / 2 && ball.position.x < this.position.x + this.size.x / 2) 
                             ball.direction.y *= -1;
                        else ball.direction.x *= -1;
                        
                        this.position = new Vector2(-100, -100);
                    }
                },
            });
        }
    }
}

Sound.LoadSound("click", "assets/click.mp3");
Sound.LoadSound("hit", "assets/hit.mp3");
function gameStart() {
    Sound.PlaySound("click");
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#game").style.display = "block";
    bar.position = new Vector2(GameArea.x / 2, GameArea.y - 100);
    ball.position = new Vector2(GameArea.x / 2, GameArea.y / 2);
    ball.direction = new Vector2(Math.random() * 0.5 - 0.25, 1);
    IsGameRunning = true;
}

function gameOver() {
    document.querySelector("#gameover").style.display = "block";
    IsGameRunning = false;
}

function backMenu() {
    Sound.PlaySound("click");
    document.querySelector("#menu").style.display = "block";
    document.querySelector("#game").style.display = "none";
    document.querySelector("#gameEnd").style.display = "none";
}

function update() {}
//キーインプット＆サウンド

//ボール方向
const ball = new CanvasComponents({
    ctx: MainContext,
    img: "assets/ball.png",
    size: new Vector2(36, 36),
    position: new Vector2(GameArea.x / 2, GameArea.y / 2),
    update: function () {
        if (IsGameRunning) {
            if (this.position.x < 0 + this.size.x / 2) {
                this.direction.x = Math.abs(this.direction.x);
                Sound.PlaySound("hit");
            } else if (this.position.x > GameArea.x - this.size.x / 2) {
                this.direction.x = Math.abs(this.direction.x) * -1;
                Sound.PlaySound("hit");
            }
            if (this.position.y < 0 + this.size.y / 2) {
                this.direction.y = Math.abs(this.direction.y);
                Sound.PlaySound("hit");
            }
            if (
                this.position.y > bar.position.y - bar.size.y / 2 - this.size.y / 2 &&
                this.position.y < bar.position.y + bar.size.y / 2 + this.size.y / 2 &&
                this.position.x > bar.position.x - bar.size.x / 2 - this.size.x / 2 &&
                this.position.x < bar.position.x + bar.size.x / 2 + this.size.x / 2
            ) {
                let hitPosition = (this.position.x - bar.position.x) / (bar.size.x / 2);
                this.direction = new Vector2(2 * hitPosition, -1);
                Sound.PlaySound("hit");
            }
            if (this.position.y > GameArea.y - this.size.y / 2) {
                gameOver();
            }
            this.motion = this.direction.normalized().multiply(15);
            this.position = this.position.add(this.motion);
        }
    },
});
ball.direction = new Vector2(0, 0);

        
//ボール反射
if (IsGameRunning) {
    if (this.position.x < 0 + this.size.x / 2) {
        this.direction.x = Math.abs(this.direction.x);
        Sound.PlaySound("hit");
    } else if (this.position.x > GameArea.x - this.size.x / 2) {
        this.direction.x = Math.abs(this.direction.x) * -1;
        Sound.PlaySound("hit");
    }
    if (this.position.y < 0 + this.size.y / 2) {
        this.direction.y = Math.abs(this.direction.y);
        Sound.PlaySound("hit");
    }
    if (
        this.position.y > bar.position.y - bar.size.y / 2 - this.size.y / 2 &&
        this.position.y < bar.position.y + bar.size.y / 2 + this.size.y / 2 &&
        this.position.x > bar.position.x - bar.size.x / 2 - this.size.x / 2 &&
        this.position.x < bar.position.x + bar.size.x / 2 + this.size.x / 2
    ) {
        let hitPosition = (this.position.x - bar.position.x) / (bar.size.x / 2);
        this.direction = new Vector2(2 * hitPosition, -1);
        Sound.PlaySound("hit");
    }
    if (this.position.y > GameArea.y - this.size.y / 2) {
        gameOver();
    }
    this.motion = this.direction.normalized().multiply(15);
    this.position = this.position.add(this.motion);
}
