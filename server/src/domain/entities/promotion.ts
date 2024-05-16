import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { promotions } from "../../infrastructure/data/schema";

// Ce type represente le modele d'un user au moment de sa selection dans la db
// cad le type User aura les memes propriétés que la table users
// Marche pour SELECT, DELETE, UPDATE
export type Promotion = InferSelectModel<typeof promotions>

// de même pour NewUser: il aura les memes propriétés que la table users
// sauf les propriétés qui sont générés automatiquement (comme id par exemple)
export type NewPromotion = InferInsertModel<typeof promotions>

/* On ajoute le type UserColumns qui sera un objet avec des
clés optionnelles qui correspondent aux colonnes de notre
table users */
export type PromotionColumns = { [K in keyof Promotion]?: boolean }