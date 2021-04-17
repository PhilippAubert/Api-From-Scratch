require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Students = require("./models/students");
const Course = require("./models/course");

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  const { method, url } = req;
  console.log("Middleware running now!");
  console.log(`${method} for the path "${url}" of db "exercise"`);
  next();
});

app.get("/course", (req, res) => {
  Course.find()
    .then((course) => {
      res.json(course);
      res.status(200);
      console.log(course);
    })
    .catch((error) => {
      res.status(500);
      res.json({ error: `Internal Server Error ${error}` });
    });
});

app.get("/course/:courseId", (req, res) => {
  const { courseId } = req.params;

  Course.findById(courseId)
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
  Course.findById(req.params.id)
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
  Course.findById(req.params.id)
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
    .then((course) => {
      res.status(200);
      res.json(course);
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });
});

app.post("/course", (req, res) => {
  Course.create({
    name: req.body.name,
    type: req.body.type,
    location: req.body.location,
  })
    .then((course) => {
      res.status(201);
      res.status(course);
      console.log(course);
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });
});

app.post("/students", (req, res) => {
  const { courseId } = req.params;
  Students.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    location: req.body.location,
    course: req.body.course,
  })
    .then((student) => {
      res.status(201);
      res.status(student);
      console.log(student);
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });
});

app.delete("/courses/:coursesId", (req, res) => {
  const { courseId } = req.params;
  Course.findByIdAndDelete(courseId).then(() => {
    res.status(204);
    res.json("course eleted");
  });
});

app.delete("students/:studentsId", (req, res) => {
  const { studentsId } = req.params;
  Students.findByIdAndDelete(studentsId).then(() => {
    res.status(204);
    res.json("student deleted");
  });
});

mongoose.connect("mongodb://localhost/exercise", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongodb = mongoose.connection;

mongodb.on("open", () => {
  app.listen(4001, () => {
    console.log("Listening on http://localhost:4001");
  });
});
