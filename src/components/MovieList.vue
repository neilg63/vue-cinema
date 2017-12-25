<template>
<div id="movie-list">
	<div v-if="filteredMovies.length" class="results">
		<movie-item v-for="item in filteredMovies" 
		v-bind:movie="item.movie">
			<div class="movie-sessions">
				<div
					v-for="session in filterSessions(item.sessions)"
					class="session-time-wrapper tooltip-wrapper"
					v-tooltip="{seats: session.seats}">
					<div class="session-time">{{formatSessionTime(session.time)}}</div>
				</div>
			</div>
		</movie-item>	
	</div>
	<div v-else-if="movies.length" class="no-results">
		{{noResults}}
	</div>
	<div v-else class="loading">
		Loading...
	</div>
</div>
</template>
<script>
import genres from '../util/genres';
import times from '../util/times';
import MovieItem from './MovieItem.vue';

export default {
	props: [
		'genre',
		'time',
		'movies',
		'day'
	],
	computed: {
		filteredMovies() {
			return this.movies
				.filter(this.moviePassesGenreFilter)
				.filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
		},
		noResults() {
			let times = this.time.join(', ');
			let gs = this.genre.join(', ');
			return `No results for ${times}, ${gs}`;
		}
	},
	methods: {
		moviePassesGenreFilter(item) {
			if (!this.genre.length) {
				return true;
			}
			let gs = item.movie.Genre.split(/,\s*/);
			let matched = true;
			this.genre.forEach(genre => {
				if (gs.indexOf(genre) === -1) {
					matched = false;
				}
			});
			return matched;
		},
		sessionPassesTimeFilter(session) {
			if (!this.day.isSame(session.time,'day')) {
				return false;
			} else if (this.time.length === 0 || this.time.length === 2) {
				return true;
			} else if (this.time.length === 1) {
				let h = this.$moment(session.time).hour();
				if (this.time[0] === times.AFTER_6PM) {
					return h >= 18;	
				} else {
					return h < 18;
				}
			}
		},
		formatSessionTime(raw) {
			return this.$moment(raw).format('h:mm A');
		},
		filterSessions(sessions) {
			return sessions
				.filter(session => {
					return this.sessionPassesTimeFilter(session);
				});
		}
	},
	components: {
		MovieItem
	},
	created() {
		console.log(eval("2*7 + 6"))
	}
};
</script>