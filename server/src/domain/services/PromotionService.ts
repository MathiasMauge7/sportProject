import { NewPromotion } from "./../entities/Promotion";
import { PromotionRepository } from "../../infrastructure/repositories/PromotionRepository";

export class PromotionService {
  private promotionRepository: PromotionRepository;

  constructor() {
    this.promotionRepository = new PromotionRepository();
  }

  getAllPromotions() {
    return this.promotionRepository.getAllPromotions();
  }

  getPromotionById(id: string) {
    if (!id) return;
    return this.promotionRepository.getPromotionById(id);
  }

  deletePromotion(id: string) {
    if (!id) return;
    return this.promotionRepository.deletePromotion(id);
  }

  savePromotion(promotion: NewPromotion) {
    if (!promotion) return;
    return this.promotionRepository.savePromotion(promotion);
  }
}
