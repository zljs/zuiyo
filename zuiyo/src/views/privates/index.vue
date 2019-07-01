<template>
  <div class="privates-wrapper">
    <van-nav-bar left-text left-arrow @click-left="onClickLeft">
      <div slot="title">
        <span class="page-title" :class="{'page-select':pageInd===0}" @click="swipeTo(0)">主页</span>
        <span class="line">|</span>
        <span class="page-title" :class="{'page-select':pageInd===1}" @click="swipeTo(1)">空间</span>
      </div>
    </van-nav-bar>

    <van-swipe class="page_swipe" ref="page_swipe" @change="onChange" :loop="false" :show-indicators="false" :touchable="touchable">
      <div class="banner"></div>
      <van-swipe-item>
        <van-tabs v-model="homePageTabActive" swipeable animated>
          <van-tab title="帖子" name="invitation">
            <div class="invitation">帖子</div>
          </van-tab>
          <van-tab title="评论" name="remark">
            <div class="remark">评论</div>
          </van-tab>
          <van-tab title="话题" name="topic">
            <div class="topic">话题</div>
          </van-tab>
        </van-tabs>
      </van-swipe-item>
      <van-swipe-item>
        <div class="square">
          此刻
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Square from "./Square";
import HomePage from "./HomePage";
export default {
  data() {
    return {
      touchable: false,
      pageActive: "square",
      homePageTabActive: 0,
      pageInd: 0
    };
  },
  watch: {
    homePageTabActive: {
      handler: function(newval, oldval) {
        this.touchable = false;
        if (newval === 2) {
          this.touchable = true;
        }
      },
      immediate: true,
      // deep: true
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onChange(index) {
      this.pageInd = index;
    },
    swipeTo(index) {
      this.$refs.page_swipe.swipeTo(index)
    }
  }
};
</script>

<style lang="scss">
.privates-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.banner {
  height: 200px;
}
.page_swipe{
  flex-grow: 1;
  &>.van-swipe__track{

  }
}
.invitation,
.remark,
.topic {
  height: 300px;
}
.square{
  height: 100%;
}
.line {
  margin: 0 10px;
}
.page-title {
  color: #7e7e7e;
}
.page-select {
  color: #000;
  font-size: 18px;
}
</style>
