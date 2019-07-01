<template>
  <div>
    <transition :name="getTransitionName">
      <router-view :key="$router.name" class="absolute" />
      <div v-if="!$route.meta.child" class="absolute" >
        个人中心
        <van-button size="large" type="info" to="/privates">进入空间</van-button>
        <van-button size="large" type="info" @click="goSetting">设置</van-button>
        <van-button v-if="!auth.loggedIn" size="large" type="info" to="/login">登录</van-button>

        <div style="margin-top:100px;">
          手机号：{{getAccount.phone}}
          <br />
          密码： {{getAccount.password}}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getUserInfo } from "@/services/commonHttp.js";
export default {
  name: "mycenter",
  data() {
    return {
      // showSetting: false
    };
  },

  computed: {
    ...mapGetters(["auth", "getAccount", "getTransitionName"])
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    ...mapActions(["setTransitionName"]),
    async getUserInfo() {
      const userinfo = await getUserInfo();
    },
    goSetting() {
      this.$router.push("/mycenter/setting");
    }
  }
};
</script>

<style>
.van-button {
  margin-top: 20px;
}
</style>
