import Vue from "vue";
import AppComponent from "./App/App.vue";

Vue.component("app-component", AppComponent);

import {
  Switch,
  Button,
  Icon
} from 'element-ui';
Vue.use(Switch).use(Button).use(Icon);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
