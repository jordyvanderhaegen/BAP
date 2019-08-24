export default {
    namespaced: true,

    state: {
        modalVisible: false,
        modalComponent: null,
        duration: 5000,
        referenceId: null,
    },

    mutations: {
        showModal(state, componentName) {
            state.modalVisible = true;
            state.modalComponent = componentName;
        },
        hideModal(state) {
            state.modalVisible = false;
        },
        setReferenceId(state, referenceId) {
            state.referenceId = referenceId
        },
        setDuration(state, duration) {
            state.duration = duration
        }
    }
};