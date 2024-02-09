const mongoose = require("mongoose");

async function mongoDBConnection(url) {
  return mongoose.connect(url);
}

module.exports = {
  mongoDBConnection,
};
