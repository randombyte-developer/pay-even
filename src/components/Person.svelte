<script lang="ts">
	import * as constants from "$lib/constants";
	import { enhance } from "$app/forms";
	import type { Person } from "$lib/server/database";
	import Expense from "./Expense.svelte";

	export let person: Person;
</script>

<p>{person.name}</p>

<form method="POST" action="?/deletePerson" use:enhance>
	<input type="hidden" name={constants.FORM_PERSON_ID} value={person.id} />
	<button>Delete</button>
</form>
<form method="POST" action="?/createExpense" use:enhance>
	<input type="hidden" name={constants.FORM_PERSON_ID} value={person.id} />
	<label>
		Name:
		<input name={constants.FORM_EXPENSE_NAME} />
	</label>
	<label>
		Amount:
		<input name={constants.FORM_EXPENSE_AMOUNT} />
	</label>
	<button>Create</button>
</form>

<ul>
	{#each person.expenses as expense}
		<li>
			<Expense {expense} personId={person.id} />
		</li>
	{/each}
</ul>
