<template>
  <div>
    <van-nav-bar title="注册" left-text left-arrow @click-left="onClickLeft"/>
    <field-group  class="register" type="register"></field-group>
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
    
  }
};
</script>
<style lang="scss">

</style>
