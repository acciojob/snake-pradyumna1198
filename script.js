//your code here
const gameContainer = document.getElementById('gameContainer');
const scoreBoard = document.createElement('div');
scoreBoard.classList.add('scoreBoard');
scoreBoard.innerText = 'Score: 0';
document.body.appendChild(scoreBoard);

const ROWS = 40;
const COLS = 40;
const PIXEL_SIZE = 10;
const INITIAL_SPEED = 100; // milliseconds

let snake = [{ row: 19, col: 0 }];
let direction = 'right';
let food = null;
let score = 0;

function createPixel(row, col, className) {
  const pixel = document.createElement('div');
  pixel.id = `pixel${row}_${col}`;
  pixel.classList.add(className);
  pixel.style.gridColumnStart = col + 1;
  pixel.style.gridRowStart = row + 1;
  gameContainer.appendChild(pixel);
}

function createSnake() {
  snake.forEach((segment, index) => {
    createPixel(segment.row, segment.col, index === 0 ? 'snakeBodyPixel' : 'snakeBodyPixel');
  });
}

function generateFood() {
  const randomRow = Math.floor(Math.random() * ROWS);
  const randomCol = Math.floor(Math.random() * COLS);
  const foodPixel = document.getElementById(`pixel${randomRow}_${randomCol}`);
  if (!foodPixel.classList.contains('snakeBodyPixel')) {
    foodPixel.classList.add('food');
    food = { row: randomRow, col: randomCol };
  } else {
    generateFood();
  }
}

function moveSnake() {
  const head = { ...snake[0] };
  switch (direction) {
    case 'up':
      head.row--;
      break;
    case 'down':
      head.row++;
      break;
    case 'left':
      head.col--;
      break;
    case 'right':
      head.col++;
      break;
  }

  if (head.row < 0 || head.row >= ROWS || head.col < 0 || head.col >= COLS) {
    clearInterval(gameInterval);
    alert(`Game Over! Your score is ${score}`);
    return;
  }

  const headPixel = document.getElementById(`pixel${head.row}_${head.col}`);
  if (headPixel.classList.contains('snakeBodyPixel')) {
    clearInterval(gameInterval);
    alert(`Game Over! Your score is ${score}`);
    return;
  }

  snake.unshift(head);

  if (head.row === food.row && head.col === food.col) {
    headPixel.classList.remove('food');
    generateFood();
    score++;
    scoreBoard.innerText = `Score: ${score}`;
  } else {
    const tail = snake.pop();
    const tailPixel = document.getElementById(`pixel${tail.row}_${tail.col}`);
    tailPixel.classList.remove('snakeBodyPixel');
  }

  createPixel(head.row, head.col, 'snakeBodyPixel');
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
});

createSnake();
generateFood();
const gameInterval = setInterval(moveSnake, INITIAL_SPEED);