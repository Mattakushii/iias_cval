const jwt = require("jsonwebtoken");

const logger = require('./models/log4js')

module.exports = {
    verifyJWT: (req, res) => {
        const token = req.headers["x-access-token"];
      
        if (!token) {
          logger.info("Token not found");
        } else {
          jwt.verify(token, "zxc", (err) => {
            if (err) {
              logger.error("Token not valid");
              return res.send({ isAuth: false, message: "Token error" });
            } else {
              return res.send({ isAuth: true, message: "Token proceed" });
            }
          });
        }
      }
}