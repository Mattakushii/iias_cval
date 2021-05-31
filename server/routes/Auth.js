const express = require("express");
const auth = express.Router();

const middleware = require('../middleware')

const controller = require('../controllers/AuthContoller')

auth.post("/login", controller.login);

auth.get("/isAuth", middleware.verifyJWT, controller.isAuth);

module.exports = auth;
