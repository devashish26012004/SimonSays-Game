let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h3");

document.addEventListener("keypress",function () {
    if (started == false){
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash")
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },200);
}

function levelUp() {
    userSeq = [];
    level ++;
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)

    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else {
        h2.innerHTML = `Game over! Your score was ${level}. <br> Press any key to start again`;
        let body = document.querySelector("body");
        body.classList.add("wrongflash");
        setTimeout(()=>{
            body.classList.remove("wrongflash");
        },200);

        if(level>highestScore){
            highestScore = level;
        }

        let highestScoreDisplay = document.querySelector(".Highest-Score");
        highestScoreDisplay.innerHTML = `Highest Score : ${highestScore}`; 

        reset();
    }
}

function btnPress () {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}