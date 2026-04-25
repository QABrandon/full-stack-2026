// The Event Loop and Call Stack
// Run this file with the VS Code debugger - NOT in a browser
//
// How to start:
//   Option 1: Open Run and Debug panel (Ctrl+Shift+D / Cmd+Shift+D) > Run and Debug > Node.js
//   Option 2: Open a JavaScript Debug Terminal and run: node event-loop-demo.js
//
// Set breakpoints by clicking the line numbers on the left.
// Use F10 (Step Over), F11 (Step Into), Shift+F11 (Step Out).
// Watch the Call Stack panel on the left as you step through each part.


// -------------------------------------------------------
// PART 1: The Call Stack - Watch It Build and Collapse
//
// DEBUGGER TASK:
//   1. Set a breakpoint on the "let message = buildMessage(name);" line
//   2. Start the debugger - pause there
//   3. Look at the Call Stack panel - it shows: greet > (root)
//   4. Press Step Into (F11) to enter buildMessage
//   5. Call Stack now shows: buildMessage > greet > (root)
//   6. Press Step Out (Shift+F11) - buildMessage returns, Call Stack shrinks back
// -------------------------------------------------------

function greet(name) {
  let message = buildMessage(name); // Step Into here - watch the stack grow
  console.log(message);
}

function buildMessage(name) {
  const result = "Hello, " + name + "!"; // you are now one level deeper
  return result;                        // Step Out here - watch the stack shrink
}

console.log("--- Part 1: Call Stack ---");
greet("Alice");


// -------------------------------------------------------
// PART 2: Three Levels Deep - Reading the Call Stack Panel
//
// DEBUGGER TASK:
//   1. Set a breakpoint inside step3 on the console.log line
//   2. Run the debugger - it pauses deep inside the call chain
//   3. Read the Call Stack panel top to bottom:
//      step3 > step2 > step1 > (root)
//   4. Click "step1" in the Call Stack panel - the editor jumps to that line
//      and the Variables panel shows step1's local variables
//   5. This is exactly what a stack trace in an error message shows you
// -------------------------------------------------------

function step3() {
  console.log("step3 is running"); // set breakpoint here - read the Call Stack panel
}

function step2() {
  step3();
}

function step1() {
  step2();
}

console.log("\n--- Part 2: Three-Level Call Stack ---");
step1();

// Now uncomment the throw below to see a real stack trace in the terminal output.
// Compare what the terminal prints to what the Call Stack panel showed you.
// function step3WithError() { throw new Error("crash here!"); }
// function step2e() { step3WithError(); }
// function step1e() { step2e(); }
// step1e();


// -------------------------------------------------------
// PART 3: Synchronous Execution - One Line at a Time
//
// DEBUGGER TASK:
//   1. Set a breakpoint on the first console.log below
//   2. Use Step Over (F10) to move one line at a time
//   3. Notice: each line runs and completes before the next one starts
//   4. JavaScript cannot do two things at once - this IS the single thread
// -------------------------------------------------------

function runSequence() {
  const step1Result = doWork("step 1"); // Step Over - this runs completely before moving on
  const step2Result = doWork("step 2"); // Step Over - same thing
  const step3Result = doWork("step 3");
  return step1Result + ", " + step2Result + ", " + step3Result;
}

function doWork(label) {
  const output = label + " done";
  return output;
}

console.log("\n--- Part 3: Synchronous Order ---");
const sequenceResult = runSequence();
console.log(sequenceResult); // "step 1 done, step 2 done, step 3 done" - always in order


// -------------------------------------------------------
// PART 4: setTimeout and the Queue - Why "0ms" Runs Last
//
// DEBUGGER TASK:
//   1. Set a breakpoint on console.log("A")
//   2. Step Over through A, the setTimeout call, and C
//   3. Notice: when you step over setTimeout, the callback does NOT run immediately
//      It is handed off to Node's timer system and queued
//   4. After C runs and the stack is empty, the event loop picks up the callback
//   5. The Call Stack panel will show the setTimeout callback when it finally runs
//
// NOTE: The debugger may pause inside the setTimeout callback automatically.
// This is correct - it ran AFTER the synchronous code finished.
// -------------------------------------------------------

console.log("\n--- Part 4: Event Loop ---");

console.log("A"); // synchronous - runs on the stack immediately

setTimeout(function waitingInQueue() { // the name helps identify it in the Call Stack panel
  console.log("B"); // this runs after A and C, even with 0ms delay
}, 0);

console.log("C"); // synchronous - runs before B

// Output: A, C, B
// B had to wait because setTimeout always sends its callback through the queue.
// The event loop only moves queue items onto the stack when the stack is empty.


// -------------------------------------------------------
// PART 5: The Classic Async Timing Bug
//
// DEBUGGER TASK:
//   1. Set a breakpoint on "let userData = null;"
//   2. Step Over through the setTimeout call
//   3. Step Over to the console.log line
//   4. Check the Variables panel - userData is still null
//   5. The setTimeout callback has not run yet - it is in the queue
//   6. Continue (F5) - now the callback runs and sets userData
//   7. But the console.log already ran with null - too late
// -------------------------------------------------------

console.log("\n--- Part 5: Async Timing Bug ---");

let userData = null; // set breakpoint here

setTimeout(function assignData() {
  userData = { name: "Alice", role: "admin" }; // this runs AFTER the stack clears
  console.log("userData set inside callback:", userData); // by this point the log below already ran
}, 0);

console.log("userData right now:", userData);
// null - the callback is still in the queue when this line runs
// This is why you cannot use a value that an async operation sets on the next line


// -------------------------------------------------------
// PART 6: Watch Expressions - Track Variables Across Steps
//
// DEBUGGER TASK:
//   1. Add "runningTotal" to the Watch panel (click + in the Watch section)
//   2. Add "i" and "scores[i]" as well
//   3. Set a breakpoint inside the loop
//   4. Step Over with F10 and watch all three update live in the Watch panel
//   5. This is faster than adding console.log on every line
// -------------------------------------------------------

function sumScores(scores) {
  let runningTotal = 0;

  for (let i = 0; i < scores.length; i++) {
    runningTotal += scores[i]; // set breakpoint here, then watch runningTotal in Watch panel
  }

  return runningTotal;
}

console.log("\n--- Part 6: Watch Expressions ---");
const examScores = [88, 72, 95, 61, 84];
const totalScore = sumScores(examScores);
console.log("Total:", totalScore); // 400
