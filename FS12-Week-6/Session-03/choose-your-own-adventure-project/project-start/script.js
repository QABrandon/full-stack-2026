// Branching Story Project
// Run with: node script.js
//
// Your job has two parts:
//   1. Write your story in the storyNodes object below
//   2. Implement the four functions marked with TODO
//
// The console input/output is handled for you at the bottom of the file.
// You do not need to touch anything in the "do not modify" section.
//
// Read PLAN.md before starting.


// -------------------------------------------------------
// YOUR STORY DATA
//
// Fill out the storyNodes with the appropriate data.
// Keep the same structure - only the text and ids change.
//
// Scene shape:
//   id        - a unique string key, kebab-case (e.g. "dark-hallway")
//   text      - the paragraph the player reads when they arrive here
//   choices   - array of choice objects ({ text, nextId })
//   isEnding  - false for regular scenes, true for ending scenes
//
// Ending scenes also need:
//   endingTitle - a short title shown when this ending is reached
//   choices: [] - an empty array (required, not optional)
//
// Rules:
//   - Every nextId must exactly match a real scene key in this object
//   - Use kebab-case for all ids
//   - You need at least 8 scenes total and at least 2 distinct endings
// -------------------------------------------------------

const storyNodes = {
  start: {
    id: "start",
    text: "You sit down for a focused work session. Before you can even open your first file, three things compete for your attention: a client message asking for urgent help, an idea for a project estimator, and your unfinished class portfolio project.",
    choices: [
      { text: "Take the urgent client call", nextId: "client-call", trustChange: 5 },
      { text: "Build the estimator idea", nextId: "tool-idea", trustChange: 0 },
      { text: "Focus on the class portfolio project", nextId: "portfolio-night", trustChange: 5 }
    ],
    isEnding: false
  },
  "client-call": {
    id: "client-call",
    text: "The client says their site feels confusing and asks if you can just clean it all up fast. You can hear the pressure in their voice, but you also know vague requests can turn into huge projects.",
    choices: [
      { text: "Ask discovery questions before promising anything", nextId: "discovery-first", trustChange: 15 },
      { text: "Say yes to everything immediately", nextId: "say-yes", trustChange: -20 },
      { text: "Offer a small audit first", nextId: "quick-audit", trustChange: 10 }
    ],
    isEnding: false
  },
  "discovery-first": {
    id: "discovery-first",
    text: "You slow the conversation down. After a few careful questions, the real issue becomes clearer: the client does not need everything rebuilt. They need a better path for visitors and a stronger reason to trust the next step.",
    choices: [
      { text: "Propose one focused improvement", nextId: "small-mvp", trustChange: 10 },
      { text: "Bring the client into the next decision", nextId: "ask-feedback", trustChange: 15 },
      { text: "Check whether usability is part of the problem", nextId: "accessibility-check", trustChange: 10 }
    ],
    isEnding: false
  },
  "say-yes": {
    id: "say-yes",
    text: "You promise strategy, copy, redesign, development, automation, and launch help by the end of the week. The client sounds relieved. Your calendar does not.",
    choices: [
      { text: "Try to power through the work anyway", nextId: "ending-scope-spiral", trustChange: -25 }
    ],
    isEnding: false
  },
  "quick-audit": {
    id: "quick-audit",
    text: "You spend a short, focused block reviewing the page structure, call-to-action flow, and obvious points of friction. The audit does not solve everything, but it gives the conversation a direction.",
    choices: [
      { text: "Use the audit to guide a better client conversation", nextId: "discovery-first", trustChange: 10 },
      { text: "Turn the audit into one clear next step", nextId: "small-mvp", trustChange: 10 }
    ],
    isEnding: false
  },
  "tool-idea": {
    id: "tool-idea",
    text: "You open a blank file and start sketching a project estimator. It could help future clients understand scope, pricing, and decisions. It could also become a huge system before it proves anything.",
    choices: [
      { text: "Build the smallest useful version", nextId: "small-mvp", trustChange: 10 },
      { text: "Design the full dream system", nextId: "overbuild", trustChange: -10 },
      { text: "Ask what decision the tool needs to support", nextId: "ask-feedback", trustChange: 10 }
    ],
    isEnding: false
  },
  "small-mvp": {
    id: "small-mvp",
    text: "You choose the smallest useful version. It will not solve every future problem, but it can solve today's problem clearly and give you something real to test.",
    choices: [
      { text: "Ship the practical version", nextId: "ending-useful-tool", trustChange: 10 },
      { text: "Test the idea with feedback first", nextId: "ask-feedback", trustChange: 10 },
      { text: "Make sure the simple version is still usable", nextId: "accessibility-check", trustChange: 10 }
    ],
    isEnding: false
  },
  overbuild: {
    id: "overbuild",
    text: "The idea grows quickly: pricing logic, dashboards, automations, integrations, reporting, and advanced workflows. The plan looks impressive, but the first simple version still does not exist.",
    choices: [
      { text: "Keep building the giant version", nextId: "ending-automation-trap", trustChange: -20 },
      { text: "Cut back to the version you can finish", nextId: "small-mvp", trustChange: 15 }
    ],
    isEnding: false
  },
  "portfolio-night": {
    id: "portfolio-night",
    text: "You look at your class project and portfolio work. It is not perfect, but it is close enough to become a finished piece if you stop treating every detail like a full redesign.",
    choices: [
      { text: "Ask for feedback before polishing", nextId: "ask-feedback", trustChange: 10 },
      { text: "Work alone until it ships", nextId: "solo-sprint", trustChange: -5 },
      { text: "Review clarity, headings, and user flow", nextId: "accessibility-check", trustChange: 10 }
    ],
    isEnding: false
  },
  "ask-feedback": {
    id: "ask-feedback",
    text: "You let another perspective into the work. The feedback is not always easy to hear, but it separates what matters from what can wait.",
    choices: [
      { text: "Use the feedback to make a better decision", nextId: "ending-sustainable-studio", trustChange: 15 },
      { text: "Apply the feedback to the project", nextId: "portfolio-polish", trustChange: 10 }
    ],
    isEnding: false
  },
  "accessibility-check": {
    id: "accessibility-check",
    text: "You slow down and review the work like a real person has to use it. The labels need to be clear, the flow needs to make sense, and the next step should never feel hidden.",
    choices: [
      { text: "Let clarity guide the final decision", nextId: "ending-sustainable-studio", trustChange: 15 },
      { text: "Improve the project before shipping", nextId: "portfolio-polish", trustChange: 10 }
    ],
    isEnding: false
  },
  "solo-sprint": {
    id: "solo-sprint",
    text: "You push through alone. The work moves forward, but every decision takes longer because there is no outside signal telling you what is good enough.",
    choices: [
      { text: "Ship it and learn from the process", nextId: "ending-portfolio-launch", trustChange: 5 },
      { text: "Pause and get one outside review", nextId: "ask-feedback", trustChange: 10 }
    ],
    isEnding: false
  },
  "portfolio-polish": {
    id: "portfolio-polish",
    text: "You clean up the project, simplify the story, and make the final version easier to understand. It still feels handmade, but now it also feels intentional.",
    choices: [
      { text: "Ship the project", nextId: "ending-portfolio-launch", trustChange: 10 }
    ],
    isEnding: false
  },
  "ending-sustainable-studio": {
    id: "ending-sustainable-studio",
    text: "You choose scope, clarity, and trust. The work is smaller than the original panic, but stronger because it solves the real problem. The client understands the path forward, and you still have energy for the next project.",
    choices: [],
    isEnding: true,
    endingTitle: "Sustainable Studio"
  },
  "ending-scope-spiral": {
    id: "ending-scope-spiral",
    text: "You said yes too fast and turned one request into five projects. Nothing fully breaks, but everything becomes harder than it needed to be. The next time a request feels urgent, you will remember to define the work before accepting it.",
    choices: [],
    isEnding: true,
    endingTitle: "Scope Spiral"
  },
  "ending-useful-tool": {
    id: "ending-useful-tool",
    text: "You build something small that actually helps. It does not cover every pricing edge case or future workflow, but it makes one decision easier today. That gives you a real foundation to improve later.",
    choices: [],
    isEnding: true,
    endingTitle: "Useful Tool"
  },
  "ending-automation-trap": {
    id: "ending-automation-trap",
    text: "You build the machine before proving the workflow. The idea is still valuable, but the first version collapses under its own ambition. You save the notes and decide the next attempt will start smaller.",
    choices: [],
    isEnding: true,
    endingTitle: "Automation Trap"
  },
  "ending-portfolio-launch": {
    id: "ending-portfolio-launch",
    text: "You finish the project and ship the work. It is not perfect, but it is real, complete, and easier to talk about because you brought it across the finish line.",
    choices: [],
    isEnding: true,
    endingTitle: "Portfolio Launch"
  }
};


// -------------------------------------------------------
// GAME STATE
// These variables are used by your functions below.
// Do not rename them - the game loop at the bottom depends on them.
// -------------------------------------------------------

let currentSceneId = "start";
let trust = 50;
const visitedScenes = [];


// -------------------------------------------------------
// YOUR FUNCTIONS
// Implement each function using the TODO comments as a guide.
// None of these functions should ask for input or deal with readline.
// They only read data, update state, and log to the console.
// -------------------------------------------------------


// getCurrentScene(sceneId)
// Returns the scene object for the given id.
function getCurrentScene(sceneId) {
  return storyNodes[sceneId];
}
// What this means in plain English: Use the scene id to look up and return the matching scene object.

// displayScene(sceneId)
// Logs the scene text and numbered choices to the console.
// For endings, logs the endingTitle instead of choices.
// Do not call any input functions here - the game loop handles that.
function displayScene(sceneId) {
  // Store the current scene so we can use its text, choices, and ending status.
  const scene = getCurrentScene(sceneId);

  // Print divider lines to make each turn easier to read in the terminal.
  console.log("\n" + "-".repeat(50));
  console.log("-".repeat(50));
  // Print the number of scenes visited.
  console.log("Scenes visited: " + (visitedScenes.length + 1));

  // Print the trust value. It is 50 at the start, and decreases or increasesby a defined value for each scene visited.
  console.log("Trust: " + trust);

  // Print the story text for the current scene.
  console.log("\n" + scene.text + "\n");

  if (scene.isEnding) {
    // If this is an ending, show the ending title instead of choices.
    console.log("-- " + scene.endingTitle + " --");
  } else {
    // If this is not an ending, print each choice as a numbered option.
    scene.choices.forEach(function(choice, index) {
      console.log((index + 1) + ". " + choice.text);
    });
  }
}
// What this means in plain English: Create a line break, add a line seperator, print the scene text, and then print the choices.

// makeChoice(sceneId, choiceNumber)
// Handles a player selecting one of the numbered choices.
// Returns the nextId of the chosen scene.
function makeChoice(sceneId, choiceNumber) {
  const scene = getCurrentScene(sceneId);

  // Get the selected choice using scene.choices[choiceNumber - 1]
  //   (choiceNumber is 1-based but arrays are 0-based)
  const selectedChoice = scene.choices[choiceNumber - 1];

  trust = trust + selectedChoice.trustChange;
  
  visitedScenes.push(sceneId);
  return selectedChoice.nextId;
}
// What this means in plain English: Find the current scene, find the choice the player picked, remember that they visited this scene, then send back the id of the next scene. Update the trust value based on the choice the player made.

// restartGame()
// Resets all state back to the beginning.
// Do not call displayScene here - the game loop handles that after restart.
function restartGame() {
  currentSceneId = "start";
  trust = 50;

  visitedScenes.length = 0;
}
// What this means in plain English: Send the player back to the start scene, reset the trust value to 50, and erase the list of scenes from the previous playthrough.


// -------------------------------------------------------
// GAME LOOP - DO NOT MODIFY
// This section handles all console input and output.
// It calls your functions above to run the game.
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
