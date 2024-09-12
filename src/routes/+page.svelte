<script lang="ts">
	import * as constants from "$lib/constants";
	import { enhance } from "$app/forms";
	import Person from "../components/Person.svelte";
	import Expense from "../components/Expense.svelte";
	import Button, { Label } from "@smui/button";

	export let data;
	export let form;

	function getPersonName(id: string): string {
		return data.persons.find((p) => p.id === id)?.name ?? "<Unknown person>";
	}
</script>

<form method="POST" action="?/createPerson" use:enhance>
	<label>
		Name:
		<input name={constants.FORM_PERSON_NAME} />
	</label>
	<button>Create</button>
</form>

<form method="POST" action="?/clear" use:enhance>
	<Button>
		<Label>Clear</Label>
	</Button>
</form>

<ul>
	{#each data.persons as person}
		<li>
			<Person {person} />
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
