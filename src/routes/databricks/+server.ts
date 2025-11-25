import { json, error, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { DBSQLClient } from '@databricks/sql';
import type IDBSQLSession from '@databricks/sql/dist/contracts/IDBSQLSession';
import type IOperation from '@databricks/sql/dist/contracts/IOperation';


/**
 * THIS IS FOR TESTING FUNCTIONALITY, IT IS NOT SUITABLE FOR A PRODUCTION SYSTEM
 */
export async function GET()
{
    const databricksHost = "https://adb-3426684393694549.9.azuredatabricks.net";
    const oauthToken = env.DATABRICKS_OAUTH_TOKEN;
    const databricksPath = "/sql/1.0/warehouses/85f7cb50a68d4eeb";

    const client: DBSQLClient = new DBSQLClient();
    const connectOptions = {
        token: oauthToken,
        host: databricksHost,
        path: databricksPath
    };

    await client.connect(connectOptions)
    .then(async (client) => {
        const session: IDBSQLSession = await client.openSession();

        const queryOperation: IOperation = await session.executeStatement('SELECT * FROM `catalog-dev-uks-lgofcdp-001`.`schema-dev-uks-lgofcdp-bronze-001`.tb_bronze_imd_c039 LIMIT 1', {
        runAsync: true,
        maxRows: 10, // This option enables the direct results feature.
    });
    const result = await queryOperation.fetchAll();

    await queryOperation.close();

    await session.close;
    client.close();

    return json(result);
    }).catch((error) => {
        return json("error");
    });
    

}