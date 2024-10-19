<script lang="ts">
	import * as constants from "$lib/constants";
	import { enhance } from "$app/forms";
	import type { Person } from "$lib/server/database";
	import Expense from "./Expense.svelte";
	import IconButton, { Icon } from "@smui/icon-button";
	import { mdiPlus } from "@mdi/js";
	import Card, { Content, Actions } from "@smui/card";
	import Button, { Label } from "@smui/button";
	import Textfield from "@smui/textfield";

	export let form;
	export let person: Person;
</script>

<div id="container">
	<Card style="width: 100%">
		<Content>
			<div id="header">
				<p>{person.name}</p>
			</div>
			<Expense personId={person.id} />

			{#if form?.error && form?.personId == person.id}
				<p>Error: {form.error}</p>
			{/if}

			<div id="list">
				{#each person.expenses as expense}
					<Expense {expense} personId={person.id} />
				{/each}
			</div>
		</Content>
		<Actions style="justify-content: end">
			<form method="POST" action="?/deletePerson" use:enhance>
				<input type="hidden" name={constants.FORM_PERSON_ID} value={person.id} />
				<Button>
					<Label>Delete</Label>
				</Button>
			</form>
		</Actions>
	</Card>
</div>

<style>
	#container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	#header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	#list {
		display: flex;
		flex-direction: column;
	}
</style>
