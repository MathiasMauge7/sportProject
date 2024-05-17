import { NewProduit } from "./../entities/Produit";
import { ProduitRepository } from "../../infrastructure/repositories/ProduitRepository";

export class ProduitService {
  private produitRepository: ProduitRepository;

  constructor() {
    this.produitRepository = new ProduitRepository();
  }

  getProduitById(id: string) {
    if (!id) return;
    return this.produitRepository.getProduitById(id);
  }

  getProduitByAchatId(id: string) {
    if (!id) return;
    return this.produitRepository.getProduitByAchatId(id);
  }

  deleteProduitById(id: string) {
    if (!id) return;
    return this.produitRepository.deleteProduitById(id);
  }

  createProduit(produit: NewProduit) {
    if (!produit) return;
    return this.produitRepository.createProduit(produit);
  }

  getAllProduits() {
    return this.produitRepository.getAllProduits();
  }
}
