<script lang="ts">
	import * as constants from "$lib/constants";
	import type { Person } from "$lib/server/database";
	import Paper, { Content } from "@smui/paper";
	import ExpenseRow from "./ExpenseRow.svelte";
	import EditableRecord from "./EditableRecord.svelte";
	import Textfield from "@smui/textfield";
	import { slide } from "svelte/transition";

	export let form;
	export let person: Person | null = null;
</script>

<div id="container">
	<Paper style="width: 100%; padding: 0px">
		<div id="header">
			<EditableRecord
				upsertAction="upsertPerson"
				deleteAction="deletePerson"
				isCreate={person == null}
			>
				<div id="container" slot="inputs" let:isEditMode>
					{#if person}
						<input type="hidden" name={constants.FORM_PERSON_ID} value={person.id} />
					{/if}

					<div style="margin: 8px 24px;">
						{#if isEditMode}
							<Textfield
								input$name={constants.FORM_PERSON_NAME}
								label="Name"
								value={person?.name ?? ""}
								required
							/>
						{:else}
							<Textfield
								input$name={constants.FORM_PERSON_NAME}
								label="Name"
								value={person?.name ?? ""}
								required
								input$readonly
								label$hidden
								ripple$hidden
							/>
						{/if}
					</div>
				</div>
				<div slot="recordIdentifier">
					<input type="hidden" name={constants.FORM_PERSON_ID} value={person?.id} />
				</div>
			</EditableRecord>
		</div>

		<div style="padding: 24px;">
			<Content>
				{#if person}
					<div id="list">
						{#each person.expenses as expense (expense.id)}
							<div transition:slide>
								<ExpenseRow personId={person.id} {expense} />
							</div>
						{/each}
					</div>

					<ExpenseRow personId={person.id} />

					{#if form?.error && form?.personId == person.id}
						<p>Error: {form.error}</p>
					{/if}
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
		background-color: lightgray;
		border-radius: 4px 4px 0px 0px;
	}

	#list {
		display: flex;
		flex-direction: column;
	}
</style>
