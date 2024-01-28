//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const scoreText = document.getElementById("score-text");

const guessedLetterText = document.getElementById("guessedLetter");

const gameContainer = document.getElementById("canvasAndGuesses-container");
let speakButton = document.getElementById("speakbutton");
let score = 0;

// ============================ Options values for buttons========================================================
let options = {
  Days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  Months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  Numbers: [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
    "Hundred",
    "Thousand",
    "Million",
    "Billion",
  ],
  Colors: [
    "White",
    "Black",
    "Blue",
    "Red",
    "Brown",
    "Gray",
    "Orange",
    "Yellow",
    "Green",
    "Purple",
    "Pink",
    "Cyan",
    "Violet",
    "Magenta",
  ],
  Professions: [
    "Administrator",
    "architect",
    "Astronaut",
    "builder",
    "chef",
    "cook",
    "dentist",
    "doctor",
    "engineer",
    "electrician",
    "factory worker",
    "hairdresser",
    "flight attendant",
    "firefighter",
    "journalist",
    "lawyer",
    "manager",
    "model",
    "musician",
    "nurse",
    "pilot",
    "plumber",
    "police officer",
    "receptionist",
    "scientist",
    "soldier",
    "teacher",
    "vet",
    "waiter",
    "programmer",
    "janitor",
    "driver",
  ],
  Adjectives: [
    "Hungry",
    "tired",
    "angry",
    "happy",
    "sad",
    "thirsty",
    "bored",
    "sick",
    "late",
    "patient",
    "punctual",
    "relaxed",
    "confused",
    "energetic",
    "smart",
    "stupid",
    "rich",
    "poor",
    "old",
    "young",
    "old",
    "new",
    "empty",
    "full",
    "expensive",
    "cheap",
    "far",
    "near",
    "high",
    "low",
    "long",
    "short",
    "big",
    "small",
  ],
  Adjectives2: [
    "good",
    "bad",
    "fast",
    "slow",
    "hot",
    "cold",
    "beautiful",
    "fat",
    "slim",
    "dirty",
    "clean",
    "dangerous",
    "safe",
    "shy",
    "friendly",
    "wrong",
    "correct",
    "handsome",
    "ugly",
    "shy",
    "outgoing",
    "strong",
    "weak",
    "easy",
    "difficult",
    "first",
    "last",
  ],
  Verbs: [
    "Live",
    "sleep",
    "eat",
    "drink",
    "love",
    "write",
    "read",
    "play",
    "play",
    "sleep",
    "wake up",
    "see",
    "look",
    "watch",
    "walk",
    "run",
    "swim",
    "wait",
    "go",
    "jump",
    "dance",
    "hear",
    "talk",
    "wear",
    "listen",
    "teach",
    "study",
    "paint",
    "draw",
    "take",
    "give",
    "sell",
    "buy",
    "have",
    "want",
    "need",
    "help",
    "think",
    "do",
    "call",
    "phone",
    "meet",
    "work",
    "rest",
    "relax",
    "throw",
    "catch",
  ],
};
// ========================================================================================================================================================================

//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h2>SELECT CATEGORY</h2>`;
  let buttonCon = document.createElement("div");
  for (let category in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${category}')">${category}</button>`; //category
  }
  optionsContainer.appendChild(buttonCon);

  scoreText.innerHTML += `<h2>SCORE: ${score}</h2>`;
};

// ======================================================== Word Generator ========================================================
const generateWord = (category) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValue matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (
      button.innerText.trim().toLowerCase() === category.trim().toLowerCase()
    ) {
      button.classList.add("selected");
      //console.log(`Category: ${button.innerText}, Selected: ${button.classList.contains("selected")}`);
      console.log(`Clicked button: ${category}`);
    } else {
      button.classList.remove("selected");
      //console.log(`Category: ${button.innerText}, Selected: ${button.classList.contains("selected")}`);
      //console.log(`Clicked button: ${category}`);
    }

    button.disabled = true;
  });

  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[category];
  //choose random word
  chosenWord =
    optionArray[Math.floor(Math.random() * optionArray.length)].toUpperCase();

  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Display each element as span
  userInputSection.innerHTML = displayItem;

  // Show the "Speak" button
  speakButton.classList.remove("hide");
};

// ======================================================== GAME ========================================================
//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initially erase all content and hide letters
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  scoreText.innerHTML = "";
  //newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  resultText.innerHTML = "";
  canvas.style.backgroundColor = "transparent";

  // Add a class to the game container to hide its contents
  gameContainer.classList.add("game-over");

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number conversion to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clicked value, replace the matched dash with letter, or else - draw on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            winCount += 1;
            //if winCount equals word length
            if (winCount == charArray.length) {
              score++;
              scoreText.innerHTML = `<h2>SCORE: ${score}</h2>`;
              resultText.innerHTML = `<span class='win-msg'>CORRECT! </span><span>The word was <span>${chosenWord}</span></span>`;
              isListening = false;
              canvas.style.backgroundColor = "lightgreen";
              speakButton.classList.add("hide");
              //color canvas green
              //block all buttons
              //   blocker();
            }
          }
        });
      } else {
        //lose count
        count += 1;
        //for drawing man
        drawMan(count);
        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 6) {
          score--;
          scoreText.innerHTML = `<h2>SCORE:${score}</h2>`;
          resultText.innerHTML = `<span class='lose-msg'>WRONG! </span><span>The word was <span>${chosenWord}</span></span>`;
          isListening = false;
          canvas.style.backgroundColor = "red";
          speakButton.classList.add("hide");
          //color canvas red
          //   blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
      button.classList.add("used");
    });
    letterContainer.append(button);
  }

  displayOptions();
  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};

// ======================================================== Canvas ========================================================

const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "white";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 45, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 45, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

// -------------------------------- draw the man --------------------------------
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer();

// ======================================================== Speech Recognition ========================================================
const guessedLetters = new Set();
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

let isListening = false;

const startListening = () => {
  if (!isListening) {
    recognition.start();
    isListening = true;
  }
};

const roundToSingleLetter = (word) => {
  // Extract the last character to round it to a single letter
  return word.slice(-1);
};

let isFirstResult = true;
const handleRecognitionResult = (spokenWord) => {
  if (spokenWord.length === 1 && spokenWord.match(/[A-Z]/)) {
    console.log("Valid Guess:", spokenWord);
    // Update the user input section with the guessed letter
    updateGuessedLetter(spokenWord);
    guessedLetterText.innerHTML = `<p>${spokenWord}</p>`;
    speakButton.classList.add("hide");
    // Additional logic if needed
  } else {
    console.log("Invalid Guess:", spokenWord);
    guessedLetterText.innerHTML = `<p id="saidLetter">${spokenWord}</p>`;
    speakButton.classList.add("hide");
    alert("Please speak a single letter.");
    // Additional logic if needed
  }
};

recognition.onresult = (event) => {
  let interimTranscript = "";
  let finalTranscript = "";

  for (let i = event.resultIndex; i < event.results.length; ++i) {
    const transcript = event.results[i][0].transcript.trim().toUpperCase();
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript += transcript;
    }
  }
  if (isFirstResult) {
    isFirstResult = false;

    // Check if there's any interim transcript and use it for the first letter
    if (interimTranscript) {
      const spokenWord = roundToSingleLetter(interimTranscript);
      handleRecognitionResult(spokenWord);
    }

    return; // Ignore the first result
  }
  // Handle final result
  if (finalTranscript) {
    console.log("Final Transcript:", finalTranscript);

    const spokenWord = roundToSingleLetter(finalTranscript);
    handleRecognitionResult(spokenWord);
  }
};

recognition.onerror = (event) => {
  console.error("Speech recognition error:", event.error);
  isListening = false;
};

recognition.onend = () => {
  if (isListening) {
    // If the recognition ends and the user is still expecting input, restart it
    setTimeout(() => {
      recognition.start();
    }, 1000); // Adjust the delay as needed
  }
};

recognition.onnomatch = (event) => {
  console.log("No match found. Restarting recognition.");
  recognition.stop();
  startListening();
};

recognition.onstart = () => {
  console.log("Recognition started. Set up your recognition logic here.");
};

// Function to update the guessed letter in the user input section
const updateGuessedLetter = (letter) => {
  const charArray = chosenWord.split("");
  const dashes = document.getElementsByClassName("dashes");

  if (charArray.includes(letter)) {
    charArray.forEach((char, index) => {
      if (char === letter) {
        dashes[index].innerText = char;
        guessedLetters.add(letter); // Add the guessed letter to the Set
        winCount += 1;

        if (guessedLetters.size === new Set(charArray).size) {
          // All unique correct letters guessed, game won
          score++;
          scoreText.innerHTML = `<h2>SCORE: ${score}</h2>`;
          resultText.innerHTML = `<span class='win-msg'>CORRECT! </span><span>The word was <span>${chosenWord}</span></span>`;
          isListening = false;
          recognition.stop(); // Stop speech recognition
          canvas.style.backgroundColor = "lightgreen";
        }
      }
    });
  } else {
    count += 1;
    drawMan(count);

    if (count === 6) {
      score--;
      scoreText.innerHTML = `<h2>SCORE: ${score}</h2>`;
      resultText.innerHTML = `<span class='lose-msg'>WRONG! </span><span>The word was <span>${chosenWord}</span></span>`;
      isListening = false;
      recognition.stop();
      canvas.style.backgroundColor = "darkred";
    }
  }

  // Disable and mark the button as used
  const buttons = document.querySelectorAll(".letters");
  buttons.forEach((button) => {
    if (button.innerText === letter) {
      button.disabled = true;
      button.classList.add("used");
    }
  });
};

// Event listener for the Speak button
document.querySelector("#speakbutton").addEventListener("click", () => {
  if (!isListening) {
    startListening();
  }
});
