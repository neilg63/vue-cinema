<template>
	<div id="detail" v-if="movie">
		<movie-item v-bind:movie="movie">
			<p class="movie-genre">{{movie.Genre}}</p>
			<p class="movie-plot">{{movie.Plot}}</p>
			<table>
				<tbody>
					<tr><th>Released date</th><td>{{movie.Released}}</td></tr>
					<tr><th>Running time</th><td>{{movie.Runtime}}</td></tr>
					<tr><th>Director</th><td>{{movie.Director}}</td></tr>
					<tr><th>Actors</th><td>{{movie.Actors}}</td></tr>
				</tbody>
			</table>
			<div class="home">
				<router-link v-bind:to="{name:'home'}">Back to results</router-link>
			</div>
			
		</movie-item>
	</div>
	
</template>
<script>
import MovieItem from './MovieItem.vue';
	export default {
		props: ['movies'],
		computed: {
			movie() {
				let movie = this.movies.find(movie => movie.imdbID = this.$route.params.id );
				return movie ? movie.movie : null;
			}
		},
		components: {
			MovieItem
		},
		created() {
			
		}
	}

</script>