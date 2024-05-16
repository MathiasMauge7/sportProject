import { Pool } from "pg"; // Pool nous permet de créer un pool de connexion à notre DB pgsql
import { migrate } from "drizzle-orm/node-postgres/migrator"; // migrate est une fonction de Drizzle qui permet de migrer la DB
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres"; // NodePgDatabase est une interface de Drizzle qui définit les méthodes pour interagir avec la DB


import env from  "../../config/env"
const { DATABASE_URL } = env

async function main() {
    // Nous créons un pool de connexion à la DB avec notre URL de connexion de notre fichier .env
    const pool = new Pool({ connectionString: DATABASE_URL })

    // Nous initialisons la connexion à la DB avec drizzle(pool), ce qui nous donne une instance de NodePgDatabase
    const db: NodePgDatabase = drizzle(pool)

    // On affiche un message pour indiquer que la migration commence
    console.info("Migration database...")

    // On appelle la fonction migrate de Drizzle, qui va migrer la DB en appliquant les migrations de schémas dans le dossier spécifié dans la propriété out migrationsFolder
    await migrate(db, { migrationsFolder: 'src/infrastructure/data/drizzle' })

    // On affiche un message pour indiquer que la migration est terminée
    console.info("Database migrated successfully!")

    // On ferme le pool de connexion à la DB
    await pool.end()

}

// On est obligé d'appeler main() pour que le script soit exécuté
main()