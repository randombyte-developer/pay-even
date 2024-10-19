<script lang="ts">
	import { enhance } from "$app/forms";
	import * as constants from "$lib/constants";
	import type { Expense } from "$lib/server/database";
	import { mdiDelete, mdiPlus } from "@mdi/js";
	import IconButton, { Icon } from "@smui/icon-button";
	import Textfield from "@smui/textfield";

	export let personId: string;
	export let expense: Expense | null = null;
</script>

<div id="container">
	{#if expense}
		<Textfield value={expense?.name} />
		<Textfield value={expense?.amountCents} />
		<form method="POST" action="?/deleteExpense" use:enhance style="align-self: center">
			<input type="hidden" name={constants.FORM_PERSON_ID} value={personId} />
			<input type="hidden" name={constants.FORM_EXPENSE_ID} value={expense?.id} />
			<IconButton>
				<Icon tag="svg">
					<path d={mdiDelete} />
				</Icon>
			</IconButton>
		</form>
	{:else}
		<form method="POST" action="?/createExpense" use:enhance>
			<input type="hidden" name={constants.FORM_PERSON_ID} value={personId} />
			<Textfield input$name={constants.FORM_EXPENSE_NAME} label="Name (Optional)" value="" />
			<Textfield
				input$name={constants.FORM_EXPENSE_AMOUNT}
				label="Amount"
				value=""
				type="number"
				required
			/>
			<IconButton>
				<Icon tag="svg">
					<path d={mdiPlus} />
				</Icon>
			</IconButton>
		</form>
	{/if}
</div>

<style>
	#container {
		display: flex;
		flex-direction: row;
	}
</style>
