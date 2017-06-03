<template>
  <div id="app">
    <h1> Vue Qrcode Demo </h1>
    <ul class="lists">
      <li>
        <label>size(px)</label>
        <input type="number" v-model.number="size">
      </li>
      <li>
        <label>bg-color</label>
        <input type="color" v-model="colorLight">
      </li>
      <li>
        <label>fg-color</label>
        <input type="color" v-model="colorDark">
      </li>
      <li>
        <label>val</label>
        <textarea rows="6" cols="80" v-model="text"></textarea>
      </li>
    </ul>
    <qrcode class="qrcode"
      :text="text"
      :size="size"
      :colorLight="colorLight"
      :colorDark="colorDark"
      :logo="'https://avatars0.githubusercontent.com/u/1384521?v=3&s=80'"
      :logoSize="40"
      >

    </qrcode>
  </div>
</template>

<script>
import qrcode from './qrcode'

export default {
  name: 'app',
  data() {
    return {
      size: 128,
      colorLight: '#ffffff',
      colorDark: '#000000',
      text: 'https://github.com/'
    }
  },
  components: {
    qrcode
  }
}
</script>

<style>
#app {
  width: 600px;
  margin: 0 auto;
  text-align: center;
}

header {
  font-size: 20px;
}

.lists{
  padding: 0;
  text-align: left;
  list-style: none;
  width: 300px;
  margin: 0 auto;
  margin-bottom: 30px;
}

.lists li{
  margin-bottom: 8px;
}

.lists label{
  display: block;
  margin-bottom: 5px;
}

.lists textarea{
  width: 100%;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.qrcode {
  margin: 0 auto;
}
</style>
