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
    <div v-if="!auth.loggedIn" style="margin-top:100px;">
      手机号：{{getAccount.phone}} <br>
      密码： {{getAccount.password}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import fieldGroup from "@/components/viewsComponents/fieldGroup.vue";

export default {
  name: "Login",
    components: {
    "field-group": fieldGroup
  },
    computed:{
    ...mapGetters(['auth', 'getAccount'])
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
