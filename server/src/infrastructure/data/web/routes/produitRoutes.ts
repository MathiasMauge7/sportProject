import express from "express";
import {
    getAllProduits,
    getProduitById,
    createProduit,
    getProduitByAchatId,
    deleteProduitById
} from "../controllers/ProduitController";

const router = express.Router();

router.get("/", getAllProduits);
router.get("/:id", getProduitById);
router.post("/create", createProduit);
router.get("/achats/:id", getProduitByAchatId);
router.get("/delete/:id", deleteProduitById);

export default router;
