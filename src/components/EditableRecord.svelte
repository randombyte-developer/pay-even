<script lang="ts">
	import { enhance } from "$app/forms";
	import IconButton, { Icon } from "@smui/icon-button";
	import { mdiDelete, mdiPlus, mdiPencil, mdiContentSave } from "@mdi/js";

	export let upsertAction: string;
	export let deleteAction: string;

	export let isCreate: boolean;
	let isEditMode = isCreate;
</script>

<div id="container">
	<form
		method="POST"
		action="?/{upsertAction}"
		class="row gap w100"
		use:enhance={() => {
			if (!isCreate) {
				// Only make updated already-existing records readonly after editing.
				// The component instance that is used for creating records should stay editable.
				isEditMode = false;
			}

			return async ({ update }) => {
				// When creating, the input fields should be cleared after submit. (This is the default behavior)
				// When updating, the input fields should not be cleared. Otherwise no value would be displayed.
				update({ reset: isCreate });
			};
		}}
	>
		<slot name="inputs" {isCreate} {isEditMode}></slot>

		<div id="actions">
			{#if isCreate}
				<IconButton>
					<Icon tag="svg">
						<path d={mdiPlus} />
					</Icon>
				</IconButton>
			{:else if isEditMode}
				<IconButton>
					<Icon tag="svg">
						<path d={mdiContentSave} />
					</Icon>
				</IconButton>
				<form method="POST" action="?/{deleteAction}" use:enhance>
					<slot name="recordIdentifier"></slot>
					<IconButton>
						<Icon tag="svg">
							<path d={mdiDelete} />
						</Icon>
					</IconButton>
				</form>
			{:else}
				<IconButton on:click={() => (isEditMode = true)}>
					<Icon tag="svg">
						<path d={mdiPencil} />
					</Icon>
				</IconButton>
			{/if}
		</div>
	</form>
</div>

<style>
	#container {
		display: flex;
		flex-direction: row;
		gap: 16px;
		width: 100%;
		align-self: center;
	}

	.row {
		display: flex;
		flex-direction: row;
	}

	.gap {
		gap: 16px;
	}

	.w100 {
		width: 100%;
	}

	#actions {
		display: flex;
		flex-direction: row;
		gap: 16px;
		width: 160px;
	}
</style>
