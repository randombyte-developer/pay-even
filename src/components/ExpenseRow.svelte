<script lang="ts">
	import * as constants from "$lib/constants";
	import Textfield from "@smui/textfield";
	import type { Expense } from "$lib/server/database";
	import EditableRecord from "./EditableRecord.svelte";

	export let personId: string;
	export let expense: Expense | null = null;
</script>

<EditableRecord
	upsertAction="upsertExpense"
	deleteAction="deleteExpense"
	isCreate={expense == null}
>
	<div id="container" slot="inputs" let:isEditMode>
		<input type="hidden" name={constants.FORM_PERSON_ID} value={personId} />
		{#if expense}
			<input type="hidden" name={constants.FORM_EXPENSE_ID} value={expense.id} />
		{/if}

		<Textfield
			input$name={constants.FORM_EXPENSE_NAME}
			label="Name"
			value={expense?.name ?? ""}
			disabled={!isEditMode}
			style="flex: 3"
		/>
		<Textfield
			input$name={constants.FORM_EXPENSE_AMOUNT}
			label="Amount"
			value={expense?.amountCents ?? ""}
			type="number"
			required
			disabled={!isEditMode}
			style="flex: 1;"
		/>
	</div>
	<div slot="recordIdentifier">
		<input type="hidden" name={constants.FORM_PERSON_ID} value={personId} />
		<input type="hidden" name={constants.FORM_EXPENSE_ID} value={expense?.id} />
	</div>
</EditableRecord>

<style>
	#container {
		display: flex;
		flex-direction: row;
		gap: 16px;
		width: 100%;
		align-self: center;
	}
</style>
