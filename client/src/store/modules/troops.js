export default {
  namespaced: true,
  state: {
    troopPositions: null,
    troopNextPositions: null
  },
  mutations: {
    setTroopsLocations(state, [firstPos, secondPos]) {
      state.troopPositions = firstPos
      state.troopNextPositions = secondPos
    }
  },
  actions: {
    async setTroops({commit}, [firstPos, secondPos]) {
      const res1 = await import(`@/assets/data/${firstPos}-troops.json`)
      const res2 = await import(`@/assets/data/${secondPos}-troops.json`)
      return new Promise((res, rej) => {
        commit('setTroopsLocations', [res1.features, res2.features])
        res()
      })
    }
  },
};