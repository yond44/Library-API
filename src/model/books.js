const mongoose = require("mongoose");
const { db } = require("../config/db");

const books = new mongoose.Schema({
  code: { type: String, required: [true, "Code tidak boleh kosong"] },
  title: { type: String, required: [true, "Title tidak boleh kosong"] },
  author: { type: String, required: [true, "Author tidak boleh kosong"] },
  stock: { type: Number, required: [true, "Stock tidak boleh kosong"] },
});

module.exports = db.model("Books", books, "books");
