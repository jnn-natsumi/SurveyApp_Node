<template>
    <div>{{message}}</div>
</template>
<script lang="ts">
import Vue from "vue"
import axios from "axios"

export default Vue.extend({
    data(){
        return {
            message: ""
        }
    },
    async created(){
        const code = this.$route.query.code;
        const redirect_uri = window.location.href.split("?")[0];
        try {
            const response = await axios.post("/api/login/google/loginPath", { code, redirect_uri });
            const authInfo = response.data;
            if(authInfo.access_token){
                Vue.prototype.$loginInfo = {
                    oAhtuProvider: "google",
                    accessToken: authInfo.access_token
                }
                this.$router.push("/enquete/list")
                return; 
            }
        } catch(throughtToNext){
        }
        this.message = "Googleでのログイン検証に失敗しました。再度やり直してください。"
        setTimeout(()=>{
            this.$router.push("/login")
        }, 5000);
    }
});
</script>