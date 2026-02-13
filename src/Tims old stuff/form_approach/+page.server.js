import { myQuery } from "$lib/db";

//THIS SCRIPT TAKES A FORM INPUT FROM THE CORRESPONDING +PAGE.SVELTE
//AND PASSES IT TO THE myQuery FUNCTION IN THE DB.JS FILE
//THE myQuery FUNCTION IS A PROMISE THAT RESOLVES TO THE RESPONSE FROM THE SQL SERVER
//THE RESPONSE IS THEN RETURNED TO THE +PAGE.SVELTE FILE
//THE +PAGE.SVELTE FILE THEN DISPLAYS THE RESPONSE IN A TABLE

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const sql = data.get('sql');

		try {
			const response = await myQuery(sql);
			console.log('response', response);
			if (response) {
				return { query: sql, success: true, response: response };
			}
		}
		catch (error) {
			console.error('Error executing SQL query:', error);
			return { query: sql, success: false, response: error };
		}

	}
};
