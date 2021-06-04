const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];



let board;
let turn = 'X';
let win;
let xscore=0
let oscore=0
let id=0
let t=0
let oneplayer=0
let system='O'
let human='X'
let od=0
let gate=0

const squares = Array.from(document.querySelectorAll('#board div'));

document.getElementById('board').addEventListener('click', handleTurn);
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);
document.getElementById('reset-button').addEventListener('click', ad);
function ad(){
    turn='X'
messages.textContent=`It's ${turn}'s turn!`
document.getElementById('x').textContent='0'
document.getElementById('res').textContent='tie!'
document.getElementById('o').textContent='0'
xscore=0
oscore=0
document.getElementById("players").style.display="block"
document.getElementById("xbox").style.color="black"
document.getElementById("obox").style.color="black"
}


function getWinner() {
    let winner = null;
    winningCombos.forEach(function (combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
    });
    return winner ? winner : board.includes('') ? null : 'T';
};

function handleTurn() {
    let idx = squares.findIndex(function (square) {
        return square === event.target;
    });
    if(oneplayer==1){

                if(board[idx]==''){
                    board[idx] = turn;
                    turn = system
                    win = getWinner();
                    render();
                    }
                    if(win==null && turn==system){
                    st()
                }
            
    }
    else{
    if(board[idx]==''){
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    render();
    }}
};
function st(){
    od=window.setInterval(systemplay,800);
}
function systemplay(){
    window.clearInterval(od);
    var random=Math.floor(Math.random() * 10);
            if(random==9)random--
            let ter=0
            while(board[random] != ''){
                random=Math.floor(Math.random() * 10);
                if(random==9){random--}
                ter++
                }
            board[random] = system;
            turn = human
            win = getWinner();
                    render();
            
}

function init() {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    board.forEach(function (mark, index) {
        squares[index].textContent = mark;
    });
};

function render() {
    board.forEach(function (mark, index) {
        squares[index].textContent = mark;
    });
    if (win === 'T'){
        messages.textContent = `That's a tie, queen! and It's ${turn}'s turn! to start`;
       
        t=1;
        start()
    }
    else if(win){
        
        Score()
        messages.textContent=`${win} wins the game! and It's ${turn}'s turn! to start`;
        t=0;
        start()
    }
    else{
        messages.textContent=`It's ${turn}'s turn!`;
    }
    };
    var run=1
    function Score(){
        if(win == 'X'){
                xscore++
            document.getElementById('x').textContent=xscore
        }
        else if(win == 'O'){
                oscore++
            document.getElementById('o').textContent=oscore
        }
        if(xscore == oscore){
            document.getElementById('res').textContent='tie!'
        }
        else if(xscore < oscore){
            document.getElementById('res').textContent='o leads!'
        }
        else{
            document.getElementById('res').textContent='x leads!'
        }
    }
    function start(){
        id=window.setInterval(rebod,300);
    }
    function rebod(){
            window.clearInterval(id);
            board = [
                '', '', '',
                '', '', '',
                '', '', ''
            ];
            board.forEach(function (mark, index) {
                squares[index].textContent = mark;
            });
            if(t==1){
                document.getElementById("popmsg").textContent=`Ohhhh It's a TIE!`
                document.getElementById("pop").style.display="block"
                document.getElementById("screen").style.display="block"
                
            }
            else{
                document.getElementById("popmsg").textContent=`Congratulations ${win} You Have WON The Game!!!`
                document.getElementById("pop").style.display="block"
                document.getElementById("screen").style.display="block"
            }
    }
    document.getElementById('popclose').addEventListener('click', close);
    function close(){
            document.getElementById("pop").style.display="none"
            document.getElementById("screen").style.display="none"
            if((win==human || turn==system) && oneplayer==1){
                st()
            }
    }

init();
document.getElementById('1player').addEventListener('click', oneplayers);
document.getElementById('2player').addEventListener('click', twoplayers);
function oneplayers(){
    document.getElementById("players").style.display="none"
    document.getElementById("playas").style.display="block"
    oneplayer=1
    document.getElementById("det").textContent="One Player"
}
function twoplayers(){
    document.getElementById("players").style.display="none"
    document.getElementById("playas").style.display="block"
    document.getElementById("playas").style.display="none"
    document.getElementById("screen").style.display="none"
    document.getElementById("det").textContent="Two Player"
    oneplayer=0
}
document.getElementById('asx').addEventListener('click', playasx);
document.getElementById('aso').addEventListener('click', playaso);
function playasx(){
    document.getElementById("playas").style.display="none"
    document.getElementById("screen").style.display="none"
    document.getElementById("xbox").style.color="#cae8d5"
    system='O'
    human='X'
    
}
function playaso(){
    document.getElementById("playas").style.display="none"
    document.getElementById("screen").style.display="none"
    document.getElementById("obox").style.color="#cae8d5"
    system='X'
    human='O'
    turn=system
    st()
    
}
