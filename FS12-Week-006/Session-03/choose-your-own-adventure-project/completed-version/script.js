// Branching Story Lab - Complete Version
// Run with: node script.js
//
// This is the reference implementation.
// Story: "The Missing Ingredient" - a cooking competition.


// -------------------------------------------------------
// STORY DATA
// -------------------------------------------------------

const storyNodes = {

  start: {
    id: "start",
    text: "The kitchen buzzer sounds. Twenty minutes to judging. You reach for your saffron - the signature ingredient in your dish - and find the container empty. Someone used it. Your station neighbor Priya is plating her own dish beside you. The communal pantry is at the back of the hall. You could also try to improvise without it.",
    choices: [
      { text: "Ask Priya if she has any saffron to spare", nextId: "ask-neighbor" },
      { text: "Check the communal pantry at the back", nextId: "pantry" },
      { text: "Improvise - work with what you have", nextId: "improvise" }
    ],
    isEnding: false
  },

  "ask-neighbor": {
    id: "ask-neighbor",
    text: "Priya glances up from her work. She is in the middle of a critical reduction and cannot stop what she is doing. 'Top shelf of my kit bag,' she says without looking up. 'Small tin. I was not going to use it today.' You find a small tin of saffron - not a lot, but enough.",
    choices: [
      { text: "Thank her and rush back to finish the dish properly", nextId: "finish-strong" },
      { text: "Plate immediately - you are cutting it close on time", nextId: "rushed-plate" }
    ],
    isEnding: false
  },

  "finish-strong": {
    id: "finish-strong",
    text: "You work quickly but carefully. The saffron goes in at the right moment. The color blooms into the broth - exactly what you wanted. You plate with five minutes to spare. The dish looks and smells exactly as you planned it.",
    choices: [
      { text: "Submit the dish", nextId: "ending-win" }
    ],
    isEnding: false
  },

  "rushed-plate": {
    id: "rushed-plate",
    text: "You add the saffron and plate as fast as you can. The dish is technically correct, but the presentation is rushed - the garnish is off-center and the sauce pooled unevenly. You hand it in with thirty seconds to spare.",
    choices: [
      { text: "Submit the dish", nextId: "ending-second" }
    ],
    isEnding: false
  },

  pantry: {
    id: "pantry",
    text: "The communal pantry holds the usual competition stock. You scan the shelves quickly. Turmeric: similar color, very different flavor. Smoked paprika: no. And then you notice it - a glass cabinet along the back wall labeled 'Reserve Stock - Head Chef Only.' The cabinet is locked, but a judge is standing nearby.",
    choices: [
      { text: "Ask the judge if you can access the reserve cabinet", nextId: "judge-access" },
      { text: "Use the turmeric - it will at least give you the color", nextId: "turmeric" },
      { text: "Neither will work. Go back and improvise", nextId: "improvise" }
    ],
    isEnding: false
  },

  "judge-access": {
    id: "judge-access",
    text: "The judge raises an eyebrow. You explain the situation quickly - the empty container, the missing ingredient, your plan for the dish. She studies you for a moment, then unlocks the cabinet. 'This is a competition. Solving problems is part of it.' She hands you a proper amount of saffron.",
    choices: [
      { text: "Take the saffron and finish the dish", nextId: "ending-win" }
    ],
    isEnding: false
  },

  turmeric: {
    id: "turmeric",
    text: "Turmeric goes in carefully. The color is close - warm gold, not exactly the same. The flavor profile shifts. It is different from what you planned, but the dish is not broken. You adjust the seasoning to compensate and plate with three minutes left.",
    choices: [
      { text: "Submit the dish", nextId: "ending-second" }
    ],
    isEnding: false
  },

  improvise: {
    id: "improvise",
    text: "You step back and look at what you have on your station. No saffron, no substitute. You strip the dish back - pull out the elements that needed the saffron, amplify the ones that do not. It becomes a simpler dish than you planned. But simpler means every component has to be perfect. You plate with four minutes to spare.",
    choices: [
      { text: "Submit the dish", nextId: "ending-honorable" }
    ],
    isEnding: false
  },

  "ending-win": {
    id: "ending-win",
    text: "The judge lifts her spoon and tastes your dish. A pause. Then she makes a note on her pad. When the scores are read out, your name is at the top of the category. Afterward she stops by your station: 'The saffron was the right call. The dish was complete.'",
    choices: [],
    isEnding: true,
    endingTitle: "First Place"
  },

  "ending-second": {
    id: "ending-second",
    text: "The scores come in. You finished second in your category. One judge's notes describe the dish as 'confident and well-executed with an interesting substitution.' Another notes 'slight imbalance in the spice profile.' Second place is not first. But the dish was yours, you solved the problem, and you did not panic.",
    choices: [],
    isEnding: true,
    endingTitle: "Second Place"
  },

  "ending-honorable": {
    id: "ending-honorable",
    text: "The judges award you an honorable mention for technique. 'This competitor stripped the dish down instead of overcomplicating it,' the head judge says during the debrief. 'That takes discipline.' You did not win. But you learned something about what you can do when there is nothing left to rely on but the fundamentals.",
    choices: [],
    isEnding: true,
    endingTitle: "Honorable Mention"
  }

};


// -------------------------------------------------------
// GAME STATE
// -------------------------------------------------------

let currentSceneId = "start";
const visitedScenes = [];


// -------------------------------------------------------
// STUDENT FUNCTIONS
// -------------------------------------------------------

// getCurrentScene(sceneId)
// Returns the scene object for the given id.
function getCurrentScene(sceneId) {
  return storyNodes[sceneId];
}


// displayScene(sceneId)
// Logs the scene text and numbered choices to the console.
// For endings, logs the endingTitle instead of choices.
function displayScene(sceneId) {
  const scene = getCurrentScene(sceneId);

  console.log("\n" + "-".repeat(50));
  console.log("Scenes visited: " + visitedScenes.length);
  console.log("-".repeat(50));

  console.log("\n" + scene.text + "\n");

  if (scene.isEnding) {
    console.log("-- " + scene.endingTitle + " --");
  } else {
    scene.choices.forEach(function(choice, index) {
      console.log((index + 1) + ". " + choice.text);
    });
  }
}


// makeChoice(sceneId, choiceNumber)
// Handles a player selecting one of the numbered choices.
// Returns the nextId of the chosen scene.
function makeChoice(sceneId, choiceNumber) {
  const scene = getCurrentScene(sceneId);
  const selectedChoice = scene.choices[choiceNumber - 1];
  visitedScenes.push(sceneId);
  return selectedChoice.nextId;
}


// restartGame()
// Resets all state back to the beginning.
function restartGame() {
  currentSceneId = "start";
  visitedScenes.length = 0;
}


// -------------------------------------------------------
// GAME LOOP - DO NOT MODIFY
// -------------------------------------------------------

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function runGame() {
  displayScene(currentSceneId);

  const scene = getCurrentScene(currentSceneId);

  if (scene.isEnding) {
    askAfterEnding();
  } else {
    const quitNumber = scene.choices.length + 1;
    console.log(quitNumber + ". Quit");
    askForInput();
  }
}

function askForInput() {
  rl.question("\nEnter your choice: ", function(answer) {
    const choiceNumber = parseInt(answer);
    const scene = getCurrentScene(currentSceneId);
    const quitNumber = scene.choices.length + 1;

    if (isNaN(choiceNumber) || choiceNumber < 1 || choiceNumber > quitNumber) {
      console.log("Please enter a number between 1 and " + quitNumber + ".");
      askForInput();
      return;
    }

    if (choiceNumber === quitNumber) {
      console.log("\nGoodbye.");
      rl.close();
      process.exit(0);
    }

    currentSceneId = makeChoice(currentSceneId, choiceNumber);
    runGame();
  });
}

function askAfterEnding() {
  console.log("\n1. Play Again");
  console.log("2. Quit");

  rl.question("\nEnter your choice: ", function(answer) {
    const choiceNumber = parseInt(answer);

    if (choiceNumber === 1) {
      restartGame();
      runGame();
      return;
    }

    if (choiceNumber === 2) {
      console.log("\nThanks for playing.");
      rl.close();
      process.exit(0);
    }

    console.log("Please enter 1 or 2.");
    askAfterEnding();
  });
}

runGame();
