export const state = () => ({
   roleList: []
});

export const mutations = {
    SET_ROLE(state, roleList) {
        state.roleList = roleList;
    }
};

export const actions = {
    async getRoleList({ commit }) {
        const { data } = await this.$axios.get("/api/users-permissions/roles");
        commit("SET_ROLE", data);
        return data
    },
};
