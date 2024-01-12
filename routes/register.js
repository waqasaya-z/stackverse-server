const express = require("express");
const routes = express.Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { validationSchema } = require("../validation/validate");

const prisma = new PrismaClient();

routes.post("/", async (req, res) => {
  const user = await req.body;
  try {
    const isValid = validationSchema.parse(user);

    if (!isValid) return res.status(400).send("Bad Request");

    const email = await prisma.user.findUnique({
      where: {
        email: user.userEmail
      }
    });

    if (email) return res.status(401).send("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.hashPassword, salt);

    const data = await prisma.user.create({
      data: {
        firstName: user.firstName,
        LastName: user.lastName,
        email: user.userEmail,
        password: password
      },
      select: {
        email: true
      }
    });
   return res.status(201).send("Account created Successfully");
   
  } catch (err) {
    return res.status(501).send(err.message || "Error Registering");
  }
});

module.exports = routes;
