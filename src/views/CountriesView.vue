<script setup>
import { useGetData } from '../composables/getData';
import { useRoute, useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
import { ref, watch } from 'vue';
import axios from 'axios';

const dataBorder = ref([]);
const route = useRoute();
const router = useRouter();
const { data, getData } = useGetData();
function home() {
	router.push('/');
}
getData(
	`https://restcountries.com/v3.1/alpha/${route.params.name}?fields=name,capital,population,region,subregion,tld,currencies,languages,nativename,flags,borders`
);

const getDataBorder = async (url) => {
	try {
		const res = await axios.get(url);
		dataBorder.value = res.data;
	} catch (error) {
		console.log(error);
	}
};

getDataBorder('https://restcountries.com/v3.1/all?fields=name,cca3,borders');

const getCountryName = (a3code) => {
	const country = dataBorder.value.find((c) => c.cca3 === a3code);
	return country ? country.name.common : '';
};
</script>
<template>
	<div class="lds-spinner" v-if="!data">
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
	<section class="details" v-else>
		<button class="details__back" @click="home()">
			<i class="fa-solid fa-arrow-left-long"></i>
			Back
		</button>
		<div class="details__main">
			<img
				:src="`${data?.flags.svg}`"
				:alt="`Flag of ${data?.name.common}`"
				class="details__flag"
			/>

			<div class="details__texts">
				<h2>{{ data?.name.common }}</h2>
				<ul class="details__data margin">
					<li>
						<span class="bold">Native Name:</span>
						{{ Object.values(data?.name.nativeName)[0].common }}
					</li>
					<li>
						<span class="bold">Population:</span>
						{{
							data?.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}}
					</li>
					<li><span class="bold">Region:</span> {{ data?.region }}</li>
					<li><span class="bold">Sub Region:</span> {{ data?.subregion }}</li>
					<li><span class="bold">Capital:</span> {{ data?.capital[0] }}</li>
					<li class="margin">
						<span class="bold">Top Level Domain:</span>
						{{ data?.tld[0] }}
					</li>
					<li>
						<span class="bold cu">Currencies:</span>
						<template v-for="(item, index) in Object.values(data?.currencies)"
							>{{ ` ${item.name} ` }}
						</template>
					</li>

					<li>
						<span class="bold">Languages:</span>
						{{ Object.values(data?.languages).join(', ') }}
					</li>
				</ul>

				<div
					class="details__borders-container margin"
					v-if="data?.borders.length"
				>
					<p class="bold">Border Countries:</p>
					<RouterLink
						:to="`/borders/${borders}`"
						class="details__borders"
						v-for="borders in data?.borders"
					>
						{{ getCountryName(borders) }}
					</RouterLink>
				</div>
			</div>
		</div>
	</section>
</template>
<style scoped lang="scss">
$Radius: 0.5rem;

.bold {
	font-weight: bold;
}

.details {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	width: 95%;
	min-height: calc(85vh - 107px);
	margin: 0rem auto;
	gap: clamp(2rem, 8vw, 10rem);

	&__data {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 2rem;
		justify-content: space-between;
		align-items: flex-start;
		max-height: 200px;
	}

	&__texts {
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		gap: 1rem;
		overflow: auto;
		padding: 1rem;

		h2 {
			font-size: 2rem;
			width: 100%;
		}
	}

	&__main {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		max-width: max-content;
		margin: 0 auto;
	}

	&__flag {
		width: 100%;
		height: 100%;
		width: 700px;
		object-fit: contain;
		aspect-ratio: 16/9;
		object-position: left;

		&-container {
			display: flex;
			align-items: center;
		}
	}

	&__back {
		width: max-content;
		border: none;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.192);
		padding: 0.5rem 1.5rem;
		cursor: pointer;

		p {
			font-family: inherit;
			font-size: 1rem;
		}

		i {
			font-size: 1rem;
		}
	}

	&__borders {
		padding: 0rem 2rem;
		background-color: white;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.192);

		&-container {
			display: flex;
			gap: 1rem;
			flex-wrap: wrap;
		}
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
	border-radius: 20%;
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

@media (max-width: 1270px) {
	.details {
		margin: 2rem auto;

		&__main {
			grid-template-columns: 1fr;
		}

		&__data {
			max-height: 100%;
		}

		&__flag {
			width: 100%;
			object-position: center;
		}
	}
	.margin {
		margin-top: 2rem;
	}
}
</style>
