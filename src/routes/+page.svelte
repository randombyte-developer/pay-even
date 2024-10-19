<script lang="ts">
	import { enhance } from "$app/forms";
	import Button, { Label } from "@smui/button";
	import PersonGrid from "../components/PersonGrid.svelte";
	import Result from "../components/Transactions.svelte";

	export let data;
	export let form;
</script>

<div id="container">
	<div id="main">
		<PersonGrid {form} persons={data.persons} />

		<form method="POST" action="?/calculate" use:enhance>
			<Button variant="raised">
				<Label>Calculate</Label>
			</Button>
		</form>

		{#if form?.transactions}
			<Result transactions={form.transactions} />
		{/if}
	</div>
</div>

<style>
	#container {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: center;
	}

	#main {
		display: flex;
		flex-direction: column;
		width: 960px;
		align-items: center;
		gap: 16px;
	}
</style>
