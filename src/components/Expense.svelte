<script lang="ts">
	import * as constants from "$lib/constants";
	import Textfield from "@smui/textfield";

	export let name: string | null = null;
	export let amountCents: number | null = null;
</script>

<div id="container">
	<Textfield
		input$name={constants.FORM_EXPENSE_NAME}
		label="Name (Optional)"
		bind:value={name}
		style="flex: 3"
	/>
	<Textfield
		input$name={constants.FORM_EXPENSE_AMOUNT}
		label="Amount"
		bind:value={amountCents}
		type="number"
		required
		style="flex: 1;"
	/>
</div>

<style>
	#container {
		display: flex;
		flex-direction: row;
		gap: 16px;
	}
</style>
