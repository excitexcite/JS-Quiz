"use strict";

export const USER_ANSWERS_KEY = "userAnswers";
export const CURRENT_QUESTION_KEY = "currentQuestion";
export const USER_ANSWERS = JSON.parse(localStorage.getItem(USER_ANSWERS_KEY)) || {};
// export const RESULT_PATH = "../html/result.html";
export const RESULT_PATH = "result.html";
export const INDEX_PATH = "index.html";
export const OVERVIEW_PATH = "overview.html";
let questions;

export function handleQuestions(handler) {
  fetch("../questions.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      questions = data;
      handler(data);
    });
}

export function countCorrectAnswers() {
  let totalScore = 0;
  for (let answerKey in USER_ANSWERS) {
    const correctAnswerIndex = questions[answerKey].correctAnswer;
    const userAnswerIndex = USER_ANSWERS[answerKey];
    if (correctAnswerIndex === userAnswerIndex) {
      totalScore++;
    }
  }
  return totalScore;
}


