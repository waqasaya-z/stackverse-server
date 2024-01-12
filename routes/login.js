const express = require("express");
const routes = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { validationLogInSchema } = require("../validation/validate");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

routes.post("/", async (req, res) => {
  const { formEmail, formPassword } = await req.body;

  try {
    const isValid = validationLogInSchema.parse(req.body);

    if (!isValid) return res.status(400).send("Bad Request");

    const user = await prisma.user.findUnique({
      where: {
        email: formEmail
      },
      select: { id: true, password: true, firstName: true, LastName: true }
    });

    if (!user) return res.status(401).send("Invalid Email or Password");

    const passwordMatch = await bcrypt.compare(formPassword, user.password);
if (passwordMatch) {
      const userInfo = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.LastName
      };
    

      const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);
      return res.json({ accessToken }).status(201);
    } else {
      return res.status(401).send("Invalid Email or password");
    }
  } catch (e) {
    return res
      .status(500)
      .send(e.message || "Error during login, try again later");
  }
});

module.exports = routes;