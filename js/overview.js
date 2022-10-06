"use strict";

import * as common from "./common.js";

const userAnswers = common.USER_ANSWERS;

common.handleQuestions(function (questions) {
  const totalQuestionsNumber = Object.keys(questions).length;
  const statisticsNumberElement = document.querySelector(".statistics__number-overview");
  const statisticsPercentageElement = document.querySelector(".statistics__percent-overview");

  const totalScore = common.countCorrectAnswers();

  statisticsNumberElement.innerHTML = `Score: ${totalScore} of ${totalQuestionsNumber}`;
  statisticsPercentageElement.innerHTML = `${totalScore * totalQuestionsNumber}% Correct`;

  const questionsContainer = document.querySelector(".questions");
  for (let questionKey in questions) {
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("question");

    const questionNumberHeader = document.createElement("h3");
    questionNumberHeader.innerHTML = `Question ${+questionKey + 1} of ${totalQuestionsNumber}`;
    questionNumberHeader.classList.add("question__number");
    const questionTextElement = document.createElement("p");
    questionTextElement.innerHTML = `${questions[questionKey].question}`;
    questionTextElement.classList.add("question__text");
    questionContainer.append(questionNumberHeader, questionTextElement);

    const correctAnswerIndex = questions[questionKey].correctAnswer;
    const userAnswerIndex = userAnswers[questionKey];
    const questionOptionsContainer = document.createElement("question__answers");
    for (let i = 0; i < questions[questionKey].answers.length; i++) {
      const answerOption = questions[questionKey].answers[i];
      const questionAnswerDiv = document.createElement("div");
      questionAnswerDiv.classList.add("question__answer-overview");
      questionAnswerDiv.innerHTML = `${answerOption}`;
      questionOptionsContainer.append(questionAnswerDiv);
    }

    hilightAnswers(questionOptionsContainer, correctAnswerIndex, userAnswerIndex);

    const questionSeparator = document.createElement("hr");
    questionSeparator.classList.add("qustion__separator");

    questionContainer.append(questionOptionsContainer);
    questionsContainer.append(questionContainer);
    questionsContainer.append(questionSeparator);
  }
});

function hilightAnswers(questionOptionsContainer, correctAnswerIndex, userAnswerIndex) {
  const correctAnswer = questionOptionsContainer.children[correctAnswerIndex];
  // hilight correct and user answers if both are the same with correct-color
  if (correctAnswerIndex === userAnswerIndex) {
    const yourAnswerComment = createCommentElement("Your answer");
    const correctIcon = document.createElement("i");
    correctIcon.classList.add("question__mark", "question__mark-correct",
      "fa-solid", "fa-check");
    correctAnswer.classList.add("question--correct");
    correctAnswer.prepend(correctIcon);
    correctAnswer.append(yourAnswerComment);
  }
  // if no answer was choosen, hilight correct answer with selected-color
  else if (userAnswerIndex === -1) {
    const correctAnswerComment = createCommentElement("Correct answer");
    correctAnswer.classList.add("question--selected");
    correctAnswer.append(correctAnswerComment);
  }
  // if user answer and correct answer differs, hiligh user with wrong-color
  // and correct with selected-color
  else {
    const userAnswer = questionOptionsContainer.children[userAnswerIndex];
    const yourAnswerComment = createCommentElement("Your answer");
    const wrongIcon = document.createElement("i");
    wrongIcon.classList.add("question__mark", "question__mark-wrong",
      "fa-solid", "fa-xmark");
    userAnswer.classList.add("question--wrong");
    userAnswer.prepend(wrongIcon);
    userAnswer.append(yourAnswerComment);
    const correctAnswerComment = createCommentElement("Correct answer");
    correctAnswer.classList.add("question--selected");
    correctAnswer.append(correctAnswerComment);
  }

}

function createCommentElement(text) {
  const answerComment = document.createElement("p");
  answerComment.innerHTML = text;
  answerComment.classList.add("question__answer-comment");
  return answerComment;
}