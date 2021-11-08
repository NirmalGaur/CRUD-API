const express = require("express");

const path = require("path");

const exphbs = require("express-handlebars");

const logger = require("./middleware/logger");

const members = require("./Members");

const app = express();

//Initialising Middleware:
// SHOW: app.use(logger);

// Handlebars Middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//Initialising Body Parser Middleware
app.use(express.json()); //handles raw json
app.use(express.urlencoded({ extended: false })); //handles url encoded data

//Homepage Route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Members App",
    members,
  })
);

//Setting static folder:
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
app.use("/api/members", require("./routes/api/members")); // first we put the route that we want and then we set the second parameter requiring the file we created for it

const PORT = process.env.PORT || 5000; //when we deploy, the server is gonna have the port number in an environment variable

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
