import { beforeAll, describe, it, expect } from "@jest/globals";
import { sql } from "drizzle-orm";

import { AchatService } from "../../domain/services/AchatService";
import { NewAchat } from "../../domain/entities/Achat";

import { createdClient } from "../jest.setup";
import { db } from "../../infrastructure/data";

function expectNullableAny(value: any) {
  if (value !== null) {
    expect(value).toEqual(expect.anything());
  } else {
    expect(value).toBeNull();
  }
}

describe("AchatService", () => {
  let achatService: AchatService;
  let now = new Date();
  let createdAchatId: string | undefined;
  let newAchat: NewAchat = {
    produit: "561649816561561",
    client: createdClient.id,
    amount: 50,
    paymentMode: "CB",
    isValid: true,
    date: now,
  };

  beforeAll(async () => {
    achatService = new AchatService();
    newAchat.client = createdClient.id;
    await db.execute(sql`SET search_path TO test`);
  });

  it("should add a new achat", async () => {
    await db.execute(sql`SET search_path TO test`);
    createdAchatId = await achatService.addAchat(newAchat);
    expect(createdAchatId).toBeTruthy();
  });

  it("should get a achat by its id", async () => {
    await db.execute(sql`SET search_path TO test`);
    const achat = await achatService.getAchatById(createdAchatId || "");
    expect(achat[0]).toEqual(
      expect.objectContaining({
        id: createdAchatId,
        amount: newAchat.amount,
        client: expect.objectContaining({
          id: createdClient.id,
          name: createdClient.name,
        }),
        produit: newAchat.produit,
        isValid: newAchat.isValid,
        paymentMode: newAchat.paymentMode,
        date: now,
      })
    );
  });

  it("should get all achats", async () => {
    await db.execute(sql`SET search_path TO test`);
    const achats = await achatService.getAllAchats();
    achats.forEach((achat: any) => {
      expect(achat).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        content: expect.any(String),
        author: expect.objectContaining({
          id: expect.any(String),
          username: expect.any(String),
        }),
        date: expect.any(Date),
      });
      expectNullableAny(achat.produit); // Check produit separately
    });
  });
});
