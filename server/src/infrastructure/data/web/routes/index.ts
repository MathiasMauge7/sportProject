import express from "express";
import achatRoutes from "./achatRoutes";
import clientRoutes from "./clientRoutes";
import produitRoutes from "./produitRoutes";
import promotionRoutes from "./promotionRoutes";

const router = express.Router();

router.use("/achats", achatRoutes);
router.use("/clients", clientRoutes);
router.use("/produits", produitRoutes);
router.use("/produits", promotionRoutes);

export default router;
