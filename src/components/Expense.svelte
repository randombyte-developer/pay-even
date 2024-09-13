<script lang="ts">
	import { enhance } from "$app/forms";
	import * as constants from "$lib/constants";
	import type { Expense } from "$lib/server/database";
	import { mdiDelete } from "@mdi/js";
	import IconButton, { Icon } from "@smui/icon-button";
	import Textfield from "@smui/textfield";

	export let personId: string;
	export let expense: Expense;
</script>

<div id="container">
	<Textfield value={expense.amountCents} />
	<Textfield value={expense.name} />

	<form method="POST" action="?/deleteExpense" use:enhance style="align-self: center">
		<input type="hidden" name={constants.FORM_PERSON_ID} value={personId} />
		<input type="hidden" name={constants.FORM_EXPENSE_ID} value={expense.id} />
		<IconButton>
			<Icon tag="svg">
				<path d={mdiDelete} />
			</Icon>
		</IconButton>
	</form>
</div>

<style>
	#container {
		display: flex;
		flex-direction: row;
	}
</style>
