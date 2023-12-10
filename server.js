const express = require("express");
require("dotenv").config({ path: 'config/.env' });
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const app = express();
app.use(express.json());
const userSchema = require("./models/user");
const port = 3000;
app.listen(port, () => {
  console.log("the server is running on port ", port);
});
app.get("/", async (req, res) => {
  try {
    const user = await userSchema.find();
    if (!user) {
      res.send("there is no user in this collection");
    }
    res.status(200).send(user);
  } catch (e) {
    res.send({ message: e.message });
  }
});
// http://www.localhost:3000/create

app.post("/create", async (req, res) => {
  try {
    const data = req.body;
    const user = await userSchema.create(data);
    res.status(201).send(user);
  } catch (e) {
    res.send({ message: e.message });
  }
});
// http://www.localhost:3000/update/

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await userSchema.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!user) {
      res.status(404).send("could not update");
    } else {
      res.status(200).send(user);
    }
  } catch (e) {
    res.send({ message: e.message });
  }
});
// http://www.localhost:3000/delete/
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userSchema.findByIdAndDelete(id);
    if (!user) {
      res.status(404).send("could not delete");
    } else {
      res.status(200).send(user);
    }
  } catch (e) {
    res.send({ message: e.message });
  }
});
