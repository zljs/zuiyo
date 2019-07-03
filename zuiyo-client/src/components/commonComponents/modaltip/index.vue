<template>
  <div>
    <div class="ui-center modal" :class="modalShow ? 'modal-active' : 'modal-out'">
      <div class="modal-bd">
        <h3>提示</h3>
        <p class="tit">{{msg}}</p>
        <div class="footbtn">
          <button class="clickbtn" v-on:click="confirm">我知道了</button>
        </div>
        <i class="close" v-on:click="confirm"></i>
      </div>
    </div>
    <div class="dimmer" :class="{  active: modalShow }"></div>
  </div>
</template>

<script>
export default {
  name: 'modalTip',
  data () {
    return {
      modalShow: true,
      msg: '',
      success: null
    }
  },
  methods: {
    confirm () {
      this.modalShow = false
      document.body.style.overflow = 'auto'
      window.removeEventListener('touchmove', function (event) {
        event.preventDefault()
      })
      if (this.success) {
        this.success()
      }
    }
  }
}
</script>
<style lang="scss">
// @import url(../../../style/style.css);
</style>
