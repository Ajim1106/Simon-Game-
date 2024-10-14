let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener('keypress', function () {
    if (!started) {
        console.log("game started");
        started = true;
        levelUp();
    }
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 150);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 150);
}

function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Random button selection
    let randindex = Math.floor(Math.random() * 4); // Corrected this to 4
    let randcolor = btns[randindex];
    let randBtn = document.querySelector(`.${randcolor}`); // Corrected selector
    gameseq.push(randcolor);

    btnflash(randBtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score is <b>${level}</b>. Press any key to start`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector('body').style.backgroundColor = "white";
        }, 100);
        reset();
    }
}

function btnpress() {
    let btn = this;
    userflash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for (let btn of allBtns) {
    btn.addEventListener('click', btnpress);
}

function reset() {
    started = false;
    userseq = [];
    gameseq = [];
    level = 0;
}