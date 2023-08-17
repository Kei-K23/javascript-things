const PARAGRAPHS = [
  "dance against the fading light.",
  "Amidst the bustling city, a lone figure sat on a park bench, lost in thought. The cacophony of urban life was a distant hum, and a gentle breeze rustled the leaves of nearby trees.",
  "In the heart of the enchanted forest, ancient trees whispered secrets to those who cared to listen. Sparkling streams wove through moss-covered rocks, creating a melody of nature's own.",
  "The laboratory hummed with the excitement of discovery as scientists diligently worked on their experiments. Beakers bubbled, and monitors displayed intricate patterns of data.",
  "On the open sea, the ship's sails billowed with wind, carrying its crew to new adventures. The waves danced beneath the vessel, reflecting the vibrant hues of the sky.",
];

const timeLeftEle = document.querySelector(".timeLeft b");
const mistakesEle = document.querySelector(".mistakes b");
const wpmEle = document.querySelector(".wpm b");
const cpmEle = document.querySelector(".cpm b");
const tryAgain = document.querySelector(".tryAgain");

// init global value
let maxTime = 60,
  timeLeft = maxTime,
  unSubscribeSetInterval,
  isTimingStart = false,
  currentParagraph,
  currentIndex = 0,
  totalCorrectChar = 0,
  isTyping = false,
  mistakes = 0,
  wpm,
  cpm;

function checkForKeyWord(keyWord) {
  if (
    keyWord === "Tab" ||
    keyWord === "CapsLock" ||
    keyWord === "Shift" ||
    keyWord === "Control" ||
    keyWord === "Alt" ||
    keyWord === "Enter" ||
    keyWord === "ContextMenu" ||
    keyWord === "Meta" ||
    keyWord === "Backspace"
  ) {
    return true;
  } else {
    return false;
  }
}

function displayText() {
  const textContainer = document.querySelector(".text-container p");
  const tmp_fragment = document.createDocumentFragment();
  const randomIndex = Math.floor(Math.random() * PARAGRAPHS.length); // random index
  currentParagraph = PARAGRAPHS[randomIndex]; // paragraph
  // add span letter element to textContainer
  currentParagraph.split("").map((cha) => {
    const span = document.createElement("span");
    span.innerText = cha;
    tmp_fragment.appendChild(span);
  });
  textContainer.innerHTML = "";
  textContainer.appendChild(tmp_fragment);
  // add active class to the fist letter
  const firstNode = textContainer.firstChild;
  firstNode.classList.add("active");
}

function duration() {
  unSubscribeSetInterval = setInterval(() => {
    if (timeLeft >= 0) {
      timeLeft--;
      timeLeftEle.innerText = timeLeft;

      let calculateWPM = Math.floor(
        (currentIndex - mistakes) / (maxTime - timeLeft)
      );

      console.log(calculateWPM);

      wpm =
        calculateWPM < 0 || !calculateWPM || calculateWPM === Infinity
          ? 0
          : calculateWPM;
      wpmEle.innerText = wpm;
    } else {
      clearInterval(unSubscribeSetInterval);
      timeLeft = maxTime;
    }
  }, 1000);
}

displayText();

document.addEventListener("keydown", (e) => {
  if (!isTimingStart && !isTyping) {
    duration();
    isTyping = true;
    isTimingStart = true;
  }
  if (checkForKeyWord(e.key)) {
    console.log("Ban");
  } else {
    const textContainer = document.querySelector(".text-container p");
    const array = currentParagraph.split("");
    const character = e.key;

    const prevActiveSpan = document.querySelector(
      ".text-container p span.active"
    );
    prevActiveSpan.classList.remove("active");
    const nextActiveSpan = prevActiveSpan.nextElementSibling;

    if (character === array[currentIndex]) {
      prevActiveSpan.classList.add("correct");
      totalCorrectChar++;
    } else {
      prevActiveSpan.classList.add("incorrect");
      mistakes++;
    }
    currentIndex++;
    console.log(currentIndex);

    let calculateWPM = Math.floor(
      (currentIndex - mistakes) / (maxTime - timeLeft)
    );
    console.log(calculateWPM);
    wpm =
      calculateWPM < 0 || !calculateWPM || calculateWPM === Infinity
        ? 0
        : calculateWPM;
    console.log(wpm);
    wpmEle.innerText = wpm;
    mistakesEle.innerText = mistakes;
    cpmEle.innerText = currentIndex - mistakes;
    if (nextActiveSpan === null) {
      console.log("finish");
      isTyping = false;
      isTimingStart = false;
      clearInterval(unSubscribeSetInterval);
      return;
    }
    nextActiveSpan.classList.add("active");
  }
});

function restartGame() {}
tryAgain.addEventListener("click");
