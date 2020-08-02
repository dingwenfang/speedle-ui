import Vue from 'vue';
import VueRouter from 'vue-router';
import PolicyMgmt from '../views/PolicyMgmt.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PolicyMgmt,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
