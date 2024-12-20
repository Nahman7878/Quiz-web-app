const questions = [
    {
        question: "Which of the following is an object oriented programing language?",
        answers: [
            { text: "Python", correct: false},
            { text: "C#", correct: false},
            { text: "C++", correct: true},
            { text: "all of the above", correct: false},
        ]
    },
    {
        question: "Which programing language is the most popular and widely used?",
        answers: [
            { text: "Java", correct: false},
            { text: "Python", correct: true},
            { text: "C++", correct: false},
            { text: "Javascript", correct: false},
        ]
    },
    {
        question: "Which programing language is the hardest to learn?",
        answers: [
            { text: "Java", correct: false},
            { text: "C#", correct: false},
            { text: "C++", correct: true},
            { text: "Python", correct: false},
        ]
    },
    {
        question: "When are ID selectors used?",
        answers: [
            { text: "when the style is being applied to one HTML element.", correct: true},
            { text: "they're never used.", correct: false},
            { text: "when the style is being applied to multiple HTML elements.", correct: false},
            { text: "all of the above", correct: false},
        ]
    },
    {
        question: "One of the following is not a property of an algorithm",
        answers: [
            { text: "Efficency", correct: false},
            { text: "Finiteness", correct: false},
            { text: "Perciseness", correct: true},
            { text: "Sequence", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        } 
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
