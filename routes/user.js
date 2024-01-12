const { PrismaClient } = require("@prisma/client");
const express = require("express");
const routes = express.Router();
const authenticateToken = require("../middleware/auth");

const prisma = new PrismaClient();

routes.get("/me", authenticateToken, async (req, res) => {
  const { id, firstName, lastName } = req.user;

  const user = {
    id,
    firstName,
    lastName
  };
try {

  return  res.json({ user }).status(200);
} catch (error) {
  res.send(error.message || 'Something is not right').status(500)
}
});

module.exports = routes;
