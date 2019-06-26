<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view :key="$router.name" class="absolute"/>
    </transition>
    <van-tabbar v-if="$route.meta.showBar" v-model="active" route>
      <template v-for="item in tabBar">
        <van-tabbar-item
          :key="item.path"
          replace
          :name="item.name"
          :to="item.path"
          :dot="item.dot"
          :icon="active===item.name?item.icon_selected:item.icon_default"
        >{{item.title}}</van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>
<script>
import { checkUpdate } from "@/services/commonHttp.js";
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
      const routeDeep = ["/login", "/register"];
      const toDepth = routeDeep.indexOf(to.path);
      const fromDepth = routeDeep.indexOf(from.path);
      this.transitionName =
        toDepth > fromDepth
          ? "fold-left"
          : toDepth == fromDepth
          ? ""
          : "fold-right";
    }
  },

  async created() {
    const res = await checkUpdate({ version: "ver_0626" });
    if (res && res.success.needUpdate) {
      this.tabBar = res.success.tabBarList;
    }
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
}
.grey {
  color: #8e8e8e;
}
</style>
