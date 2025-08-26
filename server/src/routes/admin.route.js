import Router from 'express';
import { athunticateJwt, isAdmin } from '../middleware/auth.middleware.js';

import { deleteUser,getAllUser } from '../controller/admin.controller.js';

const router = Router();

router.delete("/delete-user/:id",athunticateJwt,isAdmin,deleteUser)
router.get("/get-user",athunticateJwt,isAdmin,getAllUser)

export default router;