"use strict";

import * as common from "./common.js";



common.handleQuestions(function (questions) {
  const statisticsNumber = document.querySelector(".statistics__number");
  const statisticsPercentage = document.querySelector(".statistics__percent");
  // const statisticsText = document.querySelector(".statistics__text");
  // const timeSpent = document.querySelector(".time__number");

  const totalQuestionsNumber = Object.keys(questions).length;
  const totalScore = common.countCorrectAnswers();

  statisticsNumber.innerHTML = `${totalScore} of ${totalQuestionsNumber}`;
  statisticsPercentage.innerHTML = `${totalScore * 100 / totalQuestionsNumber}%`;
});

const checkResultButton = document.querySelector(".actions__check");
checkResultButton.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = common.OVERVIEW_PATH;
});

const tryAgainButton = document.querySelector(".action__again");
tryAgainButton.addEventListener("click", function () {
  localStorage.removeItem(common.USER_ANSWERS_KEY);
  localStorage.removeItem(common.CURRENT_QUESTION_KEY);
  window.location.href = common.INDEX_PATH;
});