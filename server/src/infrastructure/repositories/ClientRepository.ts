import { db } from "../data"
import { clients } from "../data/schema/clients";
import { Client, NewClient, ClientColumns } from "../../domain/entities/Client";
import { eq } from "drizzle-orm";


export class ClientRepository {
    getAllClients(): Promise< Partial<Client>[] > {
        try {
            return db.query.clients.findMany({
                // On sélectionne les colonnes que l'on veut récupérer
                columns: {
                    id: true,
                    username: true
                    // On ne récupère ni le mot de passe, ni le refreshToken (pour des raisons de sécurité)
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer les utilisateurs");
        }
    }

    getClientById(id: string): Promise<Partial<Client | undefined>> {
        try {
            return db.query.clients.findFirst({
                where: eq(clients.id, id),
                columns: {
                    id: true,
                    username: true
                }
            })
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer l'utilisateur");
        }
    }

    createClient(client: NewClient) {
        try {
            return db.insert(clients).values(client).execute();
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de créer l'utilisateur");
        }
    }

    updateClient(client: Client) {
    try {
        return db.update(clients).set(client).where(eq(clients.id, client.id)).execute();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de mettre à jour l'utilisateur");
    }
}


}