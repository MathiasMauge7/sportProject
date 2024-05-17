import express from "express";
import {
  getAllPromotions,
  getPromotionById,
  savePromotion,
  deletePromotion,
} from "../controllers/PromotionController";

const router = express.Router();

router.get("/", getAllPromotions);
router.get("/:id", getPromotionById);
router.post("/create", savePromotion);
router.get("/delete/:id", deletePromotion);

export default router;
