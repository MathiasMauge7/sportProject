import express from "express";
import {
  createAchat,
  getAllAchats,
  getAchatById,
  getAchatByClientName,
} from "../controllers/AchatController";

const router = express.Router();

router.get("/", getAllAchats);
router.get("/:id", getAchatById);
router.get("/client", getAchatByClientName);
router.post("/", createAchat);

export default router;
