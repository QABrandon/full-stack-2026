// National Parks Data Lab - Starter File
// U.S. National Park Service Data Analysis Practice
//
// Work through each task in order.
// Your results appear on the page in the browser.
// Save this file and refresh the browser after each change.
//
// Three display functions are available (defined in display.js):
//
//   showSection("title")            - adds a labeled section header to the page
//   show("label", value)            - displays any value on the page
//   showTable("label", array)       - displays an array of objects as a table
//
// Loop tasks still use console.log() inside the loop body.
// Open DevTools (F12 / Cmd+Option+I) to see console output.

// ============================================================
// PART 1: ARRAYS
// ============================================================

showSection("Part 1: Arrays");

// ---- Task 1: Create an Array ----
const parkNames = [
  "Yellowstone",
  "Yosemite",
  "Glacier",
  "Zion",
  "Great Smoky Mountains",
  "Grand Canyon",
];

show("Task 1: Parks Array", parkNames);

// ---- Task 2: Access Elements by Index ----
// kinda middle? i just picked 2 bc it looked close enough
let middleIndex = 2;

show("Task 2: First park (index 0)", parkNames[0]);
show("Task 2: Last park (index length - 1)", parkNames[parkNames.length - 1]);
show("Task 2: Middle park", parkNames[middleIndex]);

// ---- Task 3: Loop with a Standard for Loop ----
showSection("Task 3: Standard for Loop (check console)");

for (let i = 0; i < parkNames.length; i++) {
  console.log("Park #" + i + ": " + parkNames[i]);
}

// ---- Task 4: Loop with for...of ----
showSection("Task 4: for...of Loop (check console)");

for (const parkName of parkNames) {
  console.log(parkName);
}

// ---- Task 5: Loop with forEach ----
showSection("Task 5: forEach (check console)");

parkNames.forEach(function (name) {
  console.log(name);
});

// ---- Task 6: Use map() to Transform the Array ----
const officialNames = parkNames.map((name) => {
  return name + " National Park";
});

show("Task 6: Original parkNames (unchanged)", parkNames);
show("Task 6: officialNames from map()", officialNames);

// ---- Task 7: Use filter() to Narrow Down ----
const longParkNames = parkNames.filter((name) => {
  return name.length > 7;
});

show("task 7: Names longer than 7 characters", longParkNames);

// ---- Task 8: Use find() to Locate One Item ----
const firstGPark = parkNames.find((name) => {
  return name.charAt(0) == "G";
});

show("Task 8: First park starting with G", firstGPark);

// ============================================================
// PART 2: OBJECTS
// ============================================================

showSection("Part 2: Objects");

// ---- Task 9: Create an Empty Object and Add Properties ----
const myPark = {};

myPark.name = "Yellowstone";
myPark.state = "Wyoming";
myPark.established = 1872;
myPark.entranceFee = 35;
myPark.isWilderness = true;

show("Task 9: myPark (built property by property)", myPark);

// ---- Task 10: Create an Object with Literal Notation ----
const otherPark = {
  name: "Acadia",
  state: "Maine",
  established: 1929,
  entranceFee: 30,
  "managed by": "National Park Service",
  location: {
    region: "Northeast",
    latitude: 44.35,
  },
};

show("Task 10: otherPark (object literal)", otherPark);

// ---- Task 11: Dot Notation Access ----
show("Task 11: otherPark.name", otherPark.name);
show("Task 11: otherPark.established", otherPark.established);

// ---- Task 12: Bracket Notation Access ----
show("Task 12: otherPark[\"state\"]", otherPark["state"]);
show("Task 12: otherPark[\"entranceFee\"]", otherPark["entranceFee"]);

const propertyToAccess = "name";
show("Task 12: via variable propertyToAccess", otherPark[propertyToAccess]);

// ---- Task 13: Access a Property with a Space in the Name ----
show("Task 13: otherPark[\"managed by\"]", otherPark["managed by"]);

// ---- Task 14: Delete a Property ----
show("Task 14: entranceFee BEFORE delete", otherPark.entranceFee);

delete otherPark.entranceFee;

show("Task 14: entranceFee AFTER delete (undefined)", otherPark.entranceFee);
show("Task 14: otherPark after deletion", otherPark);

// ---- Task 15: Access Nested Objects ----
const locationRef = otherPark.location;
const regionLonghand = locationRef.region;

show("Task 15 longhand: region", regionLonghand);
show("Task 15 shorthand", otherPark.location.region);

// ---- Task 16: Add a Method to an Object ----
myPark.getDescription = function () {
  return (
    this.name +
    " was established in " +
    this.established +
    " in " +
    this.state
  );
};

show("Task 16: myPark.getDescription()", myPark.getDescription());

// ---- Task 17: Use 'this' Inside a Method ----
// using 2026 because thats what the assigment said
const featuredPark = {
  name: "Grand Canyon",
  state: "Arizona",
  established: 1919,
  annualVisitors: 4733705,
  getLabel: function () {
    return this.name + " National Park (" + this.state + ")";
  },
  getAge: function () {
    return 2026 - this.established;
  },
};

show("Task 17: featuredPark.getLabel()", featuredPark.getLabel());
show("Task 17: featuredPark.getAge()", featuredPark.getAge());

// ============================================================
// PART 3: ARRAYS OF OBJECTS
// ============================================================

showSection("Part 3: Arrays of Objects");

// ---- Task 18: Create an Array of Park Objects ----
// Sizes / 2023 visits from NPS park statistics & park fact pages (nps.gov).
const parks = [
  {
    name: "Yellowstone",
    state: "Wyoming",
    established: 1872,
    areaSqMiles: 3468,
    annualVisitors: 4501382,
    entranceFee: 35,
  },
  {
    name: "Yosemite",
    state: "California",
    established: 1890,
    areaSqMiles: 1187,
    annualVisitors: 4057237,
    entranceFee: 35,
  },
  {
    name: "Great Smoky Mountains",
    state: "North Carolina and Tennessee",
    established: 1934,
    areaSqMiles: 800,
    annualVisitors: 13294000,
    entranceFee: 0,
  },
  {
    name: "Zion",
    state: "Utah",
    established: 1919,
    areaSqMiles: 229,
    annualVisitors: 4620000,
    entranceFee: 35,
  },
  {
    name: "Acadia",
    state: "Maine",
    established: 1929,
    areaSqMiles: 77,
    annualVisitors: 3879890,
    entranceFee: 30,
  },
];

showTable("Task 18: Parks Inventory", parks);

// ---- Task 19: Loop Through the Array of Objects ----
showSection("Task 19: Loop through Parks (check console)");

parks.forEach((park) => {
  const line =
    park.name + " (" + park.state + ") - Est. " + park.established;
  console.log(line);
});

console.log("(extra log left over from debugging task 19)");

// ---- Task 20: Filter the Parks Array ----
const freeParks = parks.filter((park) => {
  return park.entranceFee == 0;
});

const busyParks = parks.filter((park) => park.annualVisitors > 4000000);

showTable("Task 20: Free parks", freeParks);
showTable("Task 20: Busy parks (4M+ visitors)", busyParks);

// ---- Task 21: Map the Parks Array to Labels ----
const parkLabels = parks.map((park) => {
  return (
    park.name + " - " + park.state + " (" + park.established + ")"
  );
});

show("Task 21: Park labels from map()", parkLabels);

// ============================================================
// PART 4: OBJECT MANIPULATION
// ============================================================

showSection("Part 4: Object Manipulation");

// ---- Task 22: Copy an Object with Object.assign() ----
const basePark = {
  name: "Rocky Mountain",
  state: "Colorado",
  established: 1915,
  entranceFee: 30,
};

const updatedPark = Object.assign({}, basePark);
updatedPark.entranceFee = 0;

show("Task 22: Original basePark (unchanged)", basePark);
show("Task 22: updatedPark with changed property", updatedPark);

// ---- Task 23: Reference vs Value ----
let originalFee = 35;
let saleFee = originalFee;
saleFee = 0;

show("Task 23 Part A: originalFee (still 35)", originalFee);
show("Task 23 Part A: saleFee (changed to 0)", saleFee);

const parkA = { name: "Test Park", entranceFee: 25 };
const parkB = parkA;
parkB.entranceFee = 10;

show("Task 23 Part B: parkA (fee changed via parkB)", parkA);
show("Task 23 Part B: parkB (same object as parkA)", parkB);

const park1 = { name: "Demo", entranceFee: 15 };
const park2 = { name: "Demo", entranceFee: 15 };

show("Task 23 Part C: park1 === park2", park1 === park2);
show(
  "Task 23 Part C: why false",
  "bc === is checking if its the same object in memory not if the stuff inside matches",
);

// ---- Task 24: const with Objects and Arrays ----
const myFavoritePark = { name: "Glacier" };
myFavoritePark.name = "Olympic";

show("Task 24 Part A: myFavoritePark after property change", myFavoritePark);

// myFavoritePark = { name: "New Park" };
// ^ would throw TypeError: Assignment to constant variable (cant reassign a const)

const parkList = ["Yellowstone", "Yosemite"];
parkList.push("Glacier");

show("Task 24 Part C: parkList after .push()", parkList);

// ============================================================
// BONUS
// ============================================================

showSection("Bonus: Object.keys / Object.values / Object.entries");

const bonusKeysDemo = {
  unit: "Week 5",
  topic: "Objects and arrays",
  hoursLogged: 3,
};

show("Bonus: Object.keys(bonusKeysDemo)", Object.keys(bonusKeysDemo));
show("Bonus: Object.values(bonusKeysDemo)", Object.values(bonusKeysDemo));

const bonusEntries = Object.entries(bonusKeysDemo);
show("Bonus: Object.entries(bonusKeysDemo)", bonusEntries);
show("Bonus: entries[0][0] (first key)", bonusEntries[0][0]);
show("Bonus: entries[0][1] (first value)", bonusEntries[0][1]);

showSection("Bonus: Chain .filter() then .map()");

// filter then map (i rewrote it twice to make sure i understood)
const freeParksForChain = parks.filter((park) => park.entranceFee == 0);
const longhandLabels = freeParksForChain.map((park) => {
  return park.name + " (free)";
});

const chainedLabels = parks
  .filter((park) => {
    return park.entranceFee == 0;
  })
  .map((park) => park.name + " (free)");

show("Bonus: longhand filter, then map", longhandLabels);
show("Bonus: chained .filter().map()", chainedLabels);
show(
  "Bonus: chained matches longhand (same join string)",
  chainedLabels.join(" | ") === longhandLabels.join(" | "),
);

showSection("Bonus: Copy with object spread { ...obj }");

const spreadCopy = { ...basePark };
spreadCopy.state = "Montana (hypothetical)";

show("Bonus: basePark unchanged after spread copy edit", basePark);
show("Bonus: spreadCopy with changed state", spreadCopy);
