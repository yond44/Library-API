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

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books
 */
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns a list of all available books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */
const express = require("express");
const router = express.Router();
const { getBooks } = require("./controller");

router.get("/books", getBooks);

module.exports = router;
