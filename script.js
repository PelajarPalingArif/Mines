let squareTiles = document.querySelectorAll(".box");
let playButton = document.querySelector("#play-button");
let cashOutButton = document.querySelector("#cashOut-button");
let riskSelect = document.querySelector("#risk");
let betAmount = document.querySelector("#amountInput");

let bombsAmount = 10;
let isPlaying = false;
let tilesAmounts = squareTiles.length;
riskSelect.addEventListener("change", () => {
    bombsAmount = riskSelect.value;
    console.log(bombsAmount);
});
squareTiles.forEach((squareTile) => {
    squareTile.addEventListener("click", () => {

        if (isPlaying) {
            console.log(`WIN CHANCE : ${Math.round((1 - bombsAmount / tilesAmounts) * 100, 2)}, LOSE CHANCE : ${Math.round(100 - (1 - bombsAmount / tilesAmounts) * 100, 2)} , TA : ${tilesAmounts}, BA : ${bombsAmount} `);
            squareTile.style["backgroundColor"] = "rgb(87, 87, 87)";
            if (!squareTile.classList.contains("clicked")) {
                squareTile.classList.add("clicked");
                if (Math.random() < bombsAmount / tilesAmounts) {
                    isPlaying = false;
                    playButton.disabled = false;
                    cashOutButton.disabled = true;
                    // LOSE
                    squareTile.innerHTML = `<img src="bombedit.png" alt="" srcset="">`;
                    // squareTile.style["outline"] = "3px solid red";
                    let remainingSquareTiles = document.querySelectorAll(".box:not(.clicked)");
                    let tempBombAmount = bombsAmount - 1;
                    let tempSquareTiles = remainingSquareTiles.length;
                    console.log(`Bomb Left : ${tempBombAmount}, Tiles Left : ${tempSquareTiles}`);
                    remainingSquareTiles.forEach((ele) => {
                        ele.style["background-color"] = "rgb(87, 87, 87)";
                        if (Math.random() < tempBombAmount / Math.max(tempSquareTiles, 1)) {
                            // ele.style["outline"] = "3px solid red";
                            ele.innerHTML = `<img src="bombedit.png" alt="">`;
                            tempBombAmount--;
                        }
                        else {
                            // ele.style["outline"] = "3px solid blue";
                            ele.innerHTML = `<img src="diamondedit.png" alt="">`;
                        }

                        tempSquareTiles--;

                    })
                } else {
                    // WIN
                    // squareTile.style["outline"] = "3px solid blue";
                    squareTile.innerHTML = `<img src="diamondedit.png" alt="">`;
                }
            } else {
                console.log("ALREADY CLICKED");
            }
            tilesAmounts--;
        } else {
            console.log("Press Play Button to Start");
        }
    });
});

playButton.addEventListener("click", () => {
    tilesAmounts = squareTiles.length;
    console.log("TA : " + tilesAmounts + " BA : " + bombsAmount);
    if (betAmount.value < 0 || betAmount.value == "") {
        console.log("Invalid Bet");
    } else {
        playButton.disabled = true;
        cashOutButton.disabled = false;
        squareTiles.forEach((squareTile) => {
            squareTile.classList.remove("clicked");
            squareTile.textContent = "";
            squareTile.style["backgroundColor"] = "grey";
        });
        isPlaying = true;
    }
});

cashOutButton.addEventListener("click", () => {
    console.log("Cashed Out");
    isPlaying = false;
    cashOutButton.disabled = true;
    playButton.disabled = false;
    squareTiles.forEach((squareTile) => {
        squareTile.classList.remove("clicked");
        squareTile.textContent = "";
        squareTile.style["backgroundColor"] = "grey";
        squareTile.style["outline"] = "none";

    });
});
