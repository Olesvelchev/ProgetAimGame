const startBtn = document.querySelector("#start"),
  screens = document.querySelectorAll(".screen"),
  timeList = document.querySelector("#time-list"),
  timeEl = document.querySelector("#time"),
  board = document.querySelector("#board"),
  colors = [
    "#E8E46E",
    "#01937C",
    "7952B3",
    "#B2B8A3",
    "#F98404",
    "#CF0000",
    "#2940d3",
    "#f4eee8"
  ];

  const restartBtn = document.createElement("button");
restartBtn.innerHTML = "Restart";
restartBtn.addEventListener("click", () => {
  location.reload();
});
board.parentNode.insertBefore(restartBtn, board);

let time = 0,
  score = 0;

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = parseInt(e.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Your Score: <span class = "primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div"),
    size = getRandomNumber(10, 60),
    { width, height } = board.getBoundingClientRect(),
    x = getRandomNumber(0, width - size),
    y = getRandomNumber(0, height - size);

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  setColor(circle);

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function setColor(element) {
  const color = getRandomColor();
  element.style.background = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function getRandomColor() {
  const i = Math.round(Math.random() * colors.length);
  return colors[i];
}

function winTheGame() {
  function kill() {
    const circle = document.querySelector(".circle");

    circle.click();
  }
  setInterval(kill, 75);
}

