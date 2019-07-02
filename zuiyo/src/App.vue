<template>
  <div id="app">
    <transition :name="getTransitionName" mode="in-out">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="$router.name" class="absolute"/>
      </keep-alive>
    </transition>
    <transition :name="getTransitionName">
        <router-view v-if="!$route.meta.keepAlive" :key="$router.name" class="absolute"/>
    </transition>
    <van-tabbar v-if="$route.meta.showBar" v-model="active" route>
      <template v-for="item in tabBar">
        <van-tabbar-item
          :key="item.path"
          replace
          :name="item.name"
          :to="item.path"
          :dot="item.dot"
          :icon="item.path.search(active)>0?item.icon_selected:item.icon_default"
        >{{item.title}}</van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>
<script>
import { checkUpdate } from "@/services/commonHttp.js";
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      transitionName: "",
      active: "home",
      tabBar: [
        {
          title: "home",
          name: "home",
          path: "/home",
          icon_default: "home-o",
          icon_selected: "diamond",
          dot: false,
          info: ""
        },
        {
          title: "动态",
          name: "dynamic",
          path: "/dynamic",
          icon_default: "star-o",
          icon_selected: "star",
          dot: true,
          info: ""
        },
        {
          title: "消息",
          name: "news",
          path: "/news",
          icon_default: "smile-comment-o",
          icon_selected: "smile-comment",
          dot: false,
          info: ""
        },
        {
          title: "我的",
          name: "mycenter",
          path: "/mycenter",
          icon_default: "manager-o",
          icon_selected: "manager",
          dot: false,
          info: ""
        }
      ]
    };
  },
  watch: {
    $route(to, from) {
      this.active = to.name;
      
      this.setTransitionName({to, from})
    }
  },
  computed:{
    ...mapGetters(['getTransitionName'])
  },
  async created() {

    const res = await checkUpdate({ version: "ver_0626" });
    if (res && res.success.needUpdate) {
      this.tabBar = res.success.tabBarList;
    }
  },
  methods:{
    ...mapActions(['setTransitionName'])
  }
};
</script>

<style lang="scss">
@import url("~@/assets/style/animate.css");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.absolute {
  position: absolute;
  width: 100%;
  height: 100%;
}
.van-hairline--bottom::after {
  border-bottom-width: 0 !important;
}
.van-nav-bar {
  background-color: transparent !important;
}
.van-hairline--top-bottom::after {
  border-width: 0 !important;
}

.field_btn {
  color: #1989fa;
  border: none;
}
.van-field__button{
  button{
    border-color: transparent;
    background-color: transparent;
  }
}
.grey {
  color: #8e8e8e;
}
</style>
