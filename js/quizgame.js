const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is the most expensive weapon in CS:GO?",
        choice1: "Scar-20/G3SG1",
        choice2: "M4A1",
        choice3: "AWP",
        choice4: "R8 Revolver",
        answer: 1,
    },
    {
        question: "What does IWHBYD stand for on the skull in the Halo series?",
        choice1: "I Wanna Have Babies You Down",
        choice2: "I Would Hate Being Your Driver",
        choice3: "I Would Have Been Your Daddy",
        choice4: "I Would Have Bought Your Dog",
        answer: 3,
    },
    {
        question: "Which water-type Pokemon starter was introduced in the 4th generation of the series?",
        choice1: "Totodile",
        choice2: "Mudkip",
        choice3: "Totodile",
        choice4: "Piplup",
        answer: 4,
    },
    {
        question: "In the original Spyro game who is the first villain?",
        choice1: "Ripto",
        choice2: "Gnasty Gnorc",
        choice3: "Sorceress",
        choice4: "Cynder",
        answer: 2,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('quizend.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()