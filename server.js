const express = require("express");

const path = require("path");

const exphbs = require("express-handlebars");

const logger = require("./middleware/logger");

const members = require("./Members");

const app = express();

// Initialising Middleware: (Global Middleware)
// SHOW: app.use(logger); // app.use accepts a function that takes req, res, next. Once this middleware runs, it calls next to run the next middleware below.

// Middleware specific to a single action: We can define this type of middleware by just putting it inside the app.get() function. app.get() accepts two things: one is the path, and then the list of different middlewares:
app.get("/users", auth, (req, res) => {
  console.log("Users Page");
  res.send("Users Page");
});
function auth(req, res, next) {
  if (req.query.admin === "true") {
    next(); // Go to the next middleware (above)
    return; // Note that without this 'return' there would be an error because once we call next() the middleware after it executes and then control returns back to the line after next(), due to which res.send is called twice here
  }
  res.send("No auth");
}

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
