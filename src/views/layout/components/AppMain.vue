<template>
    <el-main>
        <!--路由的出口-->
        <router-view></router-view>
    </el-main>
</template>

<script>
    export default {
        name: "AppMain",
    }
</script>

<style scoped lang="less">
    el-main{
        padding:0 20px
    }
</style>
