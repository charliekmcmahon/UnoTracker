var users = [];
var currentPlayer = 0;
var maxScore = 0;
var roundNumber = 1;
var gameOver = false;

function setupPlayers() {
    var numberOfPlayers = parseInt(document.getElementById("numberOfPlayers").value);
    var inputSection = document.getElementById("inputSection");
    inputSection.classList.add("animate__animated", "animate__fadeOut");

    setTimeout(function() {
    inputSection.style.display = "none";
    var gameSection = document.getElementById("gameSection");
    gameSection.style.display = "block";
    gameSection.classList.add("animate__animated", "animate__fadeIn");
    }, 500);

    for (var i = 0; i < numberOfPlayers; i++) {
    var playerName = prompt("Enter the name of player " + (i + 1) + ":");
    users.push({ name: playerName, scores: [] });
    }

    maxScore = parseInt(prompt("Enter the maximum score:"));

    updateUI();
}

function updateUI() {
    document.getElementById("roundNumber").textContent = "Round: " + roundNumber;
    document.getElementById("currentPlayer").textContent = "Current Player: " + users[currentPlayer].name;

    var playerScoresList = document.getElementById("playerScores");
    playerScoresList.innerHTML = "";
    for (var i = 0; i < users.length; i++) {
    var player = users[i];
    var totalScore = player.scores.reduce(function(acc, cur) {
        return acc + cur;
    }, 0);
    var listItem = document.createElement("li");
    listItem.textContent = player.name + " (Total Score: " + totalScore + "): " + player.scores.join(", ");
    playerScoresList.appendChild(listItem);
    }

    if (gameOver) {
    document.getElementById("highestScore").textContent = "Highest Score: " + calculateHighestScore();
    document.getElementById("averageScore").textContent = "Average Score: " + calculateAverageScore();
    displayLeaderboard();
    }
}

function nextRound() {
    var scoreInput = document.getElementById("currentScore");
    var score = parseInt(scoreInput.value);

    users[currentPlayer].scores.push(score);
    scoreInput.value = "";

    currentPlayer = (currentPlayer + 1) % users.length;
    if (currentPlayer === 0) {
    roundNumber++;
    if (checkGameOver()) {
        endGame();
        return;
    }
    }

    updateUI();
}

function checkGameOver() {
    var highestScore = calculateHighestScore();
    return highestScore >= maxScore;
}

function endGame() {
    gameOver = true;
    updateUI();
    document.getElementById("gameSection").style.display = "none";
    document.getElementById("gameOverSection").style.display = "block";
    document.getElementById("gameOverSection").classList.add("animate__fadeIn");
}

function calculateHighestScore() {
    var highestScore = -Infinity;
    for (var i = 0; i < users.length; i++) {
    var playerTotalScore = users[i].scores.reduce(function(acc, cur) {
        return acc + cur;
    }, 0);
    if (playerTotalScore > highestScore) {
        highestScore = playerTotalScore;
    }
    }
    return highestScore;
}

function calculateAverageScore() {
    var totalScores = 0;
    var totalRounds = 0;
    for (var i = 0; i < users.length; i++) {
    var playerScores = users[i].scores;
    totalScores += playerScores.reduce(function (acc, cur) {
        return acc + cur;
    }, 0);
    totalRounds += playerScores.length;
    }
    return totalScores / totalRounds;
}

function displayLeaderboard() {
    var leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "";

    var sortedUsers = users.slice().sort(function(a, b) {
    var totalScoreA = a.scores.reduce(function(acc, cur) {
        return acc + cur;
    }, 0);
    var totalScoreB = b.scores.reduce(function(acc, cur) {
        return acc + cur;
    }, 0);
    return totalScoreA - totalScoreB;
    });

    for (var i = 0; i < sortedUsers.length; i++) {
    var player = sortedUsers[i];
    var listItem = document.createElement("li");
    listItem.textContent = player.name + " - Total Score: " + player.scores.reduce(function(acc, cur) {
        return acc + cur;
    }, 0);
    leaderboard.appendChild(listItem);
    }
}

function showWinnerModal() {
    var winner = getWinner();
    var modal = document.getElementById("winnerModal");
    var winnerName = document.getElementById("winnerName");
    var winnerScore = document.getElementById("winnerScore");
    var modalLeaderboard = document.getElementById("modalLeaderboard");

    winnerName.textContent = "Winner: " + winner.name;
    winnerScore.textContent = "Score: " + winner.scores.reduce(function(acc, cur) {
    return acc + cur;
    }, 0);

    var sortedUsers = users.slice().sort(function(a, b) {
    var totalScoreA = a.scores.reduce(function(acc, cur) {
        return acc + cur;
    }, 0);
    var totalScoreB = b.scores.reduce(function(acc, cur) {
        return acc + cur;
    }, 0);
    return totalScoreA - totalScoreB;
    });

    modalLeaderboard.innerHTML = "";
    for (var i = 0; i < sortedUsers.length; i++) {
    var player = sortedUsers[i];
    var listItem = document.createElement("li");
    listItem.textContent = player.name + " - Total Score: " + player.scores.reduce(function(acc, cur) {
        return acc + cur;
    }, 0);
    modalLeaderboard.appendChild(listItem);
    }

    modal.style.display = "block";
}

function closeWinnerModal() {
    var modal = document.getElementById("winnerModal");
    modal.style.display = "none";
}

function getWinner() {
    var winner = users[0];
    for (var i = 1; i < users.length; i++) {
    var currentPlayerScores = users[i].scores;
    var winnerScores = winner.scores;
    var currentPlayerTotalScore = currentPlayerScores.reduce(function(acc, cur) {
        return acc + cur;
    }, 0);
    var winnerTotalScore = winnerScores.reduce(function(acc, cur) {
        return acc + cur;
    }, 0);
    if (currentPlayerTotalScore < winnerTotalScore) {
        winner = users[i];
    }
    }
    return winner;
}

function resetGame() {
    users = [];
    currentPlayer = 0;
    maxScore = 0;
    roundNumber = 1;
    gameOver = false;

    var inputSection = document.getElementById("inputSection");
    inputSection.style.display = "block";
    inputSection.classList.remove("animate__fadeOut");

    var gameSection = document.getElementById("gameSection");
    gameSection.style.display = "none";
    gameSection.classList.remove("animate__fadeIn");

    var gameOverSection = document.getElementById("gameOverSection");
    gameOverSection.style.display = "none";
    gameOverSection.classList.remove("animate__fadeIn");
}