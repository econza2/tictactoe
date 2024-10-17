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

 


function fillGameboard () {
    const {showEmptyBoard} = createGameBoard();

    let gameArray = showEmptyBoard();
    

    const body = document.querySelector("body");
    const playingGrid = document.createElement("div");
    playingGrid.classList.add("playing-grid");


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



            if (filledCounter == 9){
                if(indexOfPlayerOneWin == 0){
                    alert(`${markerOfPlayerOne.name} wins`);
                    alert("Game Over");
                }
                else if(indexOfPlayerTwoWin == 0){
                    alert(`${markerOfPlayerTwo.name} wins`);
                    alert("Game Over");
                }
                else if (indexOfPlayerOneWin == indexOfPlayerTwoWin){
                    alert("You Draw");
                    alert("Game Over");
                }
                else {
                    alert("troubleshoot");
                }
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
}



function populateDOM () {
    const body = document.querySelector("body");
    const playingGrid = document.createElement("div");
    playingGrid.classList.add("playing-grid");


    for(let i = 0; i < 9; i++){
        const divCell = document.createElement("div");
        divCell.classList.add(`${i}`);
        divCell.classList.add("div-cell");
        divCell.style.borderStyle = "solid";
        divCell.style.borderColor = "red";
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
    let markerArray = [];
    divCellTwo.forEach((item, index) => {
        item.addEventListener("click", () => {
            

            
            if (count % 2 == 0 && item.textContent == "" && count < 9){
                item.textContent = markerOfPlayerOne.marker;
                markerArray[index] = item.textContent;
                count++; 
            }
            else if (count % 2 == 1 && item.textContent == "" && count < 9){
                item.textContent = markerOfPlayerTwo.marker;
                markerArray[index] = item.textContent;
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



            console.log("count", count);
            console.log("index",index)
            console.log(markerArray);


            function checkFirstPlayerWin () {
                if(markerArray.filter(Boolean).length == 9){
                    if(markerArray[0] == markerArray[1] && markerArray[1] == markerArray[2] && markerArray[2] == markerOfPlayerOne.marker){
                            alert(`${markerOfPlayerOne.name} you win 102`);
                            return 1;
                        }
                    else if (markerArray[0] == markerArray[3] && markerArray[3] == markerArray[6] && markerArray[6] == markerOfPlayerOne.marker){
                            alert(`${markerOfPlayerOne.name} you win 036`);
                            return 1;
                        }
                    else if(markerArray[2] == markerArray[5] && markerArray[5] == markerArray[8] && markerArray[8] == markerOfPlayerOne.marker){
                            alert(`${markerOfPlayerOne.name} you win 258`);
                            return 1;
                        }
                    else if (markerArray[6] == markerArray[7] && markerArray[7] == markerArray[8] && markerArray[8] == markerOfPlayerOne.marker){
                            alert(`${markerOfPlayerOne.name} you win 678`);
                            return 1;
                        }
                    else if (markerArray[3] == markerArray[4] && markerArray[4] == markerArray[5] && markerArray[5] == markerOfPlayerOne.marker){
                            alert(`${markerOfPlayerOne.name} you win 355`);
                            return 1;
                        }
                    else if (markerArray[1] == markerArray[4] && markerArray[4] == markerArray[7] && markerArray[7] == markerOfPlayerOne.marker){
                            alert(`${markerOfPlayerOne.name} you win 147`);
                            return 1;
                        }
                    else if (markerArray[0] == markerArray[4] && markerArray[4] == markerArray[8] && markerArray[8] == markerOfPlayerOne.marker){
                            alert(`${markerOfPlayerOne.name} you win 048`);
                            return 1;
                        }
                    else if (markerArray[2] == markerArray[4] && markerArray[4] == markerArray[6] && markerArray[6] == markerOfPlayerOne.marker){
                            alert(`${markerOfPlayerOne.name} you win 246`);
                            return 1;
                        }
                    else {
                        return 0;
                    }
                }
            }


            function checkSecondPlayerWin () {
                if(markerArray.filter(Boolean).length == 9){
                    if(markerArray[0] == markerArray[1] && markerArray[1] == markerArray[2] && markerArray[2] == markerOfPlayerTwo.marker){
                            alert(`${markerOfPlayerTwo.name} you win 102`);
                            return 2;
                        }
                    else if (markerArray[0] == markerArray[3] && markerArray[3] == markerArray[6] && markerArray[6] == markerOfPlayerTwo.marker){
                            alert(`${markerOfPlayerTwo.name} you win 036`);
                            return 2;
                        }
                    else if(markerArray[2] == markerArray[5] && markerArray[5] == markerArray[8] && markerArray[8] == markerOfPlayerTwo.marker){
                            alert(`${markerOfPlayerTwo.name} you win 258`);
                            return 2;
                        }
                    else if (markerArray[6] == markerArray[7] && markerArray[7] == markerArray[8] && markerArray[8] == markerOfPlayerTwo.marker){
                            alert(`${markerOfPlayerTwo.name} you win 678`);
                            return 2;
                        }
                    else if (markerArray[3] == markerArray[4] && markerArray[4] == markerArray[5] && markerArray[5] == markerOfPlayerTwo.marker){
                            alert(`${markerOfPlayerTwo.name} you win 355`);
                            return 2;
                        }
                    else if (markerArray[1] == markerArray[4] && markerArray[4] == markerArray[7] && markerArray[7] == markerOfPlayerTwo.marker){
                            alert(`${markerOfPlayerTwo.name} you win 147`);
                            return 2;
                        }
                    else if (markerArray[0] == markerArray[4] && markerArray[4] == markerArray[8] && markerArray[8] == markerOfPlayerTwo.marker){
                            alert(`${markerOfPlayerTwo.name} you win 048`);
                            return 2;
                        }
                    else if (markerArray[2] == markerArray[4] && markerArray[4] == markerArray[6] && markerArray[6] == markerOfPlayerTwo.marker){
                            alert(`${markerOfPlayerTwo.name} you win 246`);
                            return 2;
                        }
                    else{
                        return 0;        
                    }
                }
            }



            let first = checkFirstPlayerWin();
            let second = checkSecondPlayerWin();


            console.log("first", first);
            console.log("second", second);
        });
    });  
}


