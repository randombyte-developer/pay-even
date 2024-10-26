<script lang="ts">
	import * as constants from "$lib/constants";
	import { enhance } from "$app/forms";
	import type { Person } from "$lib/server/database";
	import IconButton, { Icon } from "@smui/icon-button";
	import { mdiDelete } from "@mdi/js";
	import Paper, { Content } from "@smui/paper";
	import ExpenseComponent from "./ExpenseComponent.svelte";

	export let form;
	export let person: Person;
</script>

<div id="container">
	<Paper style="width: 100%; padding: 0px">
		<div id="header">
			<h3 style="padding-left: 16px">{person.name}</h3>
			<form method="POST" action="?/deletePerson" use:enhance style="align-self:center">
				<input type="hidden" name={constants.FORM_PERSON_ID} value={person.id} />
				<IconButton>
					<Icon tag="svg">
						<path d={mdiDelete} />
					</Icon>
				</IconButton>
			</form>
		</div>

		<div style="padding: 24px;">
			<Content>
				<div id="list">
					{#each person.expenses as expense (expense.id)}
						<ExpenseComponent personId={person.id} {expense} />
					{/each}
				</div>

				<ExpenseComponent personId={person.id} />

				{#if form?.error && form?.personId == person.id}
					<p>Error: {form.error}</p>
				{/if}
			</Content>
		</div>
	</Paper>
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
		background-color: lightgray;
		border-radius: 4px 4px 0px 0px;
	}

	#list {
		display: flex;
		flex-direction: column;
	}
</style>
