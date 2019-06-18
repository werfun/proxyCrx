import Vue from "vue";
import AppComponent from "./App/App.vue";

Vue.component("app-component", AppComponent);

import {
  Row,
  Col,
  Input,
  Button
} from 'element-ui';
Vue.use(Input).use(Row).use(Col).use(Button);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
