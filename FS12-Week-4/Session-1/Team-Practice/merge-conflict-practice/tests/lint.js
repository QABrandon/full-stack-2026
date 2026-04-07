const fs = require('fs');
const path = require('path');

// Linting colors for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

let issues = 0;
let warnings = 0;

console.log('\n🔍 Running Code Linter...\n');

// Lint JavaScript file
function lintJavaScript() {
  console.log(`${colors.blue}Checking JavaScript...${colors.reset}`);

  const jsPath = path.join(__dirname, '../starter-files/script.js');
  const js = fs.readFileSync(jsPath, 'utf8');
  const lines = js.split('\n');

  // Check for var usage (should use const/let)
  if (js.includes('var ')) {
    console.log(`${colors.yellow}⚠${colors.reset}  Warning: Found 'var' declaration (use const or let)`);
    warnings++;
  }

  // Check for console.log (should be removed in production)
  const consoleLogCount = (js.match(/console\.log/g) || []).length;
  if (consoleLogCount > 0) {
    console.log(`${colors.yellow}⚠${colors.reset}  Warning: Found ${consoleLogCount} console.log statement(s)`);
    warnings++;
  }

  // Check for trailing whitespace
  lines.forEach((line, index) => {
    if (line.endsWith(' ') || line.endsWith('\t')) {
      console.log(`${colors.yellow}⚠${colors.reset}  Warning: Trailing whitespace on line ${index + 1}`);
      warnings++;
    }
  });

  console.log(`${colors.green}✓${colors.reset} JavaScript linting complete\n`);
}

// Lint CSS file
function lintCSS() {
  console.log(`${colors.blue}Checking CSS...${colors.reset}`);

  const cssPath = path.join(__dirname, '../starter-files/styles.css');
  const css = fs.readFileSync(cssPath, 'utf8');
  const lines = css.split('\n');

  // Check for color contrast (basic check)
  const hasWhiteText = css.includes('color: white') || css.includes('color: #fff');
  const hasLightBackground = css.includes('background-color: #f') || css.includes('background-color: white');

  if (hasWhiteText && hasLightBackground) {
    console.log(`${colors.yellow}⚠${colors.reset}  Warning: Potential contrast issue (white text on light background)`);
    warnings++;
  }

  // Check for important usage (should be avoided)
  if (css.includes('!important')) {
    console.log(`${colors.yellow}⚠${colors.reset}  Warning: Found !important declaration (use sparingly)`);
    warnings++;
  }

  // Check for trailing whitespace
  lines.forEach((line, index) => {
    if (line.endsWith(' ') || line.endsWith('\t')) {
      console.log(`${colors.yellow}⚠${colors.reset}  Warning: Trailing whitespace on line ${index + 1}`);
      warnings++;
    }
  });

  console.log(`${colors.green}✓${colors.reset} CSS linting complete\n`);
}

// Lint HTML file
function lintHTML() {
  console.log(`${colors.blue}Checking HTML...${colors.reset}`);

  const htmlPath = path.join(__dirname, '../starter-files/index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Check for missing alt attributes on images
  const imgTags = html.match(/<img[^>]*>/g) || [];
  imgTags.forEach(tag => {
    if (!tag.includes('alt=')) {
      console.log(`${colors.yellow}⚠${colors.reset}  Warning: Image tag missing alt attribute`);
      warnings++;
    }
  });

  // Check for inline styles (should use CSS file)
  if (html.includes('style=')) {
    console.log(`${colors.yellow}⚠${colors.reset}  Warning: Found inline styles (use external CSS)`);
    warnings++;
  }

  // Check for accessibility
  if (!html.includes('lang=')) {
    console.log(`${colors.yellow}⚠${colors.reset}  Warning: Missing lang attribute on html tag`);
    warnings++;
  }

  console.log(`${colors.green}✓${colors.reset} HTML linting complete\n`);
}

// Run all linters
lintJavaScript();
lintCSS();
lintHTML();

// Print summary
console.log('='.repeat(50));
console.log(`\n📊 Linting Summary:`);
console.log(`${colors.red}Issues: ${issues}${colors.reset}`);
console.log(`${colors.yellow}Warnings: ${warnings}${colors.reset}`);
console.log();

if (issues > 0) {
  console.log(`${colors.red}❌ Linting failed. Please fix the issues above.${colors.reset}\n`);
  process.exit(1);
} else if (warnings > 0) {
  console.log(`${colors.yellow}⚠ Linting passed with warnings. Consider addressing them.${colors.reset}\n`);
  process.exit(0);
} else {
  console.log(`${colors.green}✅ Linting passed! Code looks great.${colors.reset}\n`);
  process.exit(0);
}
