const mongoose = require("mongoose");
const { db } = require("../config/db");

const borrowedBooks = new mongoose.Schema(
  {
    member_code: {
      type: String,
      required: [true, "member_code tidak boleh kosong"],
    },
    book_code: {
      type: String,
      required: [true, "Books_code tidak boleh kosong"],
    },
    member_name: {
      type: String,
      required: [true, "member_name tidak boleh kosong"],
    },
    title: { type: String, required: [true, "Book_name tidak boleh kosong"] },
    borrowing_date: {
      type: Date,
      required: [true, "borrowing_date tidak boleh kosong"],
    },
    returning_date: {
      type: Date,
      required: [true, "returning_date tidak boleh kosong"],
    },
  },
  { versionKey: false }
);

module.exports = db.model("BorrowedBooks", borrowedBooks, "borrowedBooks");
