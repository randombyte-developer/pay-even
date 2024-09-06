<script>
	import * as constants from "$lib/constants";

	export let data;
</script>

<h1>PayEven</h1>

<form method="POST" action="?/createPerson">
	<label>
		<input name={constants.FORM_PERSON_NAME} />
	</label>
	<button>Create</button>
</form>

<ul>
	{#each data.persons as person}
		<li>
			{person.name}
			<form method="POST" action="?/deletePerson">
				<input type="hidden" name={constants.FORM_PERSON_ID} value={person.id} />
				<button>Delete</button>
			</form>
			<form method="POST" action="?/createExpense">
				<label>
					<input type="hidden" name={constants.FORM_PERSON_ID} value={person.id} />
					<input name={constants.FORM_EXPENSE_NAME} />
					<input name={constants.FORM_EXPENSE_AMOUNT} />
				</label>
				<button>Create</button>
			</form>
			<ul>
				{#each person.expenses as expense}
					<li>
						{expense.name}
						{expense.amountCents}
						<form method="POST" action="?/deleteExpense">
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
