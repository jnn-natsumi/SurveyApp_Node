<template>
    <div>
        <a href="" @click="moveToGoogleOAuth()" >Google でログイン</a>
    </div>
</template>
<script lang="ts">
import Vue from "vue"
import axios from "axios"

export default Vue.extend({
    methods: {
        async moveToGoogleOAuth(){
            const response = await axios.get("/api/login/google/loginPath");
            window.location.href = response.data.url
        }
    }
});
</script>