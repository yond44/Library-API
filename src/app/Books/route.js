/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - code
 *         - title
 *         - author
 *         - stock
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the book
 *         code:
 *           type: string
 *           description: The code of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         stock:
 *           type: number
 *           description: The stock of the book
 */

const express = require("express");
const router = express.Router();
const { getBooks } = require("./controller");

router.get("/books", getBooks);

module.exports = router;
