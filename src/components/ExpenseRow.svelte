<script lang="ts">
	import * as constants from "$lib/constants";
	import Textfield from "@smui/textfield";
	import { enhance } from "$app/forms";
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
		method="POST"
		action="?/upsertExpense"
		class="row gap w100"
		use:enhance={() => {
			if (!isCreate) {
				// Only make updated already-existing expenses readonly after editing.
				// The component instance that is used for creating expenses should stay editable.
				isEditMode = false;
			}

			return async ({ update }) => {
				// When creating, the input fields should be cleared after submit. (This is the default behavior)
				// When updating, the input fields should not be cleared. Otherwise no value would be displayed.
				update({ reset: isCreate });
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
			{#if isCreate}
				<IconButton>
					<Icon tag="svg">
						<path d={mdiPlus} />
					</Icon>
				</IconButton>
			{:else if isEditMode}
				<IconButton>
					<Icon tag="svg">
						<path d={mdiContentSave} />
					</Icon>
				</IconButton>
				<form method="POST" action="?/deleteExpense" use:enhance>
					<input type="hidden" name={constants.FORM_PERSON_ID} value={personId} />
					<input type="hidden" name={constants.FORM_EXPENSE_ID} value={expense?.id} />
					<IconButton>
						<Icon tag="svg">
							<path d={mdiDelete} />
						</Icon>
					</IconButton>
				</form>
			{:else}
				<IconButton on:click={() => (isEditMode = true)}>
					<Icon tag="svg">
						<path d={mdiPencil} />
					</Icon>
				</IconButton>
			{/if}
		</div>
	</form>
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
