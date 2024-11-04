<script lang="ts">
	import Person from "./PersonExpenses.svelte";
	import PersonExpenses from "./PersonExpenses.svelte";
	import { slide } from "svelte/transition";

	export let form;
	export let persons: Person[];
</script>

<div id="container">
	<PersonExpenses {form} />

	<div id="list">
		{#each persons as person (person.id)}
			<div transition:slide>
				<PersonExpenses {form} {person} />
			</div>
		{/each}
	</div>
</div>

<style>
	#container {
		display: flex;
		flex-direction: column;
		width: 600px;
		gap: 16px;
	}

	#list {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 16px;
	}
</style>
