// Greeting message - this will be modified to create conflicts
const greeting = "Hello, World!";

// Function to display the greeting
function displayGreeting() {
  const greetingElement = document.getElementById('greeting-display');

  if (greetingElement) {
    greetingElement.textContent = greeting;
  }
}

// Function to get the current greeting
function getGreeting() {
  return greeting;
}

// Run when page loads
document.addEventListener('DOMContentLoaded', displayGreeting);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getGreeting, displayGreeting };
}
