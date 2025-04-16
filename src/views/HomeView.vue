<script setup>
import Fuse from 'fuse.js'
import { useGetData } from '../composables/getData';
import { ref, watch, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { onClickOutside } from '@vueuse/core';

const options = {
  keys: ['name.common'], // path to country name
  threshold: 0.4          // smaller = stricter, try 0.3–0.5
}

const { data, getData } = useGetData();
getData(
	'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,cca3'
);
const drop = ref(null);
const check = ref(null);
const resetSearch = ref(null);
const search = ref('');
const allCountries = ref();
const postXpage = 10;
const fin = ref(postXpage);
const sortBy = ref('');
const sortOrder = ref('asc');

function resetInput() {
	search.value = '';
}
onClickOutside(drop, () => {
	check.value.checked = false;
});

const next = () => {
	fin.value = fin.value + postXpage;
};
function Region(regionPreference) {
	allCountries.value = data.value.filter((e) =>
		e.region.includes(regionPreference)
	);
}
watch(search, (inputText) => {
	const fuse = new Fuse(data.value, options);
	const result = fuse.search(inputText);
	allCountries.value = result.map(r => r.item);

	if (search.value.length > 0) {
		resetSearch.value.style.display = 'block';
	} else {
		resetSearch.value.style.display = 'none';
	}
	fin.value = 20;
});
watch(data, () => {
	allCountries.value = data.value;
});

const sortedCountries = computed(() => {
	if (!allCountries.value) return [];

	const sorted = [...allCountries.value];

	if (sortBy.value === 'name') {
		sorted.sort((a, b) => {
			const nameA = a.name.common.toLowerCase();
			const nameB = b.name.common.toLowerCase();
			return sortOrder.value === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
		});
	} else if (sortBy.value === 'population') {
		sorted.sort((a, b) => {
			return sortOrder.value === 'asc' ? a.population - b.population : b.population - a.population;
		});
	}
	return sorted;
});

</script>

<template>
	<div class="lds-spinner" v-if="!allCountries">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
	<section class="Home" v-else>
		<div class="searchArea">
			<label class="input-area" for="search">
				<i class="fa-solid fa-magnifying-glass"></i>
				<input
					type="text"
					placeholder="Search for a country..."
					id="search"
					v-model="search"
				/>

				<i class="fa-solid fa-xmark" ref="resetSearch" @click="resetInput"></i>
			</label>
			<div class="sort-controls">
				<label class="sortLabel">Sort by:</label>
				<select v-model="sortBy" class="sortBy">
					<option value="">None</option>
					<option value="name">Country Name</option>
					<option value="population">Population</option>
				</select>

				<select v-model="sortOrder" :disabled="!sortBy" class="sortOrder">
					<option value="asc">Ascending</option>
					<option value="desc">Descending</option>
				</select>
			</div>
			<div class="dropdown-container" ref="drop">
				<input type="checkbox" name="check" id="check" ref="check" />
				<label for="check" class="regionLabel">Filter by Region</label>

				<div class="dropdown">
					<ul>
						<label class="regionRadios"
							>Africa
							<input
								@click="Region('Africa')"
								type="radio"
								id="Africa"
								name="region"
							/>
						</label>
						<label class="regionRadios">
							America
							<input
								type="radio"
								id="America"
								name="region"
								@click="Region('America')"
							/>
						</label>
						<label class="regionRadios">
							Asia
							<input
								type="radio"
								id="Asia"
								name="region"
								@click="Region('Asia')"
							/>
						</label>
						<label class="regionRadios">
							Europe
							<input
								type="radio"
								id="Europe"
								name="region"
								@click="Region('Europe')"
							/>
						</label>
						<label class="regionRadios">
							Oceania
							<input
								type="radio"
								id="Oceania"
								name="region"
								@click="Region('Oceania')"
							/>
						</label>
						<label class="regionRadios">
							All
							<input type="radio" id="All" name="region" @click="Region('')" />
						</label>
					</ul>
				</div>
			</div>
		</div>
		<div class="error" v-if="allCountries.length === 0">
			<h3>NOT FOUND</h3>
			<i class="fa-regular fa-face-frown-open"></i>
			<p class="error__message">Did you spell it correctly?</p>
		</div>
		<div class="countries">
			<RouterLink
				:to="`/${country.cca3}`"
				v-for="(country, index) in sortedCountries.slice(0, fin)"
				:key="index"
			>
				<article class="countries__container">
					<img
						:src="country.flags.svg"
						:alt="`Flag of ${country.name.common}`"
						class="countries__flag"
					/>
					<div class="countries__data">
						<h2>{{ country.name.common }}</h2>
						<p>
							<span class="bold">Population: </span
							>{{
								country.population
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							}}
						</p>
						<p><span class="bold">Region:</span> {{ country.region }}</p>
						<p><span class="bold">Capital:</span> {{ country.capital?.[0] }}</p>
					</div>
				</article>
			</RouterLink>
		</div>
		<button @click="next" class="showBtn" v-if="fin < allCountries.length">
			Show more
			<i class="fa-solid fa-chevron-down"></i>
		</button>
	</section>
</template>

<style lang="scss">
$Radius: 0.5rem;
$Shadow: 0 0 10px rgba(0, 0, 0, 0.199);

.error {
	
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	font-size: 3rem;
	text-align: center;
	gap: 3rem;

	p {
		font-size: 2rem;
		color: rgba(0, 0, 0, 0.452);
	}
}
.fa-xmark {
	display: none;
	cursor: pointer;
	font-size: 1.3rem;
}
.fa-chevron-down {
	font-size: 2rem;
	animation: ping 2s ease-in-out infinite both;
}

@keyframes ping {
	0% {
		transform: scale(0.2);
		opacity: 0.8;
	}

	80% {
		transform: scale(1.2);
		opacity: 0;
	}

	100% {
		transform: scale(2.2);
		opacity: 0;
	}
}

.showBtn {
	font-weight: bold;
	display: flex;
	flex-direction: column;
	background-color: transparent;
	border: none;
	margin: clamp(1rem, 4vw, 4rem);
	font-size: 1rem;
	cursor: pointer;
	letter-spacing: 2px;
	border-radius: $Radius;
	padding: 1rem;
	text-transform: uppercase;
	letter-spacing: 2px;

	&:hover {
		transform: scale(1.05);
	}
}

#check {
	display: none;
}

#check:checked ~ .dropdown {
	display: block;
	opacity: 1;
	visibility: visible;
	max-height: 200px;
	max-width: 100%;
	padding: 1rem;
}

#check:checked ~ label::after {
	transform: scaleY(-1);
}

.dropdown {
	overflow: hidden;
	transition: all 0.3s;
	user-select: none;
	position: absolute;
	top: 45px;
	background-color: var(--Light-Theme-Container);
	width: 100%;
	box-shadow: $Shadow;
	opacity: 0;
	max-height: 0;
	max-width: 0;
	visibility: hidden;
	border-radius: $Radius;
	z-index: 9999;

	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	&-container {
		position: relative;

		.regionRadios {
			display: flex;
			justify-content: space-between;
			cursor: pointer;

			&:focus-within {
				font-weight: bold;
			}
		}
	}
}

.regionLabel {
	border-radius: $Radius;
	user-select: none;
	padding: 2rem;
	background-color: var(--Light-Theme-Container);
	box-shadow: $Shadow;
	padding: 1.2rem 1rem;
	cursor: pointer;
	font-weight: 600;

	&::after {
		content: '';
		transition: 0.3s;
		margin-left: 35px;
		background-image: url('../assets/icon-arrow-down.svg');
		background-position: center;
		width: 10px;
		aspect-ratio: 1;
		display: inline-block;
		background-repeat: no-repeat;
	}
}
.dark .sortBy, .dark .sortOrder {
	background-color: #2b3743;
;
}
.sort-controls {
    border-radius: 0.5rem;
    display: flex;
    overflow: hidden;
    align-items: center;
	background-color: transparent;
    width: 50%;
    gap: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.199);
    padding: 1.2rem 2rem;
}
.sortBy, .sortOrder {
	border-radius: $Radius;
	display: flex;
	overflow: hidden;
	align-items: center;
	background-color: #ffffff;
	box-shadow: $Shadow;

	&:focus-within {
		outline: 2px solid black;
	}

	input {
		font-size: 1rem;
		border: none;
		font-family: inherit;
		background-color: inherit;
		width: 100%;
		&:focus {
			outline: none;
		}
	}
}

.input-area {
	border-radius: $Radius;
	display: flex;
	overflow: hidden;
	align-items: center;
	background-color: var(--Light-Theme-Container);
	width: 30%;
	gap: 2rem;
	box-shadow: $Shadow;
	padding: 1.2rem 2rem;

	&:focus-within {
		outline: 2px solid black;
	}

	input {
		font-size: 1rem;
		border: none;
		font-family: inherit;
		background-color: inherit;
		width: 100%;
		&:focus {
			outline: none;
		}
	}
}

.Home {
	width: 95%;
	min-height: 80vh;
	display: flex;
	justify-content: start;
	flex-direction: column;
	align-items: center;
	margin: 0rem auto;
	margin-bottom: 1rem;
}

.searchArea {
	width: 100%;
	padding: 3rem 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.countries {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: clamp(1rem, 5vw, 6rem);

	&__flag {
		width: 100%;
		height: 100%;
		object-fit: cover;
		aspect-ratio: 16/9;
	}

	&__container {
		box-shadow: $Shadow;
		border-radius: $Radius;
		overflow: hidden;
		display: grid;
		grid-template-rows: 1fr 1fr;
		background-color: var(--Light-Theme-Container);
		transition: background-color 0.3s, transform .3s;

		&:hover {
			transform: scale(1.05);
		}
	}

	&__data {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 2rem;

		h2 {
			margin-bottom: 1rem;
		}
	}

	.bold {
		font-weight: bold;
	}
}

.lds-spinner {
	color: official;
	display: inline-block;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80px;
	height: 80px;
}

.lds-spinner div {
	transform-origin: 40px 40px;
	animation: lds-spinner 1.2s linear infinite;
}

.lds-spinner div:after {
	content: ' ';
	display: block;
	position: absolute;
	top: 3px;
	left: 37px;
	width: 6px;
	height: 18px;
	border-radius: $Radius;
	background: rgb(0, 0, 0);
}

.lds-spinner div:nth-child(1) {
	transform: rotate(0deg);
	animation-delay: -1.1s;
}

.lds-spinner div:nth-child(2) {
	transform: rotate(30deg);
	animation-delay: -1s;
}

.lds-spinner div:nth-child(3) {
	transform: rotate(60deg);
	animation-delay: -0.9s;
}

.lds-spinner div:nth-child(4) {
	transform: rotate(90deg);
	animation-delay: -0.8s;
}

.lds-spinner div:nth-child(5) {
	transform: rotate(120deg);
	animation-delay: -0.7s;
}

.lds-spinner div:nth-child(6) {
	transform: rotate(150deg);
	animation-delay: -0.6s;
}

.lds-spinner div:nth-child(7) {
	transform: rotate(180deg);
	animation-delay: -0.5s;
}

.lds-spinner div:nth-child(8) {
	transform: rotate(210deg);
	animation-delay: -0.4s;
}

.lds-spinner div:nth-child(9) {
	transform: rotate(240deg);
	animation-delay: -0.3s;
}

.lds-spinner div:nth-child(10) {
	transform: rotate(270deg);
	animation-delay: -0.2s;
}

.lds-spinner div:nth-child(11) {
	transform: rotate(300deg);
	animation-delay: -0.1s;
}

.lds-spinner div:nth-child(12) {
	transform: rotate(330deg);
	animation-delay: 0s;
}

@keyframes lds-spinner {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
}

@media (max-width: 1015px) {
	.searchArea {
		justify-content: start;
		flex-direction: column;
		align-items: flex-start;
		gap: 3rem;
	}

	.input-area {
		width: 100%;
	}
}
</style>
