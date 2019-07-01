<template>
  <div class="dynamic-page">
    <van-button v-if="!auth.loggedIn" size="large" type="info" to="/login">登录</van-button>
    <van-tabs v-model="dynamic_activity" swipeable animated @change="changePage">
      <van-tab title="关注" name="attention">
        <div class="artsbody">关注</div>
      </van-tab>
      <van-tab title="广场" name="portal">
        <div class="artsbody">广场</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "dynamic",
  data() {
    return {
      dynamic_activity: "1"
    };
  },
  computed: {
    ...mapGetters(["auth"])
  },
  methods: {
    changePage(index, title) {
      if (index === 0 && !this.auth.loggedIn) {
        this.$router.push({ name: "login" });
      }
    }
  }
};
</script>

<style lang="scss">
.dynamic-page {
  display: flex;
  flex-direction: column;
  .van-tabs {
    flex: 1;
    .van-tab {
      flex: initial;
    }
  }
  .van-tabs__content,.van-tab__pane{
    height: 100%;

  }
  .artsbody{
    height: 100%;
  }
}
</style>
