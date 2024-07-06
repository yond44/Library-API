/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - code
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the member
 *         code:
 *           type: string
 *           description: The code of the member
 *         name:
 *           type: string
 *           description: The name of the member
 *         penalized:
 *           type: date
 *           description: Date when the member was penalized
 */

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API endpoints for managing members
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Returns a list of all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 *       500:
 *         description: Some server error
 */
const express = require("express");
const router = express.Router();
const { getMembers } = require("./controller");

router.get("/members", getMembers);

module.exports = router;
