<template>
  <el-header class="el-header">
    <div>
      <img width="60" src="../../../assets/images/logo.png" alt="" />
      <!-- <h2></h2> -->
    </div>
    <span
      class="icon iconfont icon-hamburger"
      @click="toggleAsideBar"
      :class="{ 'is-collapse': isCollapse }"
    ></span>
    <el-button type="danger" @click="signOut()">Sign out</el-button>
  </el-header>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    toggleCollapse: {
      type: Function,
    },
    isCollapse: {
      type: Boolean,
    },
  },
  methods: {
    toggleAsideBar() {
      this.toggleCollapse();
    },
    signOut(){

    }
  },
};
</script>

<style scoped lang="less">
.el-header {
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  div {
    display: flex;
    align-items: center;
    margin-right: 15px;
    h2 {
      margin-left: 20px;
    }
  }
  .icon-hamburger {
    font-size: 25px;
    position: absolute;
    left: 200px;
    top: 20px;
    cursor: pointer;
    transition: 0.2s;
  }
  .is-collapse {
    transform: rotate(-90deg);
  }
}
</style>
