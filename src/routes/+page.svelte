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
		<li>{person.name}</li>
	{/each}
</ul>
