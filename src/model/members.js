/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API endpoints for managing members
 */

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

const mongoose = require("mongoose");
const { db } = require("../config/db");

const members = new mongoose.Schema({
  code: { type: String, required: [true, "Code tidak boleh kosong"] },
  name: { type: String, required: [true, "Name tidak boleh kosong"] },
  penalized: { type: Date },
});

module.exports = db.model("Members", members, "members");
