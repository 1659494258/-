<template>
    <div class="home">
        This is the front page
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
    }
  },
  created() {
    // window.location.href="http://47.244.62.115:8290/sso/login?appCode=pay"
    window.sessionStorage.setItem("activeId","1");  //进入项目默认选择首页
    let token=window.sessionStorage.getItem("token"); //首次进来判断有没有token
    let accessToken = this.$route.query.accessToken ; //首次进来也没有   ,授权登录回来之后就可以拿到accesstoken 进项下面的操作
    if(token||accessToken){
      if(accessToken){  //第一次进来授权之后有了accesstoken
        this.getToken()    //带着accesstoken去上后端拿jwt作为token
      }
    }else{//没有的话进入授权登录页
      window.location.href="http://auth.indiafreeloan.in/sso/login?appCode=pay"
    }
    this.getToken();
  },
  mounted() {
    // if(token){   //有token才会获取后端数据
    //   this.getList();
    // }
  },
  watch: {},
  methods: {
    getToken() {
      let accessToken = this.$route.query.accessToken;
      console.log(accessToken);
    // let accessToken = '86e0400b89cc'
      axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";
      axios
        .get("http://payadmin.indiafreeloan.in/rest/passport/login",{params:{'accessToken':accessToken},} )
        .then((res) => {
          // 保存token到localstoage中
          window.sessionStorage.setItem("token", res.data.data);
          console.log(window.sessionStorage.getItem("token"))
        })
        .catch((err) => {console.log(err)});

    },

  },
  filters: {},
};
</script>

<style scoped lang="less">
    .home{
        width: 100%;
        height: 400px;
    }
</style>
