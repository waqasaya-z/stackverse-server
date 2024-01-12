const express = require("express");
require("dotenv").config();
const cors = require("cors");
const register = require("./routes/register");
const login = require("./routes/login");
const user = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/user", user);

let PORT = process.env.PORT_NO || 3002;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
