<template>
    <el-aside class="aside" :width="isCollapse ? '45px' : '200px'">
        <el-menu
                :default-active="activeId"
                text-color="#000"
                active-text-color="#ffd04b"
                :collapse="isCollapse"
                :collapse-transition="false"
                class="aside"
        >
            <div v-for="(item,index) in menuList" :key="index">
                <el-menu-item
                        v-if="!item.children"
                        :index="item.id"
                        @click="dealNavLink(item._key,item.id)"
                >
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                </el-menu-item>
                <el-submenu v-else :index="item.id">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item
                        v-for="(subItem) in item.children"
                        :index="subItem.id"
                        :key="subItem.id"
                        @click="dealNavLink(subItem._key,subItem.id)"
                    >
                        <template slot="title">
                            <i :class="subItem.icon"></i>
                            <span slot="title">{{ subItem.title }}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
            </div>
        </el-menu>
    </el-aside>
</template>

<script>
    import menuConfig from "../config/menuConfig.json"
    export default {
        name: "LeftAside",
        props:{
            isCollapse:{
                type:Boolean
            }
        },
        created() {
            this.activeId = window.sessionStorage.getItem("activeId");
        },
        data(){
            return{
                menuList:menuConfig,
                activeId:"", // 被激活的ID
            }
        },
        methods: {
            dealNavLink(activePath,activeId){
                // console.log(activeId)
                // 要把activeId持久化
                window.sessionStorage.setItem("activeId",activeId);
                this.activeId = activeId;

                // 再进行跳转
                this.$router.push(activePath)
            }
        }
    }
</script>

<style scoped>
    .el-menu-vertical-demo{
        height: 100%;
    }
    .aside{
        height: 700px;
    }
    i{
        font-size: 20px;
        margin-right: 5px;
    }
</style>
