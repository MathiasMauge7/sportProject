import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { achats } from "../../infrastructure/data/schema";

// Ce type represente le modele d'un user au moment de sa selection dans la db
// cad le type User aura les memes propriétés que la table users
// Marche pour SELECT, DELETE, UPDATE
export type Achat = InferSelectModel<typeof achats>

// de même pour NewUser: il aura les memes propriétés que la table users
// sauf les propriétés qui sont générés automatiquement (comme id par exemple)
export type NewAchat = InferInsertModel<typeof achats>

/* On ajoute le type UserColumns qui sera un objet avec des
clés optionnelles qui correspondent aux colonnes de notre
table users */
export type AchatColumns = { [K in keyof Achat]?: boolean }