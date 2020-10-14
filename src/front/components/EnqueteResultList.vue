<template>
    <div>
        <h1>アンケート回答一覧</h1>
        <table>
            <tr>
                <th>点数</th>
                <th>ご意見・ご要望</th>
                <th>メールアドレス</th>
            </tr>
            <tr v-for="enquete in enquetes" :key="enquete.id">
                <td>{{enquete.point}}</td>
                <td>{{enquete.message}}</td>
                <td>{{enquete.mail}}</td>
            </tr>
        </table>
    </div>
</template>
<script lang="ts">
import  Vue from "vue";
import axios from "axios";

export default Vue.extend({
    data(){
        return {
            enquetes: [],
        };
    },
    async created() {
        const response = await axios.get("/api/enquetes");
        this.enquetes = response.data;
    },
});
</script>