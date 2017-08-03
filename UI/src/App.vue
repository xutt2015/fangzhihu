<template>
  <div id="app" ref='app'>
    <!-- <img src="./assets/logo.png"> -->
    <router-view :userInfo=userInfo @upup='changeUserInfo'></router-view>
  </div>
</template>

<script>
import VueResource from 'vue-resource';
Vue.use(VueResource);

import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
export default {
  name: 'app',
  data(){
    return{
      userInfo:{
        name:'',
        emailPhone:'',
        password:''
      }
    }
  },
  methods:{
    // 当前登录用户信息
    changeUserInfo(msg){
      this.userInfo=msg;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
