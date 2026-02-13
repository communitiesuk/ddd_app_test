<script>
	let { form } = $props();
</script>

<form method="POST">
	<label>
		SQL
		<input name="sql" type="text" />
	</label>

	<button>Query</button>
</form>

{#if form?.success}
	<!-- this message is ephemeral; it exists because the page was rendered in
	       response to a form submission. it will vanish if the user reloads -->
	<p>Successfully requested: {form.query}</p>
	<br>
	{#if form.response.SUCCESS == 'YEAH !'}
		<tbody>
			{#each form.response.RESULT as row}
				<tr>
					{#each Object.keys(row) as key}
						<td>{row[key]}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	{/if}
{/if}
