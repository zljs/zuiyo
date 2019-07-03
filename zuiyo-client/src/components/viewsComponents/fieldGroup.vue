<template>
  <van-cell-group>
    <van-field
      v-model="phone"
      type="tel"
      maxlength="11"
      clearable
      label="+86"
      left-icon
      placeholder="请输入手机号"
    />
    <van-field v-if="type==='login'" type="password" v-model="password" maxlength="18" placeholder="请输入密码" />
    <van-field v-else v-model="authcode" type="number" maxlength="6" placeholder="请输入验证码">
      <button slot="button">
        <count-down v-if="counting" class="grey" :time="6000" @end="handleCountdownEnd">
          <template slot-scope="props">重新发送({{ props.totalSeconds }})</template>
        </count-down>
        <span v-else class="field_btn" :class="{ grey: grey }" @click="getCode">获取验证码</span>
      </button>
    </van-field>
    <van-button
      size="large"
      type="info"
      class="vanbtn"
      :class="{greybtn:disabled}"
      round
      :disabled="disabled"
      @click="typeHandler.fieldBtnHandler"
    >{{typeHandler.btnText}}</van-button>
  </van-cell-group>
</template>

<script>
import { mapActions } from "vuex";
import Coi from "@/config/utils/Coi.js";
import countDown from "@/components/funComponents/countDown.js";
import { getSmsCode, register, login } from "@/services/commonHttp.js";
import { trim } from '@/config/utils/common_utils.js'
export default {
  props: {
    type: {
      type: String,
      require: true
    }
  },
  components: {
    countDown
  },
  data() {
    return {
      phone: 17625805203,
      password: "",
      authcode: "",
      phonePass: false,
      grey: true,
      counting: false,
      disabled: true
    };
  },
  watch: {
    phone: {
      handler: function(newval, oldval) {
        this.grey = newval ? false : true;
      },
      immediate: true
    },
    isPhone: {
      handler: function(newval, oldval) {
        let { pass } = newval;
        this.phonePass = pass;
      },
      immediate: true
    },
    btnDisabled: {
      handler: function(newval, oldval) {
       this.disabled = newval;
      },
      immediate: true
    }
  },
  computed: {
    typeHandler() {
      let btnText = "",
        fieldBtnHandler = null;
      if (this.type === "login") {
        btnText = "登  录";
        fieldBtnHandler = this.login();
      } else if (this.type === "register") {
        btnText = "注  册";
        fieldBtnHandler = this.register();
      }
      return { btnText, fieldBtnHandler };
    },
    isPhone() {
      let coiValidate = new Coi();
      coiValidate
        .data(this.phone)
        .isRequired("手机号码不能为空")
        .maxLength("11")
        .isMobile("手机格式错误");
      let errormsg = coiValidate.errorMessage;
      let pass = coiValidate.pass;

      return { pass, errormsg };
    },
    btnDisabled(){
      if ( this.phonePass && (trim(this.authcode).length >= 4 || trim(this.password).length>0) ) {
          
        return false
        }
        return true
    }
  },
  methods: {
    ...mapActions(["setTip","setLoggedIn","setAccount"]),

    handleCountdownEnd() {
      this.counting = false;
    },
    async getCode() {
      let { pass, errormsg } = this.isPhone;
      if (pass) {
        this.counting = true;
        const res = await getSmsCode({ phone: this.phone });
        if (!res) {
          this.handleCountdownEnd();
        }
      } else {
        this.setTip({ msg: errormsg });
      }
    },
    login() {
      return async () => {
        console.log("login");
        let param = {
          phone: this.phone,
          password: this.password
        }
        const isOk = await login(param)
        if(isOk){
          this.setLoggedIn(true)
          this.setAccount({phone:this.phone,password:this.password})
          this.setTip({ 
            msg: '登录成功',
            fn:()=>{
              this.$router.back()
            } 
          });
        }
      };
    },
    register() {
      return async () => {
        console.log("register");
        let param = {
          phone: this.phone,
          authcode: this.authcode
        }
        const res = await register(param)
        if(res.isOk){
          this.setAccount({phone:res.phone,password:res.password})
          this.setTip({ 
            msg: '注册成功',
            fn:()=>{
              this.$router.back()
            } 
          });
        }
      };
    }
  }
};
</script>

<style lang="scss">
.vanbtn {
  margin-top: 20px;
}

.login,
.register {
  width: 80%;
  margin: 0 auto;
  .van-field__label {
    width: 10vw !important;
  }
}

.greybtn {
  background-color: #8e8e8e !important;
  border: 1px solid #8e8e8e !important;
}
</style>
