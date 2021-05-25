const express = require("express");
const app = express();

const server = require('http').Server(app)
const io = require('socket.io')(server,{
  cors:{
    origin: 'http://localhost:3000',
    method: ["GET", "POST"],
    allowEIO3: true
  }})

const logger = require('./models/log4js')

const authRoute = require("./routes/Auth");
const studentsRoute = require("./routes/Students")

const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

app.use('/api', authRoute)
app.use('/api', studentsRoute)

io.on('connection', socket => {
  logger.info("socket ready", socket.id)
  socket.on('disconnect', () => {
    logger.info(`Socket user ${socket.id} disconnect`)
  })
})

server.listen(PORT, () => {
  logger.info("Server started on port " + PORT);
});
