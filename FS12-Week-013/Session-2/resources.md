If you can't run an application because of:
"Error: listen EADDRINUSE: address already in use :::3000"

1. Change the port on your settings (either in server.js, or .env etc)
2. Terminate/kill all of your running terminals
3. From any directory in the terminal:
```bash
npx kill-port <port-number>
```
