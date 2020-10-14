<template>
    <div>
        <post-enquete/>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import PostEnquete from "./PostEnquete.vue"

export default Vue.extend({
    components:{PostEnquete}
});
</script>