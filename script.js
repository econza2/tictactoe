function createGameBoard () {
    
    let emptyBoard = {
            0: {0:0},
            1: {1:1},
            2: {2:2},
            3: {3:3},
            4: {4:4},
            5: {5:5},
            6: {6:6},
            7: {7:7},
            8: {8:8}, 
        }
    

    const showEmptyBoard = () => emptyBoard;

    return {showEmptyBoard}
}



function createPlayer (playerName) {
    const name = playerName;

    return function createMarker (playerMarker) {
        const marker = playerMarker;
    
    
        return {name, marker};
    }
};


(function fillGameboard () {
    const {showEmptyBoard} = createGameBoard();

    let gameArray = showEmptyBoard();



    let playerOneName = prompt("Enter Player One Name");
    let playerOne = createPlayer(playerOneName);
    let playerOneMarker = prompt("Enter Player One Marker");

    let playerTwoName = prompt("Enter Player Two Name");
    let playerTwo = createPlayer(playerTwoName);
    let playerTwoMarker = prompt("Enter Player Two Marker");


    while(playerOneMarker == playerTwoMarker){
        alert("Player One And Player Two Cannot Have The Same Markers");
        playerOneMarker = prompt("Enter Player One Marker");
        playerTwoMarker = prompt("Enter Player Two Marker");
    }



    let markerOfPlayerOne;
    let markerOfPlayerTwo;


    if(playerOneMarker !== playerTwoMarker){
        markerOfPlayerOne = playerOne(playerOneMarker);
        markerOfPlayerTwo = playerTwo(playerTwoMarker);
    }
    else {
        alert("Player One And Player Two Cannot Have The Same Markers");
    }


    const body = document.querySelector("body");
    const playingGrid = document.createElement("div");
    playingGrid.classList.add("playing-grid");
    const displayResults = document.createElement("div");
    displayResults.style.fontSize = "50px";
    displayResults.style.color = "red";

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Game";
    restartButton.style.fontSize = "40px";


    restartButton.addEventListener("click", () => {
        location.reload(); 
    });


    for(let i = 0; i < 9; i++){
        const divCell = document.createElement("div");
        divCell.classList.add(`${i}`);
        divCell.classList.add("div-cell");
        divCell.style.borderStyle = "solid";
        divCell.style.borderColor = "green";
        divCell.style.height = "100px";
        divCell.style.height = "100px";

        playingGrid.appendChild(divCell);
    }

    body.appendChild(playingGrid);


    const divCellTwo = document.querySelectorAll(".div-cell");
    const playerOneNameDiv = document.createElement("div");
    const playerOneMarkerDiv = document.createElement("div");
    const playerTwoNameDiv = document.createElement("div");
    const playerTwoMarkerDiv = document.createElement("div");


    playerOneNameDiv.textContent = markerOfPlayerOne.name;
    playerOneMarkerDiv.textContent = markerOfPlayerOne.marker;
    playerTwoNameDiv.textContent = markerOfPlayerTwo.name;
    playerTwoMarkerDiv.textContent = markerOfPlayerTwo.marker;


    const playerMarker = document.querySelector(".player-marker");
    playerMarker.appendChild(playerOneNameDiv);
    playerMarker.appendChild(playerOneMarkerDiv);
    playerMarker.appendChild(playerTwoNameDiv);
    playerMarker.appendChild(playerTwoMarkerDiv);


    let count = 0;
    let winnerTrackerArray = [];
    let indexOfPlayerOneWin;
    let indexOfPlayerTwoWin;
    let filledCounter = 0;
    divCellTwo.forEach((item, index) => {

        item.addEventListener("click", () => {
            
            if (count % 2 == 0 && item.textContent == "" && count < 9){
                item.textContent = markerOfPlayerOne.marker;
                gameArray[`${index}`] =  item.textContent;
                console.log(gameArray);
                checkPlayerOneWin();
                checkPlayerTwoWin();
                count++; 
            }
            else if (count % 2 == 1 && item.textContent == "" && count < 9){
                item.textContent = markerOfPlayerTwo.marker;
                gameArray[`${index}`] =  item.textContent;
                console.log(gameArray);
                checkPlayerOneWin();
                checkPlayerTwoWin();
                count++; 
            }
            else if (count % 2 == 0 && item.textContent !== "" && count < 9){ 
                item.textContent = item.textContent;
                count = count;
            }
            else if (count % 2 == 1 && item.textContent !== "" && count < 9){
                item.textContent = item.textContent;
                count = count;
            }
            else{
                console.log("troubleshoot");
            }


            
            if(item.textContent == markerOfPlayerOne.marker
                || item.textContent == markerOfPlayerTwo.marker
            ){
                filledCounter++;
                console.log("filled Counter", filledCounter);
            } 



            
                if(indexOfPlayerOneWin == 0 && filledCounter <= 9){
                    displayResults.textContent = `${markerOfPlayerOne.name} wins`;
                    body.appendChild(displayResults);
                    body.appendChild(restartButton);
                    alert("Game Over");
                }
                else if(indexOfPlayerTwoWin == 0 && filledCounter <= 9){
                    displayResults.textContent = `${markerOfPlayerTwo.name} wins`;
                    body.appendChild(displayResults);
                    body.appendChild(restartButton);
                    alert("Game Over");
                }
                else if (indexOfPlayerOneWin == indexOfPlayerTwoWin && filledCounter == 9){
                    displayResults.textContent = `You Draw`;
                    body.appendChild(displayResults);
                    body.appendChild(restartButton);
                    alert("Game Over");
                }
                else if(indexOfPlayerOneWin !== 0 && indexOfPlayerTwoWin !== 0 && filledCounter <= 9){
                    console.log("")
                }
                else {
                    alert("troubleshoot");
                }
            
        });
    });
    

    function checkPlayerOneWin () {
        if(gameArray["0"] == gameArray["1"] && gameArray["1"] == gameArray["2"] && gameArray["2"] == markerOfPlayerOne.marker 
            || gameArray["0"] == gameArray["3"] && gameArray["3"] == gameArray["6"] && gameArray["6"] == markerOfPlayerOne.marker
            || gameArray["2"] == gameArray["5"] && gameArray["5"] == gameArray["8"] && gameArray["8"] == markerOfPlayerOne.marker
            || gameArray["6"] == gameArray["7"] && gameArray["7"] == gameArray["8"] && gameArray["8"] == markerOfPlayerOne.marker
            || gameArray["3"] == gameArray["4"] && gameArray["4"] == gameArray["5"] && gameArray["5"] == markerOfPlayerOne.marker
            || gameArray["1"] == gameArray["4"] && gameArray["4"] == gameArray["7"] && gameArray["7"] == markerOfPlayerOne.marker
            || gameArray["0"] == gameArray["4"] && gameArray["4"] == gameArray["8"] && gameArray["8"] == markerOfPlayerOne.marker
            || gameArray["2"] == gameArray["4"] && gameArray["4"] == gameArray["6"] && gameArray["6"] == markerOfPlayerOne.marker
        ){
            console.log("Player One you win");
            winnerTrackerArray.push("playerOneWins");
            console.log("winner Array", winnerTrackerArray);
            indexOfPlayerOneWin = winnerTrackerArray.indexOf("playerOneWins");
            indexOfPlayerTwoWin = winnerTrackerArray.indexOf("playerTwoWins");
            console.log("index One", indexOfPlayerOneWin);
            console.log("index Two", indexOfPlayerTwoWin);
        }
        else{
            console.log("you draw");
        }
    }


    function checkPlayerTwoWin () {
        if(gameArray["0"] == gameArray["1"] && gameArray["1"] == gameArray["2"] && gameArray["2"] == markerOfPlayerTwo.marker 
            || gameArray["0"] == gameArray["3"] && gameArray["3"] == gameArray["6"] && gameArray["6"] == markerOfPlayerTwo.marker
            || gameArray["2"] == gameArray["5"] && gameArray["5"] == gameArray["8"] && gameArray["8"] == markerOfPlayerTwo.marker
            || gameArray["6"] == gameArray["7"] && gameArray["7"] == gameArray["8"] && gameArray["8"] == markerOfPlayerTwo.marker
            || gameArray["3"] == gameArray["4"] && gameArray["4"] == gameArray["5"] && gameArray["5"] == markerOfPlayerTwo.marker
            || gameArray["1"] == gameArray["4"] && gameArray["4"] == gameArray["7"] && gameArray["7"] == markerOfPlayerTwo.marker
            || gameArray["0"] == gameArray["4"] && gameArray["4"] == gameArray["8"] && gameArray["8"] == markerOfPlayerTwo.marker
            || gameArray["2"] == gameArray["4"] && gameArray["4"] == gameArray["6"] && gameArray["6"] == markerOfPlayerTwo.marker
        ){
            console.log("Player Two you win");
            winnerTrackerArray.push("playerTwoWins");
            console.log("winner Array", winnerTrackerArray);
            indexOfPlayerOneWin = winnerTrackerArray.indexOf("playerOneWins");
            indexOfPlayerTwoWin = winnerTrackerArray.indexOf("playerTwoWins");
            console.log("index One", indexOfPlayerOneWin);
            console.log("index Two", indexOfPlayerTwoWin);
        }
        else{
            console.log("you draw");
        }
    }  
})();
