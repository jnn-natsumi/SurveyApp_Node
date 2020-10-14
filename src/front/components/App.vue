<template>
    <div>
        <router-view />
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";
import PostEnquete from "./PostEnquete.vue"
import EnqueteResultList from "./EnqueteResultList.vue";

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: PostEnquete },
        {path: '/enquete/list', component: EnqueteResultList }
    ]
})

Vue.use(VueRouter);
export default Vue.extend({
    router
    // components:{PostEnquete}
});
</script>