// simple file operations with Node

// https://nodejs.org/docs/latest-v24.x/api/fs.html

const fs = require("fs");

function createFile(filename, content) {
  console.log("Creating file:", filename);
  fs.writeFile(filename, content, (err) => {
    if (err) {
      console.error("Error creating files", err.message);
    }
    console.log("File Created Successfully!");
  });
}

const nameOfFile = "test.txt";
const contentsOfFile = "Hello World";

// node is going to execute this code outside the browser for me
// once I go to the terminal and run "node file-manager.js" from this directory
createFile(nameOfFile, contentsOfFile);

// Practice time

// readFile -> lets us read from files on our system

// function readFile(filename) {
//   console.log("Reading File:", filename);
//   //use fs.readFile here - https://nodejs.org/learn/manipulating-files/reading-files-with-nodejs
// }

//readFile("test.txt"); //uncomment this

// read the file back out to the console

// execute and read from test.txt


