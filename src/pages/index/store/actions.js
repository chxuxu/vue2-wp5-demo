export default {
  changeLogoAsync (store,paylod) {
    setTimeout(() => {
      store.commit('chgLogo',paylod)
    }, 3000)
  },
  // changeVersionAsync(store,paylod) {
  //   //setTimeout(() => {
  //     console.log(paylod);
  //     store.commit('chgVersion',paylod)
  //   //}, 1000)
  // }
}