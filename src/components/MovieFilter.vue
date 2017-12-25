<template>
<div id="movie-filter">
		<h2>Filter results</h2>
		<h3>By time of day</h3>
		<div class="filter-group">
			<check-filter v-for="time in times" v-bind:title="time" category="time"></check-filter>
		</div>
		<h3>By genre</h3>
		<div class="filter-group">
			<check-filter v-for="genre in genres" v-bind:title="genre" category="genre"></check-filter>
		</div>
</div>
</template>
<script>
import CheckFilter from './CheckFilter.vue';
import genres from '../util/genres';
import times from '../util/times';
export default {
	data() {
		return {
			genres,
			times
		}
	},
	methods: {
		checkFilter(category, title, checked) {
			this.$bus.$emit('check-filter', category, title, checked);
		}
	},
	components: {
		CheckFilter 
	}
}
</script>