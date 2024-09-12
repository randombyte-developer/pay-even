<script lang="ts">
	import { enhance } from "$app/forms";
	import PersonGrid from "../components/PersonGrid.svelte";
	import Result from "../components/Transactions.svelte";

	export let data;
	export let form;
</script>

<div>
	<PersonGrid persons={data.persons} />

	<form method="POST" action="?/calculate" use:enhance>
		<button>Calculate</button>
	</form>

	{#if form?.transactions}
		<Result transactions={form.transactions} />
	{/if}
</div>
