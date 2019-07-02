<template>
  <div class="home-header">
        <van-tabs
          class="home-header-titlewrap"
          title-active-color="#1989fa"
          color="#1989fa"
          line-width="10px"
          v-model="hone_active"
          @disabled="onDisabled"
          animited
          swipeable
          sticky
          border
        >
          <van-tab disabled>
            <div slot="title">
              <van-icon name="search" size="18px" class="home-header-search" />
            </div>
          </van-tab>
          <van-tab title="关注" name="attention">
            <Attention />
          </van-tab>
          <van-tab title="推荐" name="recommend">
            <Recommend />
          </van-tab>
          <van-tab title="视频" name="vedio">
            <Vedio />
          </van-tab>
          <van-tab title="图文" name="photo_article">
            <PhotoArticle />
          </van-tab>
        </van-tabs>
  </div>
</template>

<script>
const Attention = () =>
  import(/* webpackChunkName: "Attention" */ "./Attention");
const Recommend = () =>
  import(/* webpackChunkName: "Recommend" */ "./Recommend");
const Vedio = () => import(/* webpackChunkName: "Vedio" */ "./Vedio");
const PhotoArticle = () =>
  import(/* webpackChunkName: "PhotoArticle" */ "./PhotoArticle");
export default {
  name: "home",
  components: {
    Attention,
    Recommend,
    Vedio,
    PhotoArticle
  },
  data() {
    return {
      hone_active: "2"
      // tabList: [
      //   {
      //     tabName: "关注",
      //     pathName: "attention"
      //   },
      //   {
      //     tabName: "推荐",
      //     pathName: "recommend"
      //   },
      //   {
      //     tabName: "视频",
      //     pathName: "vedio"
      //   },
      //   {
      //     tabName: "图文",
      //     pathName: "photo_article"
      //   }
      // ]
    };
  },
  watch: {
    // hone_active: {
    //   handler: function(newval, oldval) {
    //     this.$router.replace({ name: this.tabList[newval].pathName });
    //   },
    //   immediate: true
    // },
  },
  methods: {
    onDisabled(index, title) {
      console.log('%ctitle: ','color: MidnightBlue; background: Aquamarine; font-size: 20px;',title);
      console.log('%cindex: ','color: MidnightBlue; background: Aquamarine; font-size: 20px;',index);

    }
  }
};
</script>

<style lang="scss">
.home-header-titlewrap{
  .van-tab--disabled{
    flex-basis: 13% !important;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #7d7e80 !important;
    &>div>div{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

</style>
