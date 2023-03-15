const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const users = [
  {
    email: "abc@abc.ca",
    firstName: "ABC",
    id: "c30df69d-07fd-4fa7-bf83-a4930b6c8720",
  },
  {
    email: "xyz@xyz.ca",
    firstName: "XYZ",
    id: "393a9655-afbe-4eee-8f3b-2ad11d846a39",
  },
];

router.get("/users", (req, res) => {
  if (!users || users.length === 0) {
    return res.status(404).send("No users found");
  }
  res.status(200).json({
    message: "Success",
    data: users,
  });
});

router.post("/add", (req, res) => {
  const bodyData = req.body;
  if (bodyData?.email && bodyData?.firstName) {
    const id = uuidv4();
    const user = {
      email: bodyData?.email,
      firstName: bodyData?.firstName,
      id: id,
    };
    users.push(user);
    res.status(201).json({
      message: "User added",
      success: true,
    });
  } else {
    res.status(500).json({
      message: "error user cannot be created",
    });
  }
});

router.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((user) => user.id === userId);

  if (!user) {
    res.status(404).send("User Not Found");
    return;
  }

  res.status(200).send(user);
});

router.put("/update/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((user) => user.id === userId);

  if (!user) {
    res.status(404).send("User Not Found");
    return;
  }

  if (req.body.email) {
    user.email = req.body.email;
  }

  if (req.body.firstName) {
    user.firstName = req.body.firstName;
  }

  res.status(200).send({
    message: "User updated",
    success: true,
  });
});

module.exports = router;
