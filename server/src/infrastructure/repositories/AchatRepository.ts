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
            // On récupère le client correspondant à l'achat, et on décide de comment on veut le formater
            id: clients.id, // On récupère l'id du clien et son nom
            name: clients.name,
          },
          date: achats.date,
        })
        .from(achats)
        .leftJoin(
          // Nous voulons faire un LEFT JOIN entre la table achats et la table produits
          produits,
          eq(achats.id, produits.id)
        )
        .leftJoin(
          // Nous voulons faire un LEFT JOIN entre la table achats et la table clients
          clients,
          eq(achats.id, clients.id) // Lorsque l'id du client correspondant à l'achat est égal à l'id du client recherché
        )
        .where(
          // Nous cherchons l'achat en fonction de son id
          eq(achats.id, id)
        )
        .execute();
    } catch (error) {
      console.error(error);
      throw new Error("Impossible de récupérer le post");
    }
  }

  // Récupérer tout les achats existants dans notre db
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
