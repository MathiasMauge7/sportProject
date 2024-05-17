import { db } from "../data";
import { Produit, NewProduit } from "../../domain/entities/Produit";
import { achats, clients, produits } from "../data/schema";
import { and, eq } from "drizzle-orm";

/**
 * Repository qui gère le CRUD des commentaires
 */
export class ProduitRepository {

    getProduitById(id: string) {
        try {
            return db.select({
                id: produits.id,
                name: produits.name,
                price: produits.price,
                stock: produits.stock,
                category: produits.category,
                createdAt: produits.createdAt,
                
            }).from(produits)
            .execute();
        } catch(err) {
            console.error(err);
            throw new Error('Impossible de récupérer le produit');
        }
    }

    getProduitByAchatId(id: string) {
        try {
            return db.select({
                id: produits.id,
                name: produits.name,
                price: produits.price,
                stock: produits.stock,
                category: produits.category,
                createdAt: produits.createdAt,
            })
            .from(produits)
            .leftJoin(achats, eq(produits.id, achats.id))
            .where(eq(achats.id, id))
            .execute();
        } catch(err) {
            console.error(err);
            throw new Error('Impossible de supprimer le produit');
        }
    }

    deleteProduitById(id: string) {
        try {
            return db.delete(produits).where(
                and(
                    eq(produits.id, id)
                )
            ).execute();
        } catch(err) {
            console.error(err);
            throw new Error('Impossible de supprimer le produit');
        }
    }

    createProduit(produit: NewProduit) {
        try {
            return db.insert(produits).values(produit).execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de créer le produit');
        }
    }


    getAllProduits() {
        try {
            return db.select({
                id: produits.id,
                name: produits.name,
                price: produits.price,
                stock: produits.stock,
                category: produits.category,
                createdAt: produits.createdAt,
            }).from(produits)
            .execute();
        } catch(err) {
            console.error(err);
            throw new Error('Impossible de récupérer les produits');
        }
    }

}