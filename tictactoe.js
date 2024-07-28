let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset");
let newgamebutton=document.querySelector("#new-btn");
let msgcontainer=document.querySelector(".msg-container")
let msg=document.querySelector("#msg");

let turnx=true; 
let count=0;

const winPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const resetGame =() =>{
    let turnx=true;
    count =0;
    enableboxes();
    msgcontainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turnx){
            box.innerText="O";
            turnx= false;
        } else{
            box.innerText="X"
            turnx= true;
        }
        box.disabled=true;
        count++;

        let isWinner=checkwinner();
        if(count==9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgcontainer.classList.remove("hide");
    disabledboxes();
  };

const disabledboxes = () =>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableboxes = () =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showwinner=(winner) =>{   
    msg.innerText=`Congratulations, the winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disabledboxes(); 
};

const checkwinner = () =>{
    for(let pattern of winPattern) {
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;
        
        if(pos1val !="" && pos2val !="" && pos3val !=""){
            if(pos1val=== pos2val && pos2val==pos3val){
                console.log("Winner!",pos1val);
                showwinner(pos1val);
            }
        }
    }
};

newgamebutton.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);