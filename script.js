// script.js

// Timer functions
function startTimer(timerName, duration) {
    const endTime = Date.now() + duration * 1000;
    localStorage.setItem(timerName, endTime);
}

function getTimeRemaining(timerName) {
    const endTime = localStorage.getItem(timerName);
    if (!endTime) return 0;
    return Math.max(0, Math.floor((endTime - Date.now()) / 1000));
}

function displayTimer(timerName, nextPuzzle) {
    const timeRemaining = getTimeRemaining(timerName);
    if (timeRemaining > 0) {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        document.getElementById('timer').innerText = `Next puzzle unlocks in ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        setTimeout(() => displayTimer(timerName, nextPuzzle), 1000);
    } else {
        window.location.href = `puzzle${nextPuzzle}.html`;
    }
}

// Puzzle functions
function checkAnswer(puzzleNumber) {
    const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
    let correctAnswer = '';

    switch (puzzleNumber) {
        case 1:
            correctAnswer = 'jingle bell';
            break;
        case 2:
            correctAnswer = 'frost';
            break;
        case 3:
            correctAnswer = '13';
            break;
        case 4:
            correctAnswer = 'Tamagotchi'; 
            break;
        case 5:
            correctAnswer = 'holiday';
            break;
        case 6:
            correctAnswer = 'treasure';
            break;
        default:
            break;
    }

    if (userAnswer === correctAnswer) {
        // Save progress and start timer
        localStorage.setItem(`puzzle${puzzleNumber}Solved`, 'true');
        if (puzzleNumber < 6) {
            startTimer(`timer${puzzleNumber}`, 5); // 10 minutes in seconds
            window.location.href = `wait.html?puzzle=${puzzleNumber + 1}`;
        } else {
            window.location.href = 'congratulations.html';
        }
    } else {
        document.getElementById('feedback').innerText = 'Incorrect, try again!';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    const puzzleMatch = page.match(/puzzle(\d).html/);

    if (puzzleMatch) {
        const puzzleNumber = parseInt(puzzleMatch[1], 10);
        if (localStorage.getItem(`puzzle${puzzleNumber}Solved`) === 'true') {
            if (puzzleNumber < 6) {
                window.location.href = `wait.html?puzzle=${puzzleNumber + 1}`;
            } else {
                window.location.href = 'congratulations.html';
            }
        }
    }
});
