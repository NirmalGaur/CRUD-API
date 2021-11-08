const { request } = require("express");
const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

// Get All Members:
router.get("/", (req, res) => {
  //Using the router, when we handle the request we use router.get instead of app.get
  res.json(members);
});

// Get Single Member: get request
router.get("/:id", (req, res) => {
  //:id is a URL parameter and we can use req object to grab whatever is in there

  const found = members.some((member) => member.id === Number(req.params.id)); // the array method some would give True or False depending on the condition
  if (found) {
    res.json(members.filter((member) => member.id === Number(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with id ${req.params.id}` });
  }
});

// Create Member: post request
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(), //generates a random universal id
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }
  members.push(newMember);
  //res.json(members);
  res.redirect("/");
}); // Whenever you create something on a server, or adding something to a database, you have to make a post request instead of get
// We have used the '/' which we have already used above but with different method, so it is allowed

//Update Member: put request
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === Number(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "Member Updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with id ${req.params.id}` });
  }
});

// Delete Member: delete request
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));

  if (found) {
    res.json({
      msg: "Member Deleted",
      members: members.filter((member) => member.id !== Number(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `No member with id ${req.params.id}` });
  }
});

module.exports = router;
