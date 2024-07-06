const express = require("express");
const router = express.Router();
const {
  getBorrowedBooks,
  borrowingBook,
  returningBook,
} = require("./controller");

router.get("/borrowed-books", getBorrowedBooks);
router.post("/borrow/:id", borrowingBook);
router.delete("/return/:id", returningBook);

module.exports = router;
