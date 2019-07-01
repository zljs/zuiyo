<template>
  <div>
    <van-row class="home-header">
      <van-col span="4">
        <van-icon name="search" size="18px" class="home-header-search" />
      </van-col>
      <van-col span="20">
        <van-tabs class="home-header-titlewrap" title-active-color="#1989fa" color="#1989fa" line-width="10px" v-model="hone_active">
          <van-tab title="关注"></van-tab>
          <van-tab title="推荐"></van-tab>
          <van-tab title="视频"></van-tab>
          <van-tab title="图文"></van-tab>
        </van-tabs>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      hone_active: "1"
    };
  }
};
</script>

<style lang="scss">
.home-header {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
