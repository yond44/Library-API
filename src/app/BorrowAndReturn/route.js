/**
 * @swagger
 * components:
 *   schemas:
 *     BorrowedBook:
 *       type: object
 *       required:
 *         - member_code
 *         - book_code
 *         - member_name
 *         - title
 *         - borrowing_date
 *         - returning_date
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the borrowed book
 *         member_code:
 *           type: string
 *           description: The code of the member
 *         book_code:
 *           type: string
 *           description: The code of the book
 *         member_name:
 *           type: string
 *           description: The name of the member
 *         title:
 *           type: string
 *           description: The title of the book
 *         borrowing_date:
 *           type: string
 *           format: date
 *           description: The date when the book was borrowed
 *         returning_date:
 *           type: string
 *           format: date
 *           description: The date when the book is expected to be returned
 */

/**
 * @swagger
 * tags:
 *   name: Borrowing
 *   description: API endpoints for borrowing and returning books
 */

/**
 * @swagger
 * /borrowed-books:
 *   get:
 *     summary: Returns a list of all borrowed books
 *     tags: [Borrowing]
 *     responses:
 *       200:
 *         description: A list of borrowed books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BorrowedBook'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /borrow/{id}:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrowing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The _id of the member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book_code:
 *                 type: string
 *                 description: The code of the book to be borrowed
 *     responses:
 *       201:
 *         description: Book borrowed successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /return/{id}:
 *   delete:
 *     summary: Return a borrowed book
 *     tags: [Borrowing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The _id of the borrowed book entry
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */

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
