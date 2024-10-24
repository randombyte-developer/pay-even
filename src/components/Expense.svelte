<script lang="ts">
	import * as constants from "$lib/constants";
	import Textfield from "@smui/textfield";
	import { enhance } from "$app/forms";
	import IconButton, { Icon } from "@smui/icon-button";
	import { mdiDelete, mdiPlus } from "@mdi/js";
	import type { Expense } from "$lib/server/database";

	export let personId: string;
	export let expense: Expense | null = null;
	let editMode: boolean = true;
</script>

<form
	method="POST"
	action="?/{expense == null ? 'createExpense' : 'deleteExpense'}"
	use:enhance
	id="container"
>
	<input type="hidden" name={constants.FORM_PERSON_ID} value={personId} />
	<input type="hidden" name={constants.FORM_EXPENSE_ID} value={expense?.id} />

	{#if editMode}
		<Textfield
			input$name={constants.FORM_EXPENSE_NAME}
			label="Name"
			value={expense?.name ?? ""}
			style="flex: 3"
		/>
		<Textfield
			input$name={constants.FORM_EXPENSE_AMOUNT}
			label="Amount"
			value={expense?.amountCents ?? ""}
			type="number"
			required
			style="flex: 1;"
		/>
	{:else}
		<span style="flex: 3"> {expense?.name}</span>
		<span style="flex: 1">{expense?.amountCents}</span>
	{/if}

	{#if expense}
		<IconButton>
			<Icon tag="svg">
				<path d={mdiDelete} />
			</Icon>
		</IconButton>
	{:else}
		<IconButton>
			<Icon tag="svg">
				<path d={mdiPlus} />
			</Icon>
		</IconButton>
	{/if}
</form>

<style>
	#container {
		display: flex;
		flex-direction: row;
		gap: 16px;
		width: 100%;
		align-self: center;
	}
</style>
