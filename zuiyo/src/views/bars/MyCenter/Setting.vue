<template>
  <div>
    设置
    <van-button v-if="auth.loggedIn" size="large" type="info" @click="logout">退出登录</van-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { logout } from "@/services/commonHttp.js";
export default {
  computed:{
    ...mapGetters(['auth'])
  },
  methods: {
    ...mapActions(["setLoggedIn"]),
    async logout() {
      const exited = await logout();
      if (exited) {
        this.setLoggedIn(false);
        this.$router.back();
      }
    }
  }
};
</script>

<style>
</style>
