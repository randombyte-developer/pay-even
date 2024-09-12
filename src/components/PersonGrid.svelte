<script lang="ts">
	import { enhance } from "$app/forms";
	import * as constants from "$lib/constants";
	import Button, { Label } from "@smui/button";
	import Person from "../components/Person.svelte";

	export let persons;
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
	{#each persons as person}
		<li>
			<Person {person} />
		</li>
	{/each}
</ul>
