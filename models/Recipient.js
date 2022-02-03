const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});

// we setting up sub document so we need to export it instead registering it with mongoose
// need to export it and import it in Survey.js

module.exports = recipientSchema;
