<script lang="ts">
	import { mdiPalette } from "@mdi/js";
	import IconButton, { Icon } from "@smui/icon-button";
	import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
	import { isDarkTheme } from "../stores";
	import "../styles.css";
</script>

<svelte:head>
	{#if $isDarkTheme}
		<link rel="stylesheet" href="/smui-dark.css" />
	{:else}
		<link rel="stylesheet" href="/smui.css" />
	{/if}
</svelte:head>

<div id="container">
	<TopAppBar variant="static" color="primary">
		<Row>
			<Section>
				<Title>PayEven</Title>
			</Section>
			<Section align="end" toolbar>
				<IconButton class="button" on:click={(e) => isDarkTheme.update((isDark) => !isDark)}>
					<Icon tag="svg">
						<path fill="currentColor" d={mdiPalette} />
					</Icon>
				</IconButton>
			</Section>
		</Row>
	</TopAppBar>

	<div id="content">
		<slot></slot>
	</div>
</div>

<style>
	#container {
		width: 100%;
	}

	#content {
		padding-top: 16px;
	}
</style>
