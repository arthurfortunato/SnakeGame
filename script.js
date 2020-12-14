let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 10

let snake = []
snake[0] = {
  x: 10 * box,
  y: 10 * box
}

let direction = 'right';

function createBox() {
  context.fillStyle = '#131313'
  context.fillRect(0, 0, 40 * box, 40 * box)
}

let food = {
    x: Math.floor(Math.random() * 39 + 1) * box,
    y: Math.floor(Math.random() * 39 + 1) * box
}

function createSnake() {
  for(i = 0; i < snake.length; i++) {
    context.fillStyle = '#FFF'
    context.fillRect(snake[i].x, snake[i].y,  box, box)
  }
}

function drawFood() {
  context.fillStyle = 'red'
  context.fillRect(food.x, food.y, box , box )
}

document.addEventListener('keydown', update)

function update(e) {
  if(e.keyCode == 37 && direction !== 'right') direction = 'left'
  if(e.keyCode == 38 && direction !== 'down') direction = 'up'
  if(e.keyCode == 39 && direction !== 'left') direction = 'right'
  if(e.keyCode == 40 && direction !== 'up') direction = 'down'
}

const upTouch = document.querySelector(".tecla[id=uptouch]");
const dwTouch = document.querySelector(".tecla[id=dwtouch]");
const lfTouch = document.querySelector(".tecla[id=lftouch]");
const rgTouch = document.querySelector(".tecla[id=rgtouch]");

upTouch.addEventListener("click", () => {if (direction != "down") direction = "up"});
dwTouch.addEventListener("click", () => {if (direction != "up") direction = "down"});
lfTouch.addEventListener("click", () => {if (direction != "right") direction = "left"});
rgTouch.addEventListener("click", () => {if (direction != "left") direction = "right"});

function playGame() {
  if(snake[0].x > 39 * box && direction == 'right') snake[0].x = 0
  if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box 
  if(snake[0].y > 39 * box && direction == 'down') snake[0].y = 0
  if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box
  
  for(i = 1; i < snake.length; i++) {
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game)
      alert('Game Over ... Try again!! =D')
    }
  }
  
  createBox()
  createSnake()
  drawFood()

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if(direction == 'right') snakeX += box
  if(direction == 'left') snakeX -= box
  if(direction == 'up') snakeY -= box
  if(direction == 'down') snakeY += box

  if(snakeX != food.x || snakeY != food.y) {
    snake.pop(); //pop tira o último elemento da lista
  } else {
    food.x = Math.floor(Math.random() * 39 +1) * box;
    food.y = Math.floor(Math.random() * 39 +1) * box;
}

  let newHead = {
    x: snakeX,
    y: snakeY
}

snake.unshift(newHead);

}

let game = setInterval(playGame, 50)
