import { produits } from './../../schema/produits';
import { Request, Response } from "express";
import { response } from "../../../../utils/response"; 
import { ProduitService } from "../../../../domain/services/ProduitService"; 
import { NewProduit } from '../../../../domain/entities/Produit';

const produitService = new ProduitService();

/**
 * afficher à l'écran l'ensemble des commentaires d'un article filtré via son id  
 * @param req - requête http gérée via  express
 * @param res - reponse http gérée par express 
 * @see [super explication en +](https://typedoc.org/tags/see/)
 */
export const getProduitByAchatId = async (req: Request, res: Response) => {
    const { id } = req.params;
      if (!id) {
    response(res, { statusCode: 404, message: "Aucun produit à cette id." });
  } else {
    const produits = await produitService.getProduitByAchatId(id);
    response(res, { statusCode: 200, data: produits, message: "OK" });
  }
};

export const getProduitById = async (req: Request, res: Response) => {
  const produitId = req.params.id;
  const produit = await produitService.getProduitById(produitId);
  if (!produit) {
    response(res, { statusCode: 404, message: "Produit introuvable" });
  } else {
    console.table(produit[0]);
    response(res, { statusCode: 200, message: "OK", data: produit[0] });
  }
};


export const deleteProduitById = async (req: Request, res: Response) => {
    const { id } = req.params;
    await produitService.deleteProduitById(id);
    response(res, { statusCode: 200, message: 'Comment deleted' });
}

// localhost:8000/comments/:idDeLarticle
export const createProduit = async (req: Request, res: Response) => {
    const { produit }: NewProduit = req.params;
    await produitService.createProduit(produit);
    response(res, { statusCode: 201, message: 'Produit created' });
}

export const getAllProduits = async (req: Request, res: Response) => {
  const produits = await produitService.getAllProduits();
  response(res, {
    statusCode: 200,
    message: "OK",
    data: produits,
  });
};