<template>
  <div class="qrcode">
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
  props: {
    text: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 256
    },
    colorLight: {
      type: String,
      default: 'black'
    },
    colorDark: {
      type: String,
      default: 'white'
    },
    className: String,
    useSVG: Boolean
  },

  created () {
    this.update()
  },

  destroyed () {
    this.$qrcode.clear()
  },

  watch: {
    text () {
      this.makeCode()
    },
    size (val) {
      this.$qrcode._htOption.width = this.$qrcode._htOption.height = val
      this.makeCode()
    },
    colorLight (val) {
      this.$qrcode._htOption.colorLight = val
      this.makeCode()
    },
    colorDark (val) {
      this.$qrcode._htOption.colorDark = val
      this.makeCode()
    },
    useSVG (val) {
      this.update()
    }
  },

  methods: {

    update () {
      const options = { ...this.props }
      options.width = options.height = this.props.size
      this.$qrcode = new QRCode(this.$el, options)
    },

    makeCode (text) {
      this.$qrcode.clear()
      this.$qrcode.makeCode(text || this.text)
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
