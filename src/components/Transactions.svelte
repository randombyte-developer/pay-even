<script lang="ts">
	import type { Transaction } from "$lib/server/calculator";

	export let transactions: Transaction[];
</script>

<div id="container">
	{#each transactions as { from, to, amount }}
		<p>{from} has to pay {to}: {amount}</p>
	{/each}
</div>

<style>
	#container {
		display: flex;
		flex-direction: column;
	}
</style>
