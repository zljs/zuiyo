<template>
  <div>
    <van-nav-bar
      left-text
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
      <field-group class="login" :fieldBtnHandler="login" btnText="登  录"></field-group>

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
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      this.$router.push({ name: "register" });
    },
    async login() {
      await axios.post("/zuiyo/register", {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>
<style lang="scss">
.login {
  width: 80%;
  margin: 40vw auto 0;
  .van-field__label {
    width: 10vw !important;
  }

}

</style>
