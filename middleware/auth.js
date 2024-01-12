const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null)
    return res.status(401).send("Access denied, No Token Provided.");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send('Forbidden');

    req.user = user;
    //req.user = payload provided to jwt
    next();
  });
  // Bearer TOKEN
}

module.exports = authenticateToken;
