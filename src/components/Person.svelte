<script lang="ts">
	import * as constants from "$lib/constants";
	import { enhance } from "$app/forms";
	import type { Person } from "$lib/server/database";
	import IconButton, { Icon } from "@smui/icon-button";
	import { mdiDelete, mdiPlus } from "@mdi/js";
	import Card, { Content, Actions } from "@smui/card";
	import Button, { Label } from "@smui/button";
	import Expense from "./Expense.svelte";

	export let form;
	export let person: Person;
</script>

<div id="container">
	<Card style="width: 100%">
		<Content>
			<div id="header">
				<p>{person.name}</p>
			</div>

			<div id="list">
				{#each person.expenses as expense}
					<form
						method="POST"
						action="?/deleteExpense"
						use:enhance
						style="align-self: center"
						class="row"
					>
						<input type="hidden" name={constants.FORM_PERSON_ID} value={person.id} />
						<input type="hidden" name={constants.FORM_EXPENSE_ID} value={expense?.id} />

						<Expense name={expense.name} amountCents={expense.amountCents} />

						<IconButton>
							<Icon tag="svg">
								<path d={mdiDelete} />
							</Icon>
						</IconButton>
					</form>
				{/each}
			</div>

			<form method="POST" action="?/createExpense" use:enhance class="row">
				<input type="hidden" name={constants.FORM_PERSON_ID} value={person.id} />

				<Expense />

				<IconButton>
					<Icon tag="svg">
						<path d={mdiPlus} />
					</Icon>
				</IconButton>
			</form>

			{#if form?.error && form?.personId == person.id}
				<p>Error: {form.error}</p>
			{/if}
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

	.row {
		display: flex;
		flex-direction: row;
	}
</style>
