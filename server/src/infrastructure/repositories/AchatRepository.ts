import { db } from "../data";
import { achats, clients, produits } from "../data/schema/index";
import { Achat, NewAchat, AchatColumns } from "../../domain/entities/Achat";
import { eq } from "drizzle-orm";

export class AchatRepository {
  getAchatById(id: string): Promise<any> {
    try {
      return db
        .select({
          id: achats.id,
          amount: achats.amount,
          client: {
            // On récupère l'auteur du post, et on décide de comment on veut le formater
            id: clients.id, // On récupère l'id de l'auteur, et son nom d'utilisateur
            name: clients.name,
          },
          date: achats.date,
        })
        .from(achats)
        .leftJoin(
          // Nous voulons faire un LEFT JOIN entre la table achats et la table produits
          produits,
          eq(achats.id, produits.id) // Lorsque l'id du post est égal à l'id du post dans les commentaires
        )
        .leftJoin(
          // Nous voulons faire un LEFT JOIN entre la table achats et la table clients
          clients,
          eq(achats.id, clients.id) // Lorsque l'id de l'auteur du post est égal à l'id de l'utilisateur
        )
        .where(
          // Nous cherchons le post en fonction de son id
          eq(achats.id, id)
        )
        .execute();
    } catch (error) {
      console.error(error);
      throw new Error("Impossible de récupérer le post");
    }
  }

  // Récupérer tout les posts existants dans notre posts.json
  async getAllAchats(): Promise<any> {
    try {
      return db.query.achats.findMany({
        // On sélectionne les colonnes que l'on veut récupérer
        columns: {
          id: true,
          client: true,
          amount: true,
          date: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Impossible de récupérer tout les achats");
    }
  }

  //   Supprimer des achats spécifiques grâce à leur id
  deleteAchat(id: string) {
    try {
      return db.delete(achats).where(eq(achats.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer l'achat");
    }
  }

  //   Sauvegarder un achat dans la db
  saveAchat(achat: NewAchat) {
    try {
      return db
        .insert(achats)
        .values(achat)
        .returning({ id: achats.id })
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de sauvegarder l'achat");
    }
  }

  getAchatByClientName(name: string) {
    try {
      return db.query.achats.findFirst({
        where: eq(achats.client, name),
        columns: {
          id: true,
        },
      });
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer le(s) achat(s) du client");
    }
  }
}
