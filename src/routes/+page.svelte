<script lang="ts">
	import * as constants from "$lib/constants";
	import { enhance } from "$app/forms";

	export let data;
	export let form;

	function getPersonName(id: string): string {
		return data.persons.find((p) => p.id === id)?.name ?? "<Unknown person>";
	}
</script>

<h1>PayEven</h1>

<form method="POST" action="?/createPerson" use:enhance>
	<label>
		Name:
		<input name={constants.FORM_PERSON_NAME} />
	</label>
	<button>Create</button>
</form>

<form method="POST" action="?/clear" use:enhance>
	<button>Clear</button>
</form>

<ul>
	{#each data.persons as person}
		<li>
			{person.name}
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
						{expense.name}
						{expense.amountCents}
						<form method="POST" action="?/deleteExpense" use:enhance>
							<input type="hidden" name={constants.FORM_PERSON_ID} value={person.id} />
							<input type="hidden" name={constants.FORM_EXPENSE_ID} value={expense.id} />
							<button>Delete</button>
						</form>
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>

<form method="POST" action="?/calculate" use:enhance>
	<button>Calculate</button>
</form>

{#if form?.result}
	Result:
	<ul>
		{#each form?.result as { from, to, amount }}
			<li>
				{getPersonName(from)} has to pay {getPersonName(to)}: {amount}
			</li>
		{/each}
	</ul>
{/if}
