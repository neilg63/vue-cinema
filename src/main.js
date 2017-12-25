import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype,'$moment', { get() { return this.$root.moment } });

import {checkFilter, setDay} from './util/bus.js';
const bus = new Vue();

Object.defineProperty(Vue.prototype,'$bus', { get() { return this.$root.bus } });
import routes from './util/routes';

import tooltip from './util/tooltip';

Vue.use(tooltip);

const router = new VueRouter({
	routes
});

new Vue({
	el: '#app',
	data: {
		title: "Cinema Listings",
		genre: [],
		time: [],
		movies: [],
		moment,
		day: moment(),
		bus
	},
	created() {
		this.$http.get('./api').then(response => {
			this.movies = response.data;
		}, error => {

		});
		this.$bus.$on('check-filter',checkFilter.bind(this));		
		this.$bus.$on('set-day',setDay.bind(this) );
	},
	router
});

