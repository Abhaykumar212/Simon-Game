let gameSeq = [];
let userSeq = [];

let start = false
let level = 0
let highScore = 0

let buttons = ["red","green","orange","purple"]

document.addEventListener('keypress',() => {
    if(start == false){
        start = true
        setTimeout(levelUp,1000)
    }
})

function btnflash(btn){
    btn.classList.add('flash')
    setTimeout(()=>{
        btn.classList.remove('flash')
    },250)
}

function userFlash(btn){
    btn.classList.add('userFlash')
    setTimeout(()=>{
        btn.classList.remove('userFlash')
    },250)
}

function levelUp(){
    userSeq = []
    level++;
    document.querySelector("h2").innerText = `Level ${level}`;

    let index = Math.floor(Math.random() * 3)
    let color = buttons[index]
    let btn = document.querySelector(`.${color}`)
    gameSeq.push(color)
    btnflash(btn);
}

function check(index){
    if(userSeq[index] === gameSeq[index]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000)
        }
    }
    else{
        if(highScore<level){
            highScore = level
            let highsc = document.getElementById('high')
            if(highsc){
                highsc.innerText = `Highest Score :- ${highScore}`
            }
            else{
                let highScoreDiv = document.createElement('div');
                highScoreDiv.id = 'high';
                highScoreDiv.innerText = `Highest Score :- ${highScore}`;
                document.body.append(highScoreDiv);
            }
        }
        document.querySelector("h2").innerHTML = `Game Over! Your Score was <b>${level}</b><br><pre>    Press any key to start</pre>`;
        start = false
        level = 0
        gameSeq = []
        userSeq = []
    }
}

function btnPress(){
    let btn = this
    userFlash(btn)
    let color = btn.getAttribute('id')
    userSeq.push(color)
    check(userSeq.length - 1);
}

let btns = document.querySelectorAll(".box");
for(box of btns){
    box.addEventListener('click', btnPress);
}