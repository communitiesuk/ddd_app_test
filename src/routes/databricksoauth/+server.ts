import { json, error, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { auth, DBSQLClient } from '@databricks/sql';
import type IDBSQLSession from '@databricks/sql/dist/contracts/IDBSQLSession';
import type IOperation from '@databricks/sql/dist/contracts/IOperation';
import type { ConnectionOptions } from '@databricks/sql/dist/contracts/IDBSQLClient';
import { ManagedIdentityCredential } from '@azure/identity';

const DATABRICKS_SCOPE = '2ff814a6-3304-4ab8-85cb-cd0e6f879c1d/.default';

/**
 * THIS IS FOR TESTING FUNCTIONALITY, IT IS NOT SUITABLE FOR A PRODUCTION SYSTEM
 */
export async function GET()
{
	const databricksHost = 'adb-2963605924048650.10.azuredatabricks.net/';
	//const tokenEndpoint = "https://" + databricksHost + "/oidc/v1/token"
	//const oauthClientID = env.AZURE_OAUTH_CLIENT_ID;
	//const oauthSecret = env.AZURE_OAUTH_SECRET;
	const databricksPath = '/sql/1.0/warehouses/1fd6548b22e2a192';
    let returnResult = {};

	// the authorisation header for retrieving the oauth token is of the form basse64($clientID:$secet)
	//const authorisationHeader : string = "Basic " +
	//	Buffer.from(oauthClientID + ":" + oauthSecret).toString('base64');

	// manually retrieve a m2m oauth token from the oauth token endpoint
	// const m2mOauthTokenResponse : Response = await fetch(tokenEndpoint,
	// 	{
	// 		method: 'POST',
	// 		headers: {'Authorization': authorisationHeader,
	// 			'Content-Type': 'application/x-www-form-urlencoded'},
	// 		body: encodeURI("grant_type=client_credentials&scope=all-apis")
	// 	});

	// the fetch returns a promise object so we need to retrieve the json from it, convert it into an object
	// and then pull it out of the access token field
	// const m2mOauthTokenJson = await m2mOauthTokenResponse.json();
	// const m2mOauthToken = m2mOauthTokenJson.access_token;
	// console.log(m2mOauthTokenJson);

	// retrieve the token
	const m2mOauthToken = await getDatabricksAadToken();

	// we use the databricks azure database driver to make things easier
	// note that we've had to retrieve our own token as it doesn't support the full azure oauth flow
	// https://learn.microsoft.com/en-us/azure/databricks/dev-tools/nodejs-sql-driver
	const client: DBSQLClient = new DBSQLClient();
	const connectOptions : ConnectionOptions = {
			token: m2mOauthToken.token,
			host: databricksHost,
			path: databricksPath,
	};

	// connect the execute the statement
	await client.connect(connectOptions)
	.then(async (client) => {
			const session: IDBSQLSession = await client.openSession();
			const queryOperation: IOperation = await session.executeStatement('SELECT * FROM `catalog-dev-uks-lgofcdp-001`.`schema-dev-uks-lgofcdp-bronze-001`.tb_bronze_imd_c039 LIMIT 1', {
			runAsync: true,
			maxRows: 10, // This option enables the direct results feature.
	});
	let result = await queryOperation.fetchAll();
	await queryOperation.close();

	await session.close();
	await client.close();

    returnResult = json(result);

	}).catch((error) => {
			return json(error.message);
	});

    return returnResult;
}

async function getDatabricksAadToken() {
	const credential = new ManagedIdentityCredential();

	const accessToken = await credential.getToken(DATABRICKS_SCOPE);
	if (!accessToken?.token) throw new Error("Failed to acquire Databricks AAD token");

	return accessToken;
}