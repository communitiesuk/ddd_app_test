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

    const databricksHost = "adb-3426684393694549.9.azuredatabricks.net";
    const oauthToken = env.DATABRICKS_OAUTH_TOKEN;
    const oauthClientID = env.AZURE_OAUTH_CLIENT_ID;
    const oauthSecret = env.AZURE_OAUTH_SECRET;
    const oauthTenantID = env.AZURE_TENANT_ID;

    const databricksPath = "/sql/1.0/warehouses/85f7cb50a68d4eeb";

    const client: DBSQLClient = new DBSQLClient();
    const connectOptions = {
        authType: 'databricks-oauth',
        //token: oauthToken,
        host: databricksHost,
        path: databricksPath,
        oauthClientId: oauthClientID,
        oauthClientSecret: oauthSecret,
        azureTenantId: oauthTenantID
    }; 


    var result = {};

    await client.connect(connectOptions)
    .then(async (client) => {
        const session: IDBSQLSession = await client.openSession();

        const queryOperation: IOperation = await session.executeStatement('SELECT * FROM `catalog-dev-uks-lgofcdp-001`.`schema-dev-uks-lgofcdp-bronze-001`.tb_bronze_imd_c039 LIMIT 1', {
        runAsync: true,
        maxRows: 10, // This option enables the direct results feature.
    });
    result = await queryOperation.fetchAll();
console.log(result);
    await queryOperation.close();

    await session.close;
    client.close();

    return json(result);
    }).catch((error) => {
        console.log(result)
        console.log(error)
        console.log(client)
        return json(error.message);
    });
    

}