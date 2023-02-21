const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const multer = require("multer");
const { v4: uuid } = require("uuid");
require("./database.js");
const { format } = require("timeago.js");

//SETTINGS
app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/img/uploads"),
  filename: (req, file, cb, filename) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});
app.use(multer({ storage: storage }).single("image"));

// GLOBAL VARIABLES
app.use((req, res, next) => {
  app.locals.format = format;
  next();
});
// ROUTES
app.use(require("./routes/index.js"));

// STATIC FILES

app.get("/", (req, res) => res.send("Hello World!"));

//START SERVER
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}!`);
});
