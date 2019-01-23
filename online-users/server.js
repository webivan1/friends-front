const path = require('path');
const fs = require('fs');
const app = require('express')();
const redis = require('redis');
const config = require(path.resolve('online-users/config.json'));

const port = config.port || 6002;
const secure = config.secure || false;
const client = redis.createClient(config.redis || {});

let server = null;

if (secure === true) {
  server = require('https').createServer({
    key: fs.readFileSync(config.secureKey),
    cert: fs.readFileSync(config.secureCert)
  }, app);
} else {
  server = require('http').Server(app);
}

const io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('send.user', function (user) {
    client.get(`user.online.${user}`, function (err, reply) {
      if (reply !== null) {
        io.emit(`is.online.${user}`);
      } else {
        io.emit(`is.disconnect.${user}`);
      }
    });
  });
});

server.listen(port, function () {
  console.log('listening on *:' + port);
});