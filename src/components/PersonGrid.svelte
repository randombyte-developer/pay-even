<script lang="ts">
	import { enhance } from "$app/forms";
	import * as constants from "$lib/constants";
	import Button, { Label } from "@smui/button";
	import Person from "../components/Person.svelte";
	import Paper, { Title, Subtitle, Content } from "@smui/paper";
	import TextField, { Input } from "@smui/textfield";
	import IconButton, { Icon } from "@smui/icon-button";
	import { mdiPlus } from "@mdi/js";

	export let form;
	export let persons;
</script>

<div id="container">
	<Paper style="align-self: center; width: 360px">
		<Content>
			<form class="flex-row" method="POST" action="?/createPerson" use:enhance>
				<TextField
					input$name={constants.FORM_PERSON_NAME}
					label="Name"
					value=""
					style="width: 100%"
				/>
				<IconButton>
					<Icon tag="svg">
						<path d={mdiPlus} />
					</Icon>
				</IconButton>
			</form>
		</Content>
	</Paper>

	<form method="POST" action="?/clear" use:enhance>
		<Button>
			<Label>Clear all</Label>
		</Button>
	</form>

	<div id="list">
		{#each persons as person}
			<Person {form} {person} />
		{/each}
	</div>
</div>

<style>
	#container {
		display: flex;
		flex-direction: column;
	}

	#list {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 16px;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}
</style>
