import QRCode from './lib/qrcode.js'

const VueQRCode = {
  props: {
    tag: {
      type: String,
      default: 'div'
    },
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
    logo: String,
    maxLogoScale: {
      type: Number,
      default: 3
    },
    logoSize: Number,
    logoClass: {
      type: String,
      default: 'qrcode-logo'
    }
  },
  mounted () {
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
      this.update()
    },
    colorLight (val) {
      this.$qrcode._htOption.colorLight = val
      this.makeCode()
    },
    colorDark (val) {
      this.$qrcode._htOption.colorDark = val
      this.makeCode()
    }
  },

  methods: {
    update () {
      const $el = this.$el
      const $logo = this.$refs.logo
      while ($el && $logo && $el.childNodes.length && $el.lastChild !== $logo) {
        $el.removeChild($el.lastChild)
      }

      if (this.$qrcode) {
        this.$qrcode.clear()
      }
      const options = { ...this._props }
      options.width = options.height = this.size
      this.$qrcode = new QRCode(this.$el, options)
    },

    makeCode (text) {
      this.$qrcode.clear()
      this.$qrcode.makeCode(text || this.text)
    }
  },

  render (h) {
    const style = {
      position: 'relative',
      width: this.size + 'px',
      height: this.size + 'px'
    }
    let child = this.$slots.default
    if (this.logo) {
      child = h('img', {attrs: {src: this.logo}, class: this.logoClass})
    }
    if (child) {
      child.data.style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        maxWidth: `${this.size / this.maxLogoScale}px`,
        maxHeight: `${this.size / this.maxLogoScale}px`,
        transform: 'translate(-50%, -50%)',
        ...child.data.style,
        zIndex: 1
      }
      if (this.logoSize) {
        child.data.style = {
          width: `${this.logoSize}px`,
          height: `${this.logoSize}px`,
          ...child.data.style
        }
      }
      child.data.ref = 'logo'
    }
    return h(this.tag, {style}, [child])
  }
}

export default VueQRCode
if (window.Vue) {
  window.Vue.component('qrcode', VueQRCode)
}