import Vuex from 'vuex'
import vue  from 'vue'
import login from './components/login/store'

vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    login:login
  }
})