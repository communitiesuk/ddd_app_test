import { myQuery } from "$lib/db";
import { json } from '@sveltejs/kit';

export async function load() {
	const response = await myQuery(`SELECT TimePeriod, Value FROM [dbo].[vw_LocalAuthorityMetricsExportFull] 
WHERE ONSCode = 'FA001'
AND MetricCode = 'FM001'`);

	if (response) {
		return response;
	}

	return { 'Not working': 'Nope' };
}
