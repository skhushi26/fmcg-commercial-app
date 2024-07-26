import express from "express";
import { getUsers } from "../controllers/userController";
import { protect, admin } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to retrieve users
 */
router.route("/").get(protect, admin, getUsers);

export default router;
