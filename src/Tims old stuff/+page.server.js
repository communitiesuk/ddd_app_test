import { myQuery } from "$lib/db";
import { json } from '@sveltejs/kit';

export async function load() {
	const request= await fetch("http://85.210.161.184/api?what=*&table=vw_LocalAuthorityMetricsExportFull&where=ONSCode = 'FA001' AND MetricCode = 'FM001'");
	const response = await request.json();
	if (response) {
		return response;
	}

	return { 'Not working': 'Nope' };
}