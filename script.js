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
            if (!squareTile.classList.contains("clicked")) {
                if (Math.random() < bombsAmount / tilesAmounts) {
                    isPlaying = false;
                    playButton.disabled = false;
                    cashOutButton.disabled = true;
                    console.log("LOSE");
                    squareTile.innerHTML = `<img src="bombedit.png" alt="" srcset="">`;

                } else {
                    console.log("WIN");
                    squareTile.innerHTML = `<img src="diamondedit.png" alt="">`;
                }
                squareTile.classList.add("clicked");
            } else {
                console.log("ALREADY CLICKED");
            }
        } else {
            console.log("Press Play Button to Start");
        }
    });
});

playButton.addEventListener("click", () => {
    console.log("Play Button clicked");
    if (betAmount.value < 0 || betAmount.value == "") {
        console.log("Invalid Bet");
    } else {
        playButton.disabled = true;
        cashOutButton.disabled = false;
        squareTiles.forEach((squareTile) => {
            squareTile.classList.remove("clicked");
            squareTile.textContent = "";
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
    });
});
