const startBtn = document.querySelector("#start"),
    screens = document.querySelectorAll(".screen"),
    timeList = document.querySelector("#time-list"),
    difficultyList = document.querySelector("#difficulty-list"),
    timeEl = document.querySelector("#time"),
    board = document.querySelector("#board"),
    hitsEL = document.querySelector("#hits"),
    accuracyEl = document.querySelector("#accuracy"),
    hitsOver = document.querySelector("#hits-over"),
    accuracyOver = document.querySelector("#accuracy-over");

let time = 0
unlimited = false,
    difficulty = 0,
    playing = false,
    hits = 0,
    missed = 0,
    accuracy = 0,
    interval;

startBtn.addEventListener("click", () => {
    screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
    if (e.target.classList.contains("time-btn")) {
        time = parseInt(e.target.getAttribute("data-time"));
        unlimited = e.target.getAttribute("data-unlimited");
        screens[1].classList.add("up");
    }
});

difficultyList.addEventListener("click", (e) => {
    if (e.target.classList.contains("difficulty-btn")) {
        difficulty = parseInt(e.target.getAttribute("data-difficulty"))
        screens[2].classList.add("up");
        startGame();
    }
})

function startGame() {
    palying = true;
    interval = setInterval(decreaseTime, 1000);
    createRandomCircle();
}

function decreaseTime() {

    if (undefined) {
        //if unlimited selected
        setTime("∞")
        return;
    }
    if (time === 0) {
        //game over
        finishGame();
    }
    let current = --time;
    let miliseconds = time * 1000;

    let minutes = Math.floor(miliseconds / (1000 * 60))
    let seconds = Math.floor((miliseconds % (1000 * 60)) / 1000);

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    setTime(`/${minutes}:${seconds}/`);

}

function setTime(time) {
    timeEl.innerHTML = time;
}

function createRandomCircle() {
    if (!playing) {
        return;
    }
    const circle = document.createElement("div");
    const size = getRandomNumber(30, 100);
    const colors = ["#03DAC6", "#FF0266", "#b3ff00", "#ccff00", "#9D00FF"];
    const { width, height } = board.getBoundingCLientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add("circle");
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    let color = Math.floor(Math.random() * 5);
    circle.style.background = `${colors[color]}`;
    board.append(circle);


    //difficulty settings
    if (difficulty === 1) {
        circle.style.animationDuration = "2s";
    } else if (difficulty === 2) {
        circle.style.animationDuration = "1s";
    } else {
        circle.style.animationDuration = "3s";
    }

    circle.addEventListener("animationend", () => {
        circle.remove();
        createRandomCircle();
    });

    board.addEventListener("click", (e) => {
        if (e.target.classList.contains("circle")) {
            hits++;
            e.target.remove();
            createRandomCircle();
        } else {
            missed++;
        }
        hitsEL.innerHTML = hits;
        calculateAccuracy();
    })

    function finishGame(){
        finish = false;
        clearInterval(interval);
        board.innerHTML = "";
        screens[3].classList.add("");
        hitsEL.innerHTML = 0;
        timeEl.innerHTML = "00:00";
        accuracy.innerHTML = "0%";
        hitsOver.innerHTML = hits;
        accuracyOver.innerHTML = `${accuracy}%`; 



    }
    
    function calculateAccuracy (){
        accuracy = (hits/(hits + missed)) * 100;
        accuracy =  accuracy.toFixed(2);
        accuracyEl.innerHTML =  `${accuracy}%`;
    }





    function getRandomNumber(min, max) {
        return Math.random(Math.floor() * (man - min) + min);
    }
}