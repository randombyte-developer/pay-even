<script lang="ts">
	import { enhance } from "$app/forms";
	import * as constants from "$lib/constants";
	import Person from "./PersonExpenses.svelte";
	import Paper, { Content } from "@smui/paper";
	import TextField from "@smui/textfield";
	import IconButton, { Icon } from "@smui/icon-button";
	import { mdiPlus } from "@mdi/js";
	import PersonExpenses from "./PersonExpenses.svelte";

	export let form;
	export let persons: Person[];
</script>

<div id="container">
	<PersonExpenses {form} />

	<div id="list">
		{#each persons as person (person.id)}
			<PersonExpenses {form} {person} />
		{/each}
	</div>
</div>

<style>
	#container {
		display: flex;
		flex-direction: column;
		width: 600px;
	}

	#list {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 16px;
	}
</style>
