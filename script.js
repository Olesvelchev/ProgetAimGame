const startBtn = document.querySelector("#start"),
screens = document.querySelectorAll(".screen");
timeList = document.querySelector("#time-list");

let time = 0

startBtn.addEventListener("click", () => {
    screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
    if (e.target.classList.contains("time-btn")){
        time = parseInt(e.target.getAttribute("data-time"));
    }
});