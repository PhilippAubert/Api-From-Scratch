require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Students = require("./models/students");
const { PostSchema } = require("./models/course");

const app = express();
const Courses = mongoose.model("course", PostSchema);
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  const { method, url } = req;
  console.log("Middleware running now!");
  console.log(`${method} ${url} of db "exercise"`);
  next();
});

app.get("/course", (req, res) => {
  Courses.findOne({}, (error, data) => {
    res.json(data);
  });
  // .then((data) => {
  //   res.json(data);
  //   res.status(200);
  //   console.log(data);
  // })
  // .catch((error) => {
  //   res.status(500);
  //   res.json({ error: `Internal Server Error ${error}` });
  // });
});

app.get("/course/:courseId", (req, res) => {
  const { courseId } = req.params;

  Courses.findById(courseId)
    .then((post) => {
      res.status(200);
      res.json(post);
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Internal Server error ${error}`,
      });
    });
});

app.get("/course/:id/students", (req, res) => {
  Courses.findById(req.params.id)
    .then((post) => {
      res.status(200);
      res.json(post);
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Internal Server error ${error}`,
      });
    });
});

app.get("/course/:id/students/:id", (req, res) => {
  Courses.findById(req.params.id)
    .then((post) => {
      res.status(200);
      res.json(post);
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Internal Server error ${error}`,
      });
    });
});

app.get("/students", (req, res) => {
  Students.find()
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });
});

mongoose.connect("mongodb://localhost:27017/exercise", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongodb = mongoose.connection;

mongodb.on("open", () => {
  app.listen(4001, () => {
    console.log("Listening on http://localhost:4001");
  });
});
