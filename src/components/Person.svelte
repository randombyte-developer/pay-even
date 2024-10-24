<script lang="ts">
	import * as constants from "$lib/constants";
	import { enhance } from "$app/forms";
	import type { Person } from "$lib/server/database";
	import IconButton, { Icon } from "@smui/icon-button";
	import { mdiDelete, mdiPlus } from "@mdi/js";
	import Expense from "./Expense.svelte";
	import Paper, { Title, Subtitle, Content } from "@smui/paper";

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
					{#each person.expenses as expense}
						<Expense personId={person.id} {expense} />
					{/each}
				</div>

				<Expense personId={person.id} expense={null} />

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
