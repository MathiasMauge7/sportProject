import { Request, Response } from "express";
import { PromotionService } from "../../../../domain/services/PromotionService";
import { response } from "../../../../utils/response";
import { CustomRequest } from "../../../../types/express";

const promotionService = new PromotionService();

export const getAllPromotions = async (req: Request, res: Response) => {
  const promotions = await promotionService.getAllPromotions();
  console.table(promotions);
  response(res, {
    statusCode: 200,
    message: "OK",
    data: promotions,
  });
};

// localhost:3000/posts/1
export const getPromotionById = async (req: Request, res: Response) => {
  const promotionsId = req.params.id;
  const promotion = await promotionService.getPromotionById(promotionsId);
  if (!promotion) {
    response(res, { statusCode: 404, message: "Promotion introuvable" });
  } else {
    console.table(promotion[0]);
    response(res, { statusCode: 200, message: "OK", data: promotion[0] });
  }
};

export const deletePromotion = async (req: Request, res: Response) => {
  const { id } = req.params;
  await promotionService.deletePromotion(id);
  response(res, { statusCode: 200, message: "Promotion deleted" });
};

export const savePromotion = async (req: CustomRequest, res: Response) => {
  const { id, name, pourcent, createdAt, endingAt } = req.body;

  const promotion = {
    id,
    name,
    pourcent,
    createdAt,
    endingAt,
  };
  console.log(promotion);

  const createdPromotion = await promotionService.savePromotion(promotion);
  if (!createdPromotion)
    return response(res, {
      statusCode: 400,
      message: "Promotion non enregistrée",
    });
  response(res, { statusCode: 201, message: "Promotion enregistrée" });
};
