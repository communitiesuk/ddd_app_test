<script>
	/** @type {number} */
	let number = $state();

	async function roll() {
		const response = await fetch('/databricks');
		number = await response.json();
	}
</script>

<button onclick={roll}>Query databricks</button>

{#if number !== undefined}
	<p>Databricks response is: {number}</p>
{/if}