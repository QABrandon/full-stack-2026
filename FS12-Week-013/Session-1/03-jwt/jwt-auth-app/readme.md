1. npm install
2. open package.json
3. click debug
4. add breakpoints at login/ signup /dashboard/profile
5. node server.js
6. open localhost:3000 in your browser
7. Signup
8. Login
9. Try the profile and dashboard buttons
10. Invalidate the JWT by putting a breakpoint on line 128 of app.js (FROM within Chrome Dev Tools under the "Sources")
    - Click the profile button again
    - go to console and modify the authToken variable
    - authToken = "12345"
    - hit continue and notice the error
11. Try to do the same for the dashboard endpoint by identifying teh line of code within app.js to target 