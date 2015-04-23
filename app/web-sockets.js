module.exports = function(webServer) {
  "use strict";

  var
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ server: webServer });

  wss.on("connection", function(ws) {

    logger.info("web sockets open");

    ws.on("error", function(data) {
      logger.error("web sockets error");
    });

    ws.on("close", function(data) {
      logger.info("web sockets closed");
    });

    ws.on("message", function(msg) {

      var data = JSON.parse(msg);
      if (data.messageType === "error") {
        logger.error(data.errorMessage);
      }
      ws.send(JSON.stringify({
        status: "ACK"
      }));

    });
  });

  return webServer;

};
