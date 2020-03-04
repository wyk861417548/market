<template>
    <div @click="aa">
dawwdwa
    </div>
</template>

<script>
    export default {
        name: "aa",
        methods:{
            aa(){
                this.$axios.get('http://localhost:7878/aa');
            }
        }
    }

</script>

<style scoped>

</style>