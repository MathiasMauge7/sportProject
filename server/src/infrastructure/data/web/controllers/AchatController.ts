import { Request, Response } from "express";
import { AchatService } from "../../../../domain/services/AchatService";
import { response } from "../../../../utils/response";
import { CustomRequest } from "../../../../types/express";
import { clients } from "../../schema";

const achatService = new AchatService();

export const getAllAchats = async (req: Request, res: Response) => {
  const achats = await achatService.getAllAchats();
  console.table(achats);
  response(res, {
    statusCode: 200,
    message: "OK",
    data: achats,
  });
};

// localhost:3000/posts/1
export const getAchatById = async (req: Request, res: Response) => {
  const achatId = req.params.id;
  const achat = await achatService.getAchatById(achatId);
  if (!achat) {
    response(res, { statusCode: 404, message: "Achat introuvable" });
  } else {
    console.table(achat[0]);
    response(res, { statusCode: 200, message: "OK", data: achat[0] });
  }
};

export const createAchat = async (req: CustomRequest, res: Response) => {
  const { id, amount, isValid, date, paymentMode } = req.body;

  const achat = {
    id,
    amount,
    isValid,
    client: req.client.clientId,
    produit: req.produit.produitId,
    paymentMode,
    date,
  };
  console.log(achat);

  const createdAchat = await achatService.addAchat(achat);
  if (!createdAchat)
    return response(res, { statusCode: 400, message: "Achat non enregistré" });
  response(res, { statusCode: 201, message: "Achat enregistré" });
};

export const getAchatByClientName = async (req: Request, res: Response) => {
  const clientName = req.params.name;
  if (!clientName) {
    response(res, { statusCode: 404, message: "Aucun client à ce nom." });
  } else {
    const achats = await achatService.getAchatByClientName(clientName);
    response(res, { statusCode: 200, data: achats, message: "OK" });
  }
};
