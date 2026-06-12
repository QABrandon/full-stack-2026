1. CORS -> middleware to prevent Cross Origin Resource Sharing - https://expressjs.com/en/resources/middleware/cors.html

- From browser can a particular frontend (domainA.com) talk to a different backend (domainB.com)
- Fullstack project - limit our frontend being able to be the only website that access our backend
-

2. helmet -> https://www.npmjs.com/package/helmet
   - by default helps with several security issues
3. rate limiting - https://www.npmjs.com/package/express-rate-limit?
   - limit resource spend
     - someones tries to hit your api 1000000 - the amount of money it costs to process could be high
   - reduce attacks on your server
     - Cloudflare - DDOS - Distributed Denial of Service attack
       - DomainA.com gets pinged by 1000 zombie bots and no normal human client can now access the website
         - SharkTank / Dragon's Den - Pitch products/service to get investments into
           - they mom/pop small website to sell the product
           - show goes up on national television
           - 10000s of people hit the site at once
