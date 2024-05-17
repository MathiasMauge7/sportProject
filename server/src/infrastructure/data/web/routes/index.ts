import express from "express";
import achatRoutes from "./achatRoutes";
import clientRoutes from "./clientRoutes";
import produitRoutes from "./produitRoutes"

const router = express.Router();

router.use("/achats", achatRoutes);
// router.use('/comments', commentRoutes)
router.use("/clients", clientRoutes);
router.use("/produits", produitRoutes);

export default router;
