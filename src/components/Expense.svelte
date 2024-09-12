<script lang="ts">
	import * as constants from "$lib/constants";
	import { enhance } from "$app/forms";
	import type { Expense, Person } from "$lib/server/database";

	export let personId: string;
	export let expense: Expense;
</script>

<p>{expense.name}</p>
<p>{expense.amountCents}</p>

<form method="POST" action="?/deleteExpense" use:enhance>
	<input type="hidden" name={constants.FORM_PERSON_ID} value={personId} />
	<input type="hidden" name={constants.FORM_EXPENSE_ID} value={expense.id} />
	<button>Delete</button>
</form>
