<template>
  <div>
    <div
      class="box"
      v-swipe="{fn:vuetap,name:'ceshi'}"
      v-tap="{fn:vuetap,name:'点击'}"
      v-longtap="{fn:vuetap,name:'长按'}"
      v-swipeleft="{fn:vuetap,name:'左滑'}"
      v-swiperight="{fn:vuetap,name:'右滑'}"
      v-swipeup="{fn:vuetap,name:'上滑'}"
      v-swipedown="{fn:vuetap,name:'下滑'}"
    >{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: "news",
  data() {
    return {
      name: "开始"
    };
  },
  methods: {
    vuetap: function(s, e) {
      console.log(e);
      this.name = s.name;
    }
  }
};
</script>

<style>
.box {
  width: 250px;
  height: 250px;
  background-color: rgb(105, 199, 199);
  color: #ffffff;
  text-align: center;
  line-height: 250px;
  font-size: 30px;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
