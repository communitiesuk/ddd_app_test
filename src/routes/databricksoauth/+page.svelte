<script>
	/** @type {number} */
	let result = $state();

	async function roll() {
		const response = await fetch('/databricksoauth');
		result = await response.text();
	}
</script>

<button onclick={roll}>Query databricks</button>

{#if result !== undefined}
	<p>Databricks response is: {result}</p>
{/if}