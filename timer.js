// timer.js

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

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const puzzleNumber = urlParams.get('puzzle');
    const previousPuzzle = puzzleNumber - 1;
    displayTimer(`timer${previousPuzzle}`, puzzleNumber);
});
