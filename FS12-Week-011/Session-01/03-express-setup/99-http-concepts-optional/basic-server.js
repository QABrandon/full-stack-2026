// node has a built in http server

const http = require("http");

console.log("Starting basic http server");

// Create the server


const server = http.createServer((request, response) => {
  console.log("\nIncoming Request:");
  console.log("Method:", request.method);
  console.log("URL:", request.url);
  console.log("HTTP Version:", request.httpVersion);
  console.log("Headers:", JSON.stringify(request.headers, null, 2));

  // Set response headers
  response.writeHead(200, {
    "Content-Type": "text/html",
    Server: "Codecademy-HTTP-Demo",
  });

  // Send response body
  const html = `
  add your html here
  `;

  response.end(html);
});


// select a port
const PORT = 3000;

// start the server to handle requests

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Try visiting the URL in your browser to see HTTP in action!");
  console.log("Press Ctrl+C to stop the server");
});

// Handle server errors
server.on("error", (err) => {
  console.error("Server error:", err.message);
});