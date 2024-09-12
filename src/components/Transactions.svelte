<script lang="ts">
	import type { Transaction } from "$lib/server/calculator";

	export let transactions: Transaction[];
</script>

Result:
<ul>
	{#each transactions as { from, to, amount }}
		<li>
			{from} has to pay {to}: {amount}
		</li>
	{/each}
</ul>
