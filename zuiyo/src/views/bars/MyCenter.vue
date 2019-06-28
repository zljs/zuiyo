<template>
    <div>
         个人中心
      <van-button size="large" type="info" to="/login">登录</van-button>
      <van-button size="large" type="info" @click="logout">退出登录</van-button>
      <van-button size="large" type="info" @click="getUserInfo">获取用户信息</van-button>

    </div>
</template>

<script>
import { logout, getUserInfo } from '@/services/commonHttp.js'
export default {
  name: 'mycenter',
  methods:{
    logout,
    async getUserInfo(){
      const userinfo = await getUserInfo()
    },
    
  }
}
</script>

<style>

</style>
