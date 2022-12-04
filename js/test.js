/* Start dealing with checked answers system and navigate through questions */
// Define DOM
const choices = document.querySelectorAll(".choice");
const inputs = document.querySelectorAll(".choice > input");
const navBtns = document.querySelectorAll(".nav-list > li > a");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// first nav btn is auto selected...
navBtns[0].classList.add("selected");

// Functions
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
    });
  });
}
/* End dealing with checked answers system and navigate through questions */

/* Start dealing with starting the test */
// Define DOM
const startBtn = document.querySelector(".startBtn");
const testPar = document.querySelector(".test-par");
const testNav = document.querySelector(".test-nav");
const testQ = document.querySelector(".test-questions");
const submitBtn = document.querySelector(".submit-btn");
const testRemain = document.querySelector(".test-remained");

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
    }, 700);
  });
}
/* End dealing with starting the test */
