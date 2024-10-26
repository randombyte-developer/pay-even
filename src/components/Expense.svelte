<script lang="ts">
	import * as constants from "$lib/constants";
	import Textfield from "@smui/textfield";
	import { applyAction, enhance } from "$app/forms";
	import IconButton, { Icon } from "@smui/icon-button";
	import { mdiDelete, mdiPlus, mdiPencil, mdiContentSave } from "@mdi/js";
	import type { Expense } from "$lib/server/database";

	export let personId: string;
	export let expense: Expense | null = null;

	let isCreate = expense == null;
	let isEditMode = isCreate;
</script>

<div id="container">
	<form
		id="upsertExpense"
		method="POST"
		action="?/upsertExpense"
		class="row gap w100"
		use:enhance={() => {
			if (!isCreate) {
				isEditMode = false;
			}

			// Populate the form with the new data without resetting the form (emptying the fields)
			return async ({ result }) => {
				await applyAction(result);
			};
		}}
	>
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

		<div id="actions">
			{#if expense}
				{#if isEditMode}
					<IconButton style="flex: 1">
						<Icon tag="svg">
							<path d={mdiContentSave} />
						</Icon>
					</IconButton>
				{:else}
					<IconButton style="flex: 1" on:click={() => (isEditMode = true)}>
						<Icon tag="svg">
							<path d={mdiPencil} />
						</Icon>
					</IconButton>
				{/if}
			{:else}
				<IconButton>
					<Icon tag="svg">
						<path d={mdiPlus} />
					</Icon>
				</IconButton>
			{/if}
		</div>
	</form>

	{#if expense && isEditMode}
		<form id="deleteExpense" method="POST" action="?/deleteExpense" use:enhance>
			<input type="hidden" name={constants.FORM_PERSON_ID} value={personId} />
			<input type="hidden" name={constants.FORM_EXPENSE_ID} value={expense?.id} />
			<IconButton style="flex: 1">
				<Icon tag="svg">
					<path d={mdiDelete} />
				</Icon>
			</IconButton>
		</form>
	{/if}
</div>

<style>
	#container {
		display: flex;
		flex-direction: row;
		gap: 16px;
		width: 100%;
		align-self: center;
	}

	.row {
		display: flex;
		flex-direction: row;
	}

	.gap {
		gap: 16px;
	}

	.w100 {
		width: 100%;
	}

	#actions {
		display: flex;
		flex-direction: row;
		gap: 16px;
		flex: 1;
	}
</style>
