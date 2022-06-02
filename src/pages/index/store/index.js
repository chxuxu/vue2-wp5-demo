import Vuex from 'vuex'
import mutations from "./mutations";
import actions from "./actions";
import system from "./modules/system";
export const createStore=function(){
  return new Vuex.Store({
    state () {
      return {
        logoUrl: "https://res.qiyukf.net/operation/91fa81d277b8ca434305d2666840b2fa",
        user:{
          fullname:"chx",
          nickname:"陈焕许",
          email:"chx@163.com"
        }
      }
    },
    mutations,
    actions,
    modules:{
      system
    }
  })
};
