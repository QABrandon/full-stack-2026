const fs = require('fs');
const path = require('path');

// Test colors for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

// Test results tracker
let passed = 0;
let failed = 0;
const errors = [];

// Helper function to run a test
function test(description, testFunction) {
  try {
    testFunction();
    passed++;
    console.log(`${colors.green}✓${colors.reset} ${description}`);
  } catch (error) {
    failed++;
    console.log(`${colors.red}✗${colors.reset} ${description}`);
    errors.push({ description, error: error.message });
  }
}

// Helper function to assert
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log('\n🧪 Running Merge Conflict Practice Tests...\n');

// Test 1: Check if all required files exist
test('All starter files exist', () => {
  const requiredFiles = [
    'starter-files/index.html',
    'starter-files/styles.css',
    'starter-files/script.js'
  ];

  requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    assert(fs.existsSync(filePath), `Missing file: ${file}`);
  });
});

// Test 2: Check HTML structure
test('HTML has proper structure', () => {
  const htmlPath = path.join(__dirname, '../starter-files/index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  assert(html.includes('<!DOCTYPE html>'), 'Missing DOCTYPE declaration');
  assert(html.includes('<html'), 'Missing html tag');
  assert(html.includes('<head>'), 'Missing head tag');
  assert(html.includes('<body>'), 'Missing body tag');
  assert(html.includes('id="greeting-display"'), 'Missing greeting-display element');
});

// Test 3: Check for merge conflict markers
test('No merge conflict markers in HTML', () => {
  const htmlPath = path.join(__dirname, '../starter-files/index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  assert(!html.includes('<<<<<<<'), 'Found conflict marker: <<<<<<<');
  assert(!html.includes('======='), 'Found conflict marker: =======');
  assert(!html.includes('>>>>>>>'), 'Found conflict marker: >>>>>>>');
});

// Test 4: Check for merge conflict markers in CSS
test('No merge conflict markers in CSS', () => {
  const cssPath = path.join(__dirname, '../starter-files/styles.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  assert(!css.includes('<<<<<<<'), 'Found conflict marker: <<<<<<<');
  assert(!css.includes('======='), 'Found conflict marker: =======');
  assert(!css.includes('>>>>>>>'), 'Found conflict marker: >>>>>>>');
});

// Test 5: Check for merge conflict markers in JavaScript
test('No merge conflict markers in JavaScript', () => {
  const jsPath = path.join(__dirname, '../starter-files/script.js');
  const js = fs.readFileSync(jsPath, 'utf8');

  assert(!js.includes('<<<<<<<'), 'Found conflict marker: <<<<<<<');
  assert(!js.includes('======='), 'Found conflict marker: =======');
  assert(!js.includes('>>>>>>>'), 'Found conflict marker: >>>>>>>');
});

// Test 6: JavaScript has greeting variable
test('JavaScript has greeting variable defined', () => {
  const jsPath = path.join(__dirname, '../starter-files/script.js');
  const js = fs.readFileSync(jsPath, 'utf8');

  assert(js.includes('const greeting'), 'Missing greeting variable');
  assert(js.includes('function displayGreeting'), 'Missing displayGreeting function');
  assert(js.includes('function getGreeting'), 'Missing getGreeting function');
});

// Test 7: CSS has required sections
test('CSS has proper styling sections', () => {
  const cssPath = path.join(__dirname, '../starter-files/styles.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  assert(css.includes('body'), 'Missing body styles');
  assert(css.includes('header'), 'Missing header styles');
  assert(css.includes('#greeting-display'), 'Missing greeting-display styles');
});

// Test 8: JavaScript syntax check
test('JavaScript has valid syntax (no obvious errors)', () => {
  const jsPath = path.join(__dirname, '../starter-files/script.js');
  const js = fs.readFileSync(jsPath, 'utf8');

  // Check for common syntax errors
  const openBraces = (js.match(/{/g) || []).length;
  const closeBraces = (js.match(/}/g) || []).length;
  assert(openBraces === closeBraces, 'Mismatched curly braces');

  const openParens = (js.match(/\(/g) || []).length;
  const closeParens = (js.match(/\)/g) || []).length;
  assert(openParens === closeParens, 'Mismatched parentheses');
});

// Test 9: CSS syntax check
test('CSS has valid syntax (no obvious errors)', () => {
  const cssPath = path.join(__dirname, '../starter-files/styles.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  const openBraces = (css.match(/{/g) || []).length;
  const closeBraces = (css.match(/}/g) || []).length;
  assert(openBraces === closeBraces, 'Mismatched curly braces in CSS');

  // Check for missing semicolons in property declarations
  const propertyLines = css.split('\n').filter(line =>
    line.trim() &&
    !line.trim().startsWith('/*') &&
    !line.trim().startsWith('*') &&
    !line.trim().endsWith('*/') &&
    line.includes(':') &&
    !line.includes('{')
  );

  propertyLines.forEach(line => {
    if (!line.trim().endsWith(';') && !line.trim().endsWith('}')) {
      throw new Error(`Possibly missing semicolon: ${line.trim()}`);
    }
  });
});

// Test 10: HTML links to correct files
test('HTML links to CSS and JavaScript files', () => {
  const htmlPath = path.join(__dirname, '../starter-files/index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  assert(html.includes('href="styles.css"'), 'Missing link to styles.css');
  assert(html.includes('src="script.js"'), 'Missing script tag for script.js');
});

// Print summary
console.log('\n' + '='.repeat(50));
console.log(`\n📊 Test Summary:`);
console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
console.log();

// Print errors if any
if (errors.length > 0) {
  console.log(`${colors.yellow}Error Details:${colors.reset}\n`);
  errors.forEach(({ description, error }) => {
    console.log(`${colors.red}✗${colors.reset} ${description}`);
    console.log(`  ${error}\n`);
  });
}

// Exit with appropriate code
if (failed > 0) {
  console.log(`${colors.red}❌ Tests failed. Please fix the errors above.${colors.reset}\n`);
  process.exit(1);
} else {
  console.log(`${colors.green}✅ All tests passed! Your code is ready.${colors.reset}\n`);
  process.exit(0);
}
