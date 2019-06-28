<template>
  <div>
    <van-nav-bar
      left-text
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
      <field-group class="login" type="login"></field-group>

  </div>
</template>

<script>
// @ is an alias to /src
import fieldGroup from "@/components/viewsComponents/fieldGroup.vue";

export default {
  name: "Login",
    components: {
    "field-group": fieldGroup
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      this.$router.push({ name: "register" });
    },

  }
};
</script>
<style lang="scss">
.login {
  margin: 40vw auto 0;
}

</style>
