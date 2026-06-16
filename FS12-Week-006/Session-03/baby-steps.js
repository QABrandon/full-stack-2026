// Create function that does
// the following called "getTotalInventoryAmount"

// Given an array of items (object),
// get the sum of inventoryAmount from all
// of the items in the array
// return the total

// example input data

const items = [
  {
    name: "DvD",
    inventoryAmount: 1,
    dateEntered: "2/2/2022",
    description: "A bunch of Dvds",
  },
  {
    name: "VHS",
    inventoryAmount: 2,
    dateEntered: "3/1/2020",
    description: "A bunch of vhs tapes",
  },
  {
    name: "Books",
    inventoryAmount: 123,
    dateEntered: "2/1/2022",
    description: "books galore",
  },
  {
    name: "Backpacks",
    inventoryAmount: 2,
    dateEntered: "2/12/2022",
    description: "Three lost Backpacks",
  },
  {
    name: "Pencils",
    inventoryAmount: 4231,
    dateEntered: "2/5/2022",
    description: "Writing implements",
  },
  {
    name: "Pens",
    inventoryAmount: 5,
    dateEntered: "2/7/2022",
    description: "Not Erasable",
  },
];

//Take the steps we wrote out in Step 4

/*
0. Create total Variable
1. go through each item in the list
2. start with DVDs
3. add the count to the total
4. go to VHS
5. add count of VHS to total
6. return total
*/

// Turn that into pseudocode

// Function steps

// total = 0
// loop through items
// add item inventoryAmount to total
// return total

// Could add pre-steps

// create a working function that print "hello" in the console
// pass in items as a parameter and prints items to console to that function

// Lets do the pre-steps - Step 6 - write minimal code and test

// function name(params) {

// }

// start with pre-step 1
// create a working function that prints "hello" in the console
// function getTotalInventoryAmount() {
//   console.log("Hello World");
// }
// getTotalInventoryAmount();

const itemsSimple = [
  {
    name: "DVD",
    inventoryAmount: 1,
  },
  {
    name: "VHS",
    inventoryAmount: 2,
  },
];

// Pre-Step 2

// function getTotalInventoryAmount(items) {
//   console.log(items);
// }

// getTotalInventoryAmount(itemsSimple);

// Now that the presteps are done - we are going to add the pseudocode
// function getTotalInventoryAmount(items) {
//   // total = 0
//   let total = 0;
//   //console.log("I expect total to be 0, it was", total)
//   // loop through items
//   // add item inventoryAmount to total
//   // return total
// }

// getTotalInventoryAmount(itemsSimple);

// write the loop

// function getTotalInventoryAmount(items) {
//   // total = 0
//   let total = 0;
//   //console.log("I expect total to be 0, it was", total)
//   // loop through items
// //   for (const element of object) {

// //   }
//     for (const item of items){
//       // add item inventoryAmount to total
//       console.log(item);
//     }

//   // return total
// }

// getTotalInventoryAmount(itemsSimple);

// add inventory amount to total

// function getTotalInventoryAmount(items) {
//   // total = 0
//   let total = 0;
//   //console.log("I expect total to be 0, it was", total)
//   // loop through items
//   //   for (const element of object) {

//   //   }
//   for (const item of items) {
//     // add item inventoryAmount to total
//       total += item.inventoryAmount
//       console.log("total is now", total)
//   }

//   // return total
// }

// getTotalInventoryAmount(itemsSimple);

// function getTotalInventoryAmount(items) {
//   // total = 0
//   let total = 0;
//   //console.log("I expect total to be 0, it was", total)
//   // loop through items
//   //   for (const element of object) {

//   //   }
//   for (const item of items) {
//     // add item inventoryAmount to total
//     total += item.inventoryAmount;
//    // console.log("total is now", total);
//   }

//   return total
// }

// console.log(getTotalInventoryAmount(itemsSimple));

// at this point we are done - we can clean up our code

function getTotalInventoryAmount(items) {
  let total = 0;
  for (const item of items) {
    total += item.inventoryAmount;
  }
  return total;
}

console.log(getTotalInventoryAmount(items));

// 7 - try a different, simpler approach

// instead of this approach

// for (const item of items) {
//   total += item.inventoryAmount;
// }

// standard for loop
// for (let index = 0; index < array.length; index++) {
//     const element = array[index];

// }

// for(let i = 0; i < items.length; i++){
//    total = total + array[i].inventoryAmount;
// }

// Step 10

function getTotalInventoryAmount(items) {
  let total = 1; // total should be 0
  for (const item of items) {
    total = item.inventoryAmount; // total is getting overwritten each time
  }
  return total;
}

// turns into

function getTotalInventoryAmount(items) {
  let total = 1; // total should be 0
 console.log("I expect total to be 0 it was", total)
//   for (const item of items) {
//     total = item.inventoryAmount; // total is getting overwritten each time
//   }
//   return total;
}