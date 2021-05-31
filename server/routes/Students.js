const express = require("express");
const students = express.Router();
const studentsController = require("../controllers/StudentsController")

students.get("/students", studentsController.getAllStudents);

module.exports = students;
