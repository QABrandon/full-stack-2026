# Static Files Demo

A simple Express.js application demonstrating how to serve static files (CSS, JavaScript, images) using Express middleware.

## Important: Port Conflict

**Before starting this demo, shut down any other servers running on port 3500.**

1. Stop other terminal sessions that might be running Express servers.

2. If step 1 doesn't work, check for running processes:
```bash
npx kill-port 3500
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3500`

## Project Structure

```
static-files-demo/
├── index.js                   # Main server file
├── package.json
└── public/                    # Static files directory
    ├── css/
    │   └── style.css          # Stylesheet
    └── js/
        └── app.js             # JavaScript file
```

## How Static Files Work

### Express Static Middleware
```javascript
app.use(express.static('public'));
```

This single line tells Express to:
- Serve any file from the `public` directory
- Make files accessible via their path relative to `public`
- Handle all file types automatically (CSS, JS, images, etc.)

### File Access Patterns
- **Physical path**: `public/css/style.css`
- **URL path**: `http://localhost:3500/css/style.css`
- **HTML reference**: `<link rel="stylesheet" href="/css/style.css">`

## Testing the Demo

### 1. Visit the Main Page
Open `http://localhost:3500/` in your browser to see:
- HTML page with CSS styling applied
- JavaScript console messages
- Interactive heading (click to change color)

### 2. Test Direct File Access
Try accessing static files directly:
- `http://localhost:3500/css/style.css` - View the CSS file
- `http://localhost:3500/js/app.js` - View the JavaScript file

### 3. Browser Developer Tools
Open browser DevTools and check:
- **Network tab**: See CSS and JS files loading
- **Console tab**: See JavaScript messages confirming files loaded
- **Elements tab**: Inspect applied CSS styles

## Key Features Demonstrated

## Learning Points

1. **express.static()** middleware serves files from a directory
2. **Public directory** is the standard name for static assets
3. **URL paths** match the folder structure inside public
4. **HTML references** use absolute paths from the domain root
5. **Browser caching** is handled automatically by Express

## Common Use Cases

- **CSS files** for styling web pages
- **JavaScript files** for client-side functionality
- **Images** for logos, photos, icons
- **Downloads** like PDFs, documents
- **Fonts** for custom typography

## Notes

- Server runs on port 3500 to avoid conflicts with other demos
- All files in `public` directory are publicly accessible
- No authentication or access control on static files
- Files are served with appropriate MIME types automatically
- Great for development and simple static content hosting