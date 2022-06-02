//对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
//内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
//内部的 getter，根节点状态会作为第三个参数暴露出来：
export default {
  //namespaced: true,
  state () {
    return {
      version:"v1.0.0"
    }
  },
  getters: {
    //根节点状态会作为第三个参数暴露出来
    // sumWithRootCount (state, getters, rootState) {
    //   return state.count + rootState.count
    // }
  },
  mutations:{
    chgVersion(state,paylod){//没有第三个参数
      state.version=paylod;
    }
  },
  actions:{
    //局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
    changeVersionAsync(context,paylod) {
      setTimeout(() => {
        console.log(paylod);
        context.commit('chgVersion',paylod)
      }, 1000)
    }
  }
}