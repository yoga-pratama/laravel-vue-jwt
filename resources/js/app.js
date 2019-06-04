/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';

var VueCookie = require('vue-cookie');

Vue.use(VueRouter);
Vue.use(VueAxios,axios);
Vue.use(VueCookie);


import App from './App.vue';
import LoginComponent from './components/LoginComponent.vue';
import DashboardComponent from './components/DashboardComponent.vue';
import RegisterComponent from './components/RegisterComponent.vue';

const routes = [
    {
        name : 'dashboard',
        path : '/',
        component: DashboardComponent,
        beforeEnter: (to, from, next) => {
           console.log('before enter');
           if(VueCookie.get('JWTtoken')){
            next();
           }else{
             next('/login');
           }
        }
    },
    {
        name : 'login',
        path : '/login',
        component: LoginComponent
    },
    {
        name : 'register',
        path : '/register',
        component: RegisterComponent
    }

];





const router = new VueRouter({ mode: 'history',routes: routes});
const app = new Vue(Vue.util.extend({ router }, App)).$mount('#app');
