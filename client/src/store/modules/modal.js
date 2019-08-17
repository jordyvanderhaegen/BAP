export default {
    namespaced: true,

    state: {
        modalVisible: false,
        modalComponent: null,
        duration: 5000,
    },

    mutations: {
        showModal(state, componentName) {
            state.modalVisible = true;
            state.modalComponent = componentName;
        },
        hideModal(state) {
            state.modalVisible = false;
        },
        setDuration(state, duration) {
            state.duration = duration
        }
    }
};