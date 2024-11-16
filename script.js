let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newgamebutton = document.querySelector("#newgame");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;
let turnO = false;

const resetgame = () => {
    turnX = true;
    enablebtn();
    msgcontainer.classList.add("hide");
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
};

const color = () => {
    if(turnX === true && turnO === false){
        document.querySelector("box").style.color = "black";
    }
    else{
        document.querySelector("box").style.color = "blue";
    }
}

const winpattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnX) {
                box.innerText = "X";
                box.style.color = "black";
                turnO = true;
                turnX = false;
            } else {
                box.innerText = "O";
                box.style.color = "blue";
                turnO = false;
                turnX = true;
            }
            box.disabled = true;
            checkwinner();
            checkdraw();
        }
    });
});

const checkwinner = () => {
    for (let pattern of winpattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showwinner(pos1); 
                return;
            }
        }
    }
};

const showwinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disablebtn();
};

const checkdraw = () => {
    const allFilled = [...boxes].every(box => box.innerText !== "");
    
    if (allFilled) {
        showdraw();
    }
};

const showdraw = () => {
    msg.innerText = `OH! It's a draw!`;
    msgcontainer.classList.remove("hide");
    disablebtn();
};

const disablebtn = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const enablebtn = () => {
    boxes.forEach(box => {
        box.disabled = false;
    });
};

newgamebutton.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);