const express = require("express");
const students = express.Router();
const studentsController = require("../controllers/StudentsController")

students.get("/student", studentsController.getStudent);

module.exports = students;
