
const question = [
    {
        question : "which is the largest animal in the world?",
        answer : [
            { text : "Shark", correct : false},
            { text : "Blue whale", correct : true},
            { text : "Elephant", correct : false},
            { text : "Giraffe", correct : false},
        ]
    },
    {
        question : "which is the samllest country in this world?",
        answer : [
            { text : "Vatican city", correct : true},
            { text : "Bhutan", correct : false},
            { text : "Nepal", correct : false},
            { text : "Shri lanka", correct : false},
        ]
    },
    {
        question : "which is the largest desert in the world?",
        answer : [
            { text : "Kalahari", correct : false},
            { text : "Gobi", correct : false},
            { text : "Sahara", correct : true},
            { text : "Antarctica", correct : false},
        ]
    },
    {
        question : "which is the smallest continent in the world?",
        answer : [
            { text : "Asia", correct : false},
            { text : "Africa", correct : false},
            { text : "Arctic", correct : false},
            { text : "Australia", correct : true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-button");
const nextBtn = document.getElementById("next-btn");

let currentQuesIndex = 0;
let score = 0;

function srartQuiz(){
    currentQuesIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQues = question[currentQuesIndex];
    let questionNo = currentQuesIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQues.question;

    currentQues.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored  ${score} out of ${question.length}`;
        nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuesIndex++;
    if(currentQuesIndex < question.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if(currentQuesIndex < question.length){
        handleNextBtn();
    }
    else{
        srartQuiz();
    }
})

srartQuiz();

