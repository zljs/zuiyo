<template>
  <van-cell-group>
    <van-field
      v-model="phone"
      type="tel"
      v-focus="true"
      clearable
      label="+86"
      left-icon
      placeholder="请输入手机号"
    />
    <van-field v-model="password" type="password" placeholder="请输入验证码">
      <button slot="button" @click="getCode">
        <count-down v-if="counting" class="grey" :time="6000" @end="handleCountdownEnd">
          <template slot-scope="props">重新发送({{ props.totalSeconds }})</template>
        </count-down>
        <span v-else class="field_btn" :class="{grey:grey}">获取验证码</span>
      </button>
    </van-field>
    <van-button size="large" type="info" class="vanbtn" round @click="fieldBtnHandler">{{btnText}}</van-button>
  </van-cell-group>
</template>

<script>
import { mapActions } from "vuex";
import Coi from "@/config/utils/Coi.js";
import countDown from "@/components/funComponents/countDown.js";
export default {
  props: {
    fieldBtnHandler: {
      type: Function,
      require: true
    },
    btnText: {
      type: String,
      default: "注册"
    }
  },
  components: {
    countDown
  },
  data() {
    return {
      phone: "",
      password: "",
      grey: true,
      counting: false
    };
  },
  watch: {
    phone: {
      handler: function(newval, oldval) {
        this.grey = newval ? false : true;
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(["setTip"]),

    handleCountdownEnd() {
      this.counting = false;
    },
    async getCode() {
      let coiValidate = new Coi();
      coiValidate
        .data(this.phone)
        .isRequired("手机号码不能为空")
        .maxLength("11")
        .isMobile("手机格式错误");
      let errormsg = coiValidate.errorMessage;
      let pass = coiValidate.pass;
      if (pass) {
        this.counting = true;
      } else {
        this.setTip({ msg: errormsg });
      }
    }
  }
};
</script>

<style lang="scss">
.vanbtn{
    margin-top: 20px;
}

.register {
  width: 80%;
  margin: 0 auto;
  .van-field__label {
    width: 10vw !important;
  }
}
</style>
