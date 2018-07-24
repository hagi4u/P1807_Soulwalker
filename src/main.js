// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Store from './utils/sessionStorage';
require('babel-polyfill');
require('normalize.css');

Vue.config.productionTip = false

var assetsLoader = require('assets-loader');
const loader = assetsLoader({
  assets: [
    require('@/assets/sounds/bg.mp3'),
    require('@/assets/sounds/button.mp3'),
    require('@/assets/sounds/typewritter.mp3'),
  ]
}).start();

/* eslint-disable no-new */
// initial settings 값이 필요 하여 render function 형태로 렌더링 되게 수정

new Vue({
  el: '#app',
  render(h) {
    return h(App, {
      props: {
        initial: Store.getStore()
      }
    })
  }
})
