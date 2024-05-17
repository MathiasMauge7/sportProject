import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    client: { clientId: string; name: string };
    produit: { produitId: string; name: string; price: int };
  }
}

export interface CustomRequest extends Request {
  client: { clientId: string; name: string };
  produit: { produitId: string; name: string; price: int };
}
