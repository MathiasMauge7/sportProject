import express from "express";
import achatRoutes from "./achatRoutes";
import clientRoutes from "./clientRoutes";

const router = express.Router();

router.use("/achats", achatRoutes);
// router.use('/comments', commentRoutes)
router.use("/clients", clientRoutes);

export default router;
