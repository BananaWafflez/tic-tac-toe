
const gameBoard = (function (){
    console.log("Creating Game...");
    const gameArray = 
    [[" ", " ", " "], 
    [" "," ", " "], 
    [" "," ", " "]];

    const setBoard = function(index, letter){
        if(index > 9){
            console.log("That is not a valid index")
        }
        var row = parseInt(Math.floor((index ) / 3));
        var column = parseInt(Math.floor((index ) % 3));
        
        gameArray[row][column] = letter;
        
        
    }
    const displayBoard = (function(){
        for(let i = 0; i < gameArray.length; i++){
            console.log(gameArray[i]);
            
        }
    })
    const getBoardIndex = function(index){
        var row = parseInt(Math.floor((index - 1) / 3));
        var column = parseInt(Math.floor((index - 1) % 3));
        if(gameArray[row][column] != " "){
            return true;
        }else{
            return false;
        }
    }


    console.log("Game created!");
    return {getBoardIndex, gameArray, setBoard, displayBoard}
})();

const displayController = (function(){
    const checkRow = (function(gameArray){

        var count = 0;

        for(let i = 0; i < gameArray.length; i++){
            //hold the first letter in the row
            var letterhold = gameArray[i][0];

            if(letterhold == " "){
                continue;
            }

            //checks every column in the row
            for(let j = 0; j < gameArray.length; j++){

                if(gameArray[i][j] == letterhold){
                    count++;
                    console.log(count);
                }

            }

            //if count is 3, we have a match
            if(count == 3){
                console.log("Row Win!");
                return true;
            }

            count = 0;
        }
        
        return false;
        
    })
    const checkDiagonal= (function(gameArray){
        var count = 0;
        var letterhold = gameArray[0][0];
        
        for(let i = 0; i < gameArray.length; i++){
            if(letterhold == gameArray[i][i] && letterhold != " "){
                count++;
            }else{
                break;
            }
        }
        if(count == 3){
            console.log("Diagonal Win");
            return true;
        }


        count = 0;
        letterhold =  gameArray[0][2];
        console.log(letterhold);
        var j = gameArray.length - 1;
        for(let i = 0 ; i < gameArray.length; i++){
            
            
            //console.log(j);
            if(letterhold == gameArray[i][j] && letterhold != " "){
                count++;
                j--;
            }else{
                break;
            }
        }
        
        if(count == 3){
            
            console.log("Diagonal Win");
            return true;
        }
        return false;

        
    })
    const checkColumn = (function(gameArray){
        var count = 0;
        for(let i = 0; i < gameArray.length; i++){
            let j = 0;
            var letterhold = gameArray[i][j]
            if(letterhold == " "){
                continue;
            }
            for(j = 0; j < gameArray.length; j++){
                 
                if(letterhold == gameArray[j][i]){
                    count++;
                }
            }

            if(count == 3){
                console.log("Column Win");
                return true;
            }else{
                count = 0;
                j++;
            }
        }
        return false;
    })

    const wrapper = (function(gameArray){
        if(checkRow(gameArray) ||
        checkDiagonal(gameArray) ||
        checkColumn(gameArray)){
            return true;
        }
        return false;
    })

    const startGame = (function(gameArray, player1, player2){
        documentController.addListeners();
        documentController.setLetter(player1.playerLetter);
        console.log(player1.playerLetter);

        while(player1.playerTurn){

            documentController.setLetter(player1.playerLetter);


        }
        while(player2.playerTurn){
            documentController.setLetter(player2.playerLetter)
        }
        
        
        
        // for(var i = 0; i < 9; i++){
        //     if(i % 2 == 0){
        //         //player 1 turn

        //         documentController.setLetter(player1.letter);
        //         player1.indexInput();
        //         gameBoard.displayBoard();
        //         if(wrapper(gameArray)){
        //             console.log("Player 1 wins!");
        //             return;
        //         }
        //     }else{
        //         //player 2 turn
        //         documentController.setLetter(player2.letter);
        //         player2.indexInput();
        //         gameBoard.displayBoard();
        //         if(wrapper(gameArray)){
        //             console.log("Player 2 wins!");
        //             return;
        //         }
        //     }
        // }

    })

    return{wrapper, startGame};

})();

function Player(letter){

    var playerLetter = letter;
    var playerTurn = false;
    const indexInput = (function(){

        //var num = prompt("Type a number (1-9) where you want to place " + playerLetter);
        // while(num > 9){
        //     alert("That spot is invalid!");
        //     num = prompt("Type a number (1-9) where you want to place " + playerLetter);
        // }
        // while(gameBoard.getBoardIndex(num)){
        //     alert("That spot is invalid!");
        //     num = prompt("Type a number (1-9) where you want to place " + playerLetter);
        // }
        
        
        gameBoard.setBoard(playerTurn, num, playerLetter);


    })



    return{playerLetter, indexInput};
}

const documentController = (function(){
    let letter;
    const setLetter = function(letter){
        this.letter = letter;
    }
    const getLetter = function(){
        return this.letter;
    }

    const updateBox = function(element,index){
        console.log(this.letter);
        element.innerHTML = this.letter;
        element.classList.add(`${letter}`);
        console.log(documentController.getLetter() + ";" + player1.playerLetter)
        gameBoard.setBoard(index, this.letter);
        if(this.letter == player1.playerLetter){
            console.log("Test");
            console.log("Current letter: " + documentController.getLetter());
            documentController.setLetter(player2.playerLetter)
            player1.playerTurn = false;
            player2.playerTurn = true;
            
        }else{
            player2.playerTurn = false;
            player1.playerTurn = true;
            documentController.setLetter(player1.playerLetter)
            
        }
    }
    const addListeners = function(){
        console.log("listeners")
        for(let i = 0; i < boxes.length; i++){
            boxes[i].addEventListener("click", function(){
                var index = boxes.indexOf(event.target);
                //gameBoard.setBoard(index + 1, this.letter);
                documentController.updateBox(event.target, index)
                gameBoard.displayBoard();
                displayController.wrapper(gameBoard.gameArray);
                
            }); //filler for now
        }
    }
    return {setLetter, getLetter, updateBox, addListeners};
})();


//tests

const player1 = new Player("X");
const player2 = new Player("O");
var boxes = Array.prototype.slice.call(document.getElementsByClassName("box"));

console.log(boxes);

//documentController.addListeners();

var button = document.getElementById("startGame");
button.addEventListener("click", function(){
    displayController.startGame(gameBoard.gameArray,player1,player2);
})


//gameBoard.setBoard(1, "X");
//gameBoard.setBoard(4, "X");
//gameBoard.setBoard(7, "X");
gameBoard.displayBoard();
//displayController.startGame(gameBoard.gameArray, player1, player2);
displayController.wrapper(gameBoard.gameArray);


