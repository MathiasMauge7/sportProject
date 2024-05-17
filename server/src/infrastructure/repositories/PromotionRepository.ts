import { db } from "../data";
import { promotions } from "../data/schema/index";
import {
  Promotion,
  NewPromotion,
  PromotionColumns,
} from "../../domain/entities/Promotion";
import { eq } from "drizzle-orm";

export class PromotionRepository {
  getPromotionById(id: string): Promise<any> {
    try {
      return db
        .select({
          id: promotions.id,
          name: promotions.name,
          pourcent: promotions.pourcent,
          createdAt: promotions.createdAt,
          endingAt: promotions.endingAt,
        })
        .from(promotions)
        .where(
          // Nous cherchons la promotion en fonction de son id
          eq(promotions.id, id)
        )
        .execute();
    } catch (error) {
      console.error(error);
      throw new Error("Impossible de récupérer la promotion");
    }
  }

  // Récupérer toutes les promos existantes dans notre db
  async getAllPromotions(): Promise<any> {
    try {
      return db.query.promotions.findMany({
        // On sélectionne les colonnes que l'on veut récupérer
        columns: {
          id: true,
          name: true,
          pourcent: true,
          createdAt: true,
          endingAt: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Impossible de récupérer toutes les promos");
    }
  }

  //   Supprimer des promotions spécifiques grâce à leur id
  deletePromotion(id: string) {
    try {
      return db.delete(promotions).where(eq(promotions.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer la promotion");
    }
  }

  //   Sauvegarder une promotion dans la db
  savePromotion(promotion: NewPromotion) {
    try {
      return db
        .insert(promotions)
        .values(promotion)
        .returning({ id: promotions.id })
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de sauvegarder la promotion");
    }
  }
}
