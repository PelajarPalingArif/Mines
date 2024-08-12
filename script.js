let squareTiles = document.querySelectorAll(".box");
let playButton = document.querySelector("#play-button");
let cashOutButton = document.querySelector("#cashOut-button");
let riskSelect = document.querySelector("#risk");
let betInput = document.querySelector("#amountInput");
let betMoney;
let accountMoney = document.querySelector("#money");
let moneyTrack = 0;
let probHappening = 1;
let cashOut = 0;

let edge = 0.13;
let winCount = 0;

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
            let currentWinChance = (1 - bombsAmount / tilesAmounts);   
            console.log(`WIN CHANCE : ${currentWinChance}, LOSE CHANCE : ${1 - currentWinChance} , TA : ${tilesAmounts}, BA : ${bombsAmount} `);
            squareTile.style["backgroundColor"] = "rgb(87, 87, 87)";
            if (!squareTile.classList.contains("clicked")) {
                squareTile.classList.add("clicked");
                if (Math.random() < bombsAmount / tilesAmounts) {
                    isPlaying = false;
                    playButton.disabled = false;
                    cashOutButton.disabled = true;
                    cashOutButton.textContent = "Cash Out";
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
                    
                    winCount++;

                    probHappening = probHappening * currentWinChance;
                    cashOut = (1 / probHappening) - (edge * winCount);
                    console.log("Probability Happening : " + probHappening);
                    console.log("Cashout : " + cashOut);
                    cashOutButton.textContent = (cashOut * betMoney).toFixed(2);
                    
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
    probHappening = 1;
    winCount = 0;
    cashOut = 0;
    console.log("TA : " + tilesAmounts + " BA : " + bombsAmount);
    if (betInput.value < 0 || betInput.value == "") {
        console.log("Invalid Bet");
    } else {
        betMoney = betInput.value;
        console.log("AM : " + parseFloat(accountMoney.textContent) + " BM : " + parseFloat(betMoney));    
        moneyTrack = (moneyTrack - parseFloat(betMoney));
        accountMoney.textContent = moneyTrack;
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
    
    
    moneyTrack = parseFloat(moneyTrack) + (cashOut * betMoney);
    console.log("Money Track 1 : " + moneyTrack);
    accountMoney.textContent = moneyTrack.toFixed(2).toLocaleString('en');
    isPlaying = false;
    cashOutButton.disabled = true;
    playButton.disabled = false;
    cashOutButton.textContent = "Cash Out";
    squareTiles.forEach((squareTile) => {
        squareTile.classList.remove("clicked");
        squareTile.textContent = "";
        squareTile.style["backgroundColor"] = "grey";
        squareTile.style["outline"] = "none";

    });
});
