const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  res.send(index.html);
});

app.get("/api/workouts", async (req, res) => {
  try {
    const allWorkouts = await db.workouts.find({});
    res.json(allWorkouts);
  } catch (err) {
    res.json(err);
  }
});

/* app.get("api/workouts", (req, res) => {
  db.workouts
    .find({})
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.json(err);
    });
}); */

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
