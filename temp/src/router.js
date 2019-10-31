import Vue from 'vue'
import Router from 'vue-router'
import BLE from '../src/components/BLE.vue'
import Centered from '../src/components/Centered.vue'

Vue.use(Router)


export default new Router({
  //mode: 'history',
  routes: [
    { path: '/', component: BLE },
    { path: '/ble', component: BLE },
    { path: '/centered', component: Centered }
  ],
  scrollBehavior() {
      return {x: 0, y: 0}
  }
})
