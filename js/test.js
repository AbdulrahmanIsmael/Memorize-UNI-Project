//TODO-Start: dealing with checked answers system and navigate through questions
// Define DOM
const choices = document.querySelectorAll(".choice");
const inputs = document.querySelectorAll(".choice > input");
const navBtns = document.querySelectorAll(".nav-list > li > a");
const prevBtn = document.querySelector("#prev > .btn");
const nextBtn = document.querySelector("#next > .btn");

// *first nav btn is auto selected...
navBtns[0].classList.add("selected");

// Function
checkChoice();
function checkChoice() {
  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("choice") ||
        e.target.parentElement.classList.contains("choice")
      ) {
        inputs.forEach((input) => {
          if (
            input.getAttribute("data-choice") ===
            e.target.getAttribute("data-choice")
          )
            input.checked = true;
        });
      }
    });
  });
}

select();
function select() {
  navBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.innerText === "1") {
        prevBtn.classList.add("disabled-btn");
        nextBtn.classList.remove("disabled-btn");
      } else if (e.target.innerText === "10") {
        nextBtn.classList.add("disabled-btn");
        prevBtn.classList.remove("disabled-btn");
      } else {
        prevBtn.classList.remove("disabled-btn");
        nextBtn.classList.remove("disabled-btn");
      }

      navBtns.forEach((e) => {
        e.classList.remove("selected");
      });

      btn.classList.add("selected");

      fetchQuestion(e.target.innerText);
    });
  });
}

async function fetchQuestion(comp) {
  const fetchData = await fetch("../json/test.json");

  try {
    const data = await fetchData.json();
    data.forEach((question) => {
      if (question.id == comp) {
        addQuestion(question);
      }
    });
  } catch (Error) {
    console.log(Error);
  }
}

function addQuestion(obj) {
  const questionHeading = document.querySelector(".questions-heading");
  const option1 = document.getElementById("choice1");
  const option2 = document.getElementById("choice2");
  const option3 = document.getElementById("choice3");
  const option4 = document.getElementById("choice4");

  questionHeading.innerHTML = obj.question;
  option1.innerHTML = obj.option1;
  option2.innerHTML = obj.option2;
  option3.innerHTML = obj.option3;
  option4.innerHTML = obj.option4;
}
//TODO-End: dealing with checked answers system and navigate through questions

//TODO-Start: dealing with starting the test
// Define DOM
const startBtn = document.querySelector(".startBtn");
const testPar = document.querySelector(".test-par");
const testNav = document.querySelector(".test-nav");
const testQ = document.querySelector(".test-questions");
const submitBtn = document.querySelector(".submit-btn");
const testRemain = document.querySelector(".test-remained");

// Function
startTest();
function startTest() {
  startBtn.addEventListener("click", () => {
    submitBtn.classList.remove("disabled-btn");
    nextBtn.classList.remove("disabled-btn");
    setTimeout(() => {
      testPar.classList.add("start-par");
      setTimeout(() => {
        testPar.style.display = "none";
      }, 200);
    }, 200);

    setTimeout(() => {
      testQ.classList.add("start-q");
      setTimeout(() => {
        testQ.style.transform = "translateX(0)";
        testNav.classList.add("start-nav");
      }, 100);

      setTimeout(() => {
        setTimer();
      }, 1000);
    }, 700);
  });
}
//TODO-End: dealing with starting the test

//TODO-Start: Function to set the timer
// Define DOM
const timer = document.querySelector(".time-remained");
const time = document.querySelector(".time");
const minutes1 = document.querySelector(".min1");
const minutes2 = document.querySelector(".min2");
const seconds1 = document.querySelector(".sec1");
const seconds2 = document.querySelector(".sec2");

// Function
function setTimer() {
  minutes1.innerText = "5";
  minutes2.innerText = "9";
  seconds1.innerText = "5";
  seconds2.innerText = "9";

  const reduceSec = setInterval(() => {
    // minRedux();
    seconds2.innerText = +seconds2.innerText - 1;
    if (seconds2.innerText === "-1") {
      seconds2.innerText = "9";
      seconds1.innerText = +seconds1.innerText - 1;
    }

    if (seconds1.innerText + seconds2.innerText === "-19") {
      minutes2.innerText = +minutes2.innerText - 1;
      seconds1.innerText = "5";
      seconds2.innerText = "9";
      if (minutes2.innerText === "-1") {
        minutes2.innerText = "9";
        minutes1.innerText = +minutes1.innerText - 1;
      }
    }
    if (minutes1.innerText + minutes2.innerText === "00") {
      seconds1.innerText = "0";
      seconds2.innerText = "0";
      clearInterval(reduceSec);
    }
  }, 1000);
}

//TODO-End: Function to set the timer

//TODO-Start: next / prev btns
// Define DOM
// Functions
nextQuestionBtn();

function nextQuestionBtn() {
  nextBtn.addEventListener("click", () => {
    for (let i = 0; i < navBtns.length; i++) {
      if (nextBtn.classList.contains("disabled-btn") === false) {
        if (navBtns[i].classList.contains("selected")) {
          navBtns[i].classList.remove("selected");
          navBtns[i + 1].classList.add("selected");
          navBtns.forEach((e) => {
            if (e.classList.contains("selected")) {
              if (e.innerText === "1") {
                prevBtn.classList.add("disabled-btn");
                nextBtn.classList.remove("disabled-btn");
              } else if (e.innerText === "10") {
                nextBtn.classList.add("disabled-btn");
                prevBtn.classList.remove("disabled-btn");
              } else {
                prevBtn.classList.remove("disabled-btn");
                nextBtn.classList.remove("disabled-btn");
              }
            }
          });
          fetchQuestion(navBtns[i + 1].innerText);
          break;
        }
      }
    }
  });
}

prevQuestionBtn();

function prevQuestionBtn() {
  prevBtn.addEventListener("click", () => {
    for (let i = 0; i < navBtns.length; i++) {
      if (prevBtn.classList.contains("disabled-btn") === false) {
        if (navBtns[i].classList.contains("selected")) {
          navBtns[i].classList.remove("selected");
          navBtns[i - 1].classList.add("selected");
          navBtns.forEach((e) => {
            if (e.classList.contains("selected")) {
              if (e.innerText === "1") {
                prevBtn.classList.add("disabled-btn");
                nextBtn.classList.remove("disabled-btn");
              } else if (e.innerText === "10") {
                nextBtn.classList.add("disabled-btn");
                prevBtn.classList.remove("disabled-btn");
              } else {
                prevBtn.classList.remove("disabled-btn");
                nextBtn.classList.remove("disabled-btn");
              }
            }
          });
          fetchQuestion(navBtns[i - 1].innerText);
          break;
        }
      }
    }
  });
}
//TODO-End: next / prev btns
