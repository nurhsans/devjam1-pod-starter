import Vue from 'vue'
import Storage from './local'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const store = Vue.observable({
  __bindings: {}, // DO NOT REMOVE

  documents: null,
  organizers: null,
  vendor: null,
  drivers:null,
  clients:null,
  clicks: 0
})

/* Local storage */
store.$storage = new Storage('gridfire')

/* Example of a function */
store.CLICK = () => {
  console.log('clicking')
  store.clicks = store.clicks + 1
}


Vue.prototype.$store = store

export default store