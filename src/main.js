// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
require('babel-polyfill');
require('normalize.css');

var assetsLoader = require('assets-loader');


Vue.config.productionTip = false

const loader = assetsLoader({
  assets: [
    require('@/assets/sounds/bg.mp3'),
    require('@/assets/sounds/button.mp3'),
    require('@/assets/sounds/typewritter.mp3'),
  ]
}).start();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
