// Node - 
// Environment Variables and Process Object properties and methods

console.log("Hello from Node.js!");
console.log("===================\n");

// 1. Node.js Process Information
console.log("Node.js Process Information:");
console.log("Node.js version:", process.version);
console.log("Platform:", process.platform);
console.log("Architecture:", process.arch);
console.log("Process ID:", process.pid);
console.log("Current working directory:", process.cwd());

// 2. Environment Variables
console.log("\nEnvironment Variables:");
console.log("NODE_ENV:", process.env.NODE_ENV || "not set");
console.log(
  "USER/USERNAME:",
  process.env.USER || process.env.USERNAME || "unknown",
);
console.log(
  "HOME directory:",
  process.env.HOME || process.env.USERPROFILE || "unknown",
);
console.log(
  "PATH entries:",
  process.env.PATH ? process.env.PATH.split(":").length : "not available",
);

// 3. Command Line Arguments
console.log("\nCommand Line Arguments:");
console.log("Full arguments:", process.argv);
console.log("Script arguments:", process.argv.slice(2));

if (process.argv.length > 2) {
  console.log("You passed these arguments:");
  process.argv.slice(2).forEach((arg, index) => {
    console.log(`  ${index + 1}: ${arg}`);
  });
} else {
  console.log("No additional arguments provided");
  console.log("Try running: node hello.js arg1 arg2 arg3");
}

// 4. Memory Usage
console.log("\n Memory Usage:");
const memUsage = process.memoryUsage();
console.log(`RSS: ${Math.round(memUsage.rss / 1024 / 1024)} MB`);
console.log(`Heap Used: ${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`);

// 5. Uptime
console.log("\n⏱ Process Uptime:");
console.log(`${process.uptime()} seconds`);

console.log("\nBrowser Limitation:");
console.log(
  "Browsers cannot access process information, environment variables, or command line arguments!",
);
console.log("This is only available in Node.js server environment.");
