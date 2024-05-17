import { NewAchat } from "../entities/Achat";
import { AchatRepository } from "../../infrastructure/repositories/AchatRepository";
import { sql } from "drizzle-orm";
import { db } from "../../infrastructure/data";
import { ClientRepository } from "../../infrastructure/repositories/ClientRepository";

export class AchatService {
  private achatRepository: AchatRepository;
  private clientRepository: ClientRepository;

  constructor() {
    this.achatRepository = new AchatRepository();
    this.clientRepository = new ClientRepository();
  }

  getAchatById(id: string) {
    if (!id || id.trim().length < 1) return;
    return this.achatRepository.getAchatById(id);
  }

  getAllAchats() {
    return this.achatRepository.getAllAchats();
  }

  async addAchat(achat: NewAchat) {
    if (
      achat?.client?.trim().length < 1 ||
      achat?.produit?.trim().length < 1 ||
      achat?.isValid != true
    )
      return;
    const NewAchat = await this.achatRepository.saveAchat(achat);
    return NewAchat[0].id;
  }

  getAchatByClientName(name: string) {
    if (!name) return;
    return this.achatRepository.getAchatByClientName(name);
  }
}
