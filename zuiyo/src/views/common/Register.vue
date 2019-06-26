<template>
  <div>
    <van-nav-bar title="注册" left-text left-arrow @click-left="onClickLeft"/>
    <field-group  class="register" :fieldBtnHandler="register" btnText="注  册"></field-group>
  </div>
</template>
<script>
import fieldGroup from "@/components/viewsComponents/fieldGroup.vue";
export default {
  name: "Register",
  components: {
    "field-group": fieldGroup
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async register() {
      console.log(1);
    }
  }
};
</script>
<style lang="scss">

</style>
