const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

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

app.get("/api/workouts", (req, res) => {
  db.Workout.find({}, (err, data) => {
    // If statement to catch errors
    if (err) {
      res.send(err);
      // Display Data in JSON data format
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

//get one workout by the id and push a new exercise into the exercises array
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.update(
    {
      _id: req.params.id,
    },
    {
      $push: {
        exercises: req.body,
      },
    },
    (err, data) => {
      // If statement to catch errors
      if (err) {
        res.send(err);
        // Display Data in JSON data format
      } else {
        res.json(data);
      }
    }
  );
});

app.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body, (err, data) => {
    // If statement to catch errors
    console.log(req.body);
    if (err) {
      res.send(err);
      // Display Data in JSON data format
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
