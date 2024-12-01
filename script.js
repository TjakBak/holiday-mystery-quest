// script.js

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
            correctAnswer = '246'; // Adjust based on your image
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
            startTimer(`timer${puzzleNumber}`, 10 * 60); // 10 minutes in seconds
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
