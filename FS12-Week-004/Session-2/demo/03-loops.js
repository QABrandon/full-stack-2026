// for loops - I know when I need to stop the loop

// sometimes we want to loop through things

// // Count - to 10
// console.log("1, hahaha");
// console.log("2, hahaha");
// console.log("3, hahaha");
// console.log("4, hahaha");
// console.log("5, hahaha");
// //,,,
// console.log("10, hahaha");

// how many lines do we need to do the above?

// why this isn't great - having all 10 lines
// repeating the same thing 10 times
// code is as readable (just imagine 1000 or 10000 times)

// what is common among each line?

// console.log("<num>, hahaha");

// if we could just switch the number out and tell it to repeat 10 times, or 1000

// for loops to the rescue

// our first for loop
for (let i = 1; i < 11; i++ ){
    console.log(i)
}

// for (initialization step; condition; afterthough){
  // body
//}

// we are going to use something similar to emmet for JS

// snippets -> plugins, built in ones, make your own

//type for + find the closed top box in the dialogue + tab
// you'll get the starter code below

// for (let index = 0; index < array.length; index++) {
//     const element = array[index];
    
// }

// dont repeat yourself

//[Understanding JavaScript by Debugging](https://www.youtube.com/watch?v=bx8Pc-Si-3g)

for (let i = 1; i <= 10; i++){
    console.log(i + " hahahaha")
}

// while loop
// if you have a game or a specific event that exits a loop

let stillAlive = true;
while (stillAlive) {
  //play the game

  console.log("did action 1");
  console.log("got a goomba");
  console.log("collected 50 coins");

  // 50 loops in
  console.log("fell into lava");
  stillAlive = false; // we will exxit the loop after this line
}