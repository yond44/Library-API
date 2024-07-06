const mongoose = require("mongoose");
const config = require("../config");
const optionConnection = {
  dbName: config.db,
};

const db = mongoose.createConnection(config.mongoURL, optionConnection);

module.exports = {
  checkConnection: () => {
    db.on("error", (err) => {
      console.log(err);
      mongoose.connection.close();
    });
    db.once("connected", () => {
      console.log("Database connected");
    });
  },
  db,
};
