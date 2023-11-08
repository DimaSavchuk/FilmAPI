const express = require("express");
const path = require("path");
const configPath = path.join(__dirname, "..", "config", ".env");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { engine } = require("express-handlebars");

const errorHandler = require("./middlewares/errorHandler");
const UserModel = require("./models/UserModel");
const RoleModel = require("./models/RoleModel");
const sendEmail = require("./services/sendEmail");

const authMiddleware = require("./middlewares/authMiddleware");

const connectDB = require("../config/connectDB");
const exp = require("constants");

require("colors");
require("dotenv").config({ path: configPath });

const app = express();

app.use(express.static("public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "backend/views");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/sended", async (req, res) => {
  try {
    await sendEmail(req.body);
    res.render("sended", {
      message: "Contact send OK",
      user: req.body.userName,
      email: req.body.userEmail,
      text: req.body.userText,
    });
  } catch (error) {
    res.status(400).json({ code: 400, message: error.message });
  }
});

app.use("/api/v1", require("./routes/filmsRoutes"));
app.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Provide all files");
    }
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      res.status(400);
      throw new Error("Error registration");
    }

    const hashPassword = bcrypt.hashSync(password, 5);
    const roles = await RoleModel.findOne({ title: "ADMIN" });

    const user = await UserModel.create({
      ...req.body,
      password: hashPassword,
      roles: [roles.title],
    });
    res.status(201).json({
      code: 201,
      message: "success",
      data: { email: user.email },
    });
  })
);

app.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Provide all files");
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("Invalid login or password");
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      res.status(400);
      throw new Error("Invalid login or password");
    }

    const token = generateToken({
      friends: ["Sergii", "Dima", "Liza"],
      id: user._id,
      roles: user.roles,
    });

    user.token = token;

    await user.save();

    res.status(200).json({
      code: 200,
      message: "success",
      data: { email: user.email, token },
    });
  })
);

app.get(
  "/logout",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user.id);
    user.token = null;
    await user.save();

    res.status(200).json({
      code: 200,
      message: "logout success",
    });
  })
);

function generateToken(data) {
  const payload = { ...data };
  return jwt.sign(payload, "cat", { expiresIn: "8h" });
}

app.use(errorHandler);

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green.italic.bold);
});
