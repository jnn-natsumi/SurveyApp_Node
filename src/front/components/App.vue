<template>
  <div>
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";
import Enquete from "./PostEnquete.vue";
import EnqueteResultList from "./EnqueteResultList.vue";
import Login from "./Login.vue";
import RedirectedFromGoogle from "./RedirectedFromGoogle.vue";

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Enquete }
    ,{ path: '/enquete/list', component: EnqueteResultList }
    ,{ path: '/login', component: Login }
    ,{ path: '/oauthRedirect/google', component: RedirectedFromGoogle }

  ]
})
Vue.use(VueRouter);
export default Vue.extend({
  router
});
</script>