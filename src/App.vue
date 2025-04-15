<script setup>
import HeaderComponent from './components/HeaderComponent.vue';

</script>

<template>
	<HeaderComponent></HeaderComponent>

	<main>
		<RouterView v-slot="{ Component }">
			<component :is="Component"></component>
		</RouterView>
	</main>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	list-style: none;
	text-decoration: none;
	font-family: 'Nunito Sans', sans-serif;

	color: inherit;
	--Light-Theme-Bg: hsl(0, 0%, 98%);
	--Light-Theme-Text: hsl(200, 15%, 8%);
	--Light-Theme-Container: hsl(0, 0%, 100%);
	--Dark-Theme-Bg: #202d36;
	--Dark-Theme-Text: white;
	--Dark-Theme-Container: #2b3743;
	transition: 0.3s background-color, .3s transform;
}

html,
body {
	min-height: 100vh;
}

body {
	font-size: 14px;
	background-color: var(--Theme-Bg);
	color: var(--Theme-Text);
}

#app {
	background-color: inherit;
	color: inherit;
}

.dark {
	.details__borders,
	.details__back,
	.regionLabel,
	.dropdown,
	.input-area,
	.Header,
	.countries__container {
		background-color: var(--Dark-Theme-Container) !important;
		color: var(--Dark-Theme-Text) !important;
	}

	body,
	.details__main {
		background-color: var(--Dark-Theme-Bg);
		color: var(--Dark-Theme-Text) !important;
	}

	.lds-spinner div:after {
		background: white !important;
		transition: all 0.3s;
	}
	.error__message {
		color: rgba(255, 255, 255, 0.514);
	}
}
</style>
