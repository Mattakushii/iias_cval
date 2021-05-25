const jwt = require("jsonwebtoken");
const db = require("../models/db");
const logger = require("../models/log4js");

const findUser = (login, password) => {
  return `SELECT * FROM students WHERE login = "${login}" AND password = "${password}"`;
};

const updateToken = (token, login, password) => {
  return `UPDATE students SET token = "${token}" WHERE login = "${login}" AND password = "${password}"`;
};

module.exports = {
  login: (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    db.query(findUser(login, password), (err, result) => {
      if (err) {
        logger.error("Can't find user => Database error");
        return res.send({ err: err });
      }

      if (result.length > 0) {
        logger.info("Login success");
        const token = jwt.sign({ id: result.id }, "zxc", { expiresIn: 10000 });
        db.query(updateToken, (err, result) => {
          if (!err) {
            logger.info("Token db update");
          } else {
            logger.error("Token update error");
          }
        });
        return res.json({
          isAuth: true,
          id: result[0].id,
          first_name: result[0].first_name,
          second_name: result[0].second_name,
          token: token,
        });
      } else {
        logger.error("Login auth error");
        return res.json({ isAuth: false, message: "invalid user or password" });
      }
    });
  },

  isAuth: (req, res) => {
    logger.info("Auth checked");
    res.send("Auth success");
  },
};
