<template>
    <div>
        设置
      <van-button size="large" type="info" @click="logout">退出登录</van-button>

    </div>
</template>

<script>
import { logout } from '@/services/commonHttp.js'
export default {
    methods:{
        logout
    }
}
</script>

<style>

</style>
