import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const files = require.context("./modules", false, /\.js$/);

const modules = files.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^.\/(.*)\.js/,'$1')
  const value = files(modulePath)
  modules[moduleName] = value.default
  return modules
  }, {})
const store = new Vuex.Store({
	modules: modules
});

export default store;
