let currentQuestionIndex = 0;
let score = 0;
let questions = [];

fetch('/api/questions')
    .then(response => response.json())
    .then(data => {
        questions = data;
        loadQuestion();
    });

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(index);
        answersDiv.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestionIndex].correct) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    document.getElementById('quiz-container').innerHTML = `<h1>Your score: ${score}/${questions.length}</h1>`;
    submitScore(score);
}

function submitScore(userScore) {
    fetch('/api/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: 'User1', score: userScore })
    });
}

document.getElementById('next-button').onclick = () => {
    loadQuestion();
};