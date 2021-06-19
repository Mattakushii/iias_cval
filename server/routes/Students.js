const express = require("express");
const students = express.Router();
const studentsController = require("../controllers/StudentsController")

students.get("/student", studentsController.getStudent);
students.get("/example", studentsController.getExample)

module.exports = students;
