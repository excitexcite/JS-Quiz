"use strict";

import * as common from "./common.js";

const userAnswers = common.USER_ANSWERS;
let questionsObject;
let questionsNumber;

let currentQuestion = +localStorage.getItem("currentQuestion") || 0;

function storeAnswer() {
  const selectedAnswer = document.querySelector(".checklabel");
  let answerNumber;
  if (!selectedAnswer) {
    answerNumber = -1;
  } else {
    answerNumber = questionsObject[currentQuestion]
      .answers
      .indexOf(selectedAnswer.children[0].innerHTML);
  }
  userAnswers[currentQuestion] = answerNumber;
  localStorage.setItem(common.USER_ANSWERS_KEY, JSON.stringify(userAnswers));
}

common.handleQuestions(function (questions) {
  questionsObject = questions;
  questionsNumber = Object.keys(questions).length;
  console.log(questions);
  const currentQuestionHeader = document.querySelector(".question__number");
  currentQuestionHeader.innerHTML = `Question ${currentQuestion + 1} of ${questionsNumber}`;
  const questionText = document.querySelector(".question__text");
  questionText.innerHTML = questions[currentQuestion].question;
  const answers = document.querySelectorAll(".question__answer-text");

  for (let i = 0; i < 4; i++) {
    answers[i].innerHTML = questions[currentQuestion].answers[i];
  }
});

const nextButton = document.querySelector(".question__next-question");
nextButton.addEventListener("click", function (e) {
  if (currentQuestion === questionsNumber - 1) {
    e.preventDefault();
    storeAnswer();
    window.location.href = common.RESULT_PATH;
    return;
  }
  storeAnswer();
  currentQuestion++;
  localStorage.setItem(common.CURRENT_QUESTION_KEY, currentQuestion);
});

const answersForm = document.querySelector(".question__answers");
answersForm.addEventListener("click", function (e) {
  const answer = e.target.closest("label");

  if (!answer) return;

  document.querySelectorAll(".question__answer")
    .forEach(item => item.classList.remove("checklabel"));
  answer.classList.toggle("checklabel");
});
