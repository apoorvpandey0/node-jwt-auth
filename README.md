# node-jwt-auth
This app simply implements three endpoints
1. /register - creates new user if not present in MongoDB atlas and returns a JWT token
2. /login - returns a JWT token if correct credentials of an existing user are provided
3. /welcome - returns welcome if correct JWT token is given in headers
