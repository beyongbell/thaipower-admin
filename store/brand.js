export const state = () => ({
    brandList: [],
    mainbrand: null,

});

export const mutations = {
    SET_BRAND_LIST(state, list) {
        state.brandList = list;
    },
    SET_MAIN_BRAND(state, main) {
        state.mainbrand = main;
    }
};

export const actions = {
    async getBrandList({ commit }) {
        const { data } = await this.$axios.get("/api/brands?populate=*");
        commit("SET_BRAND_LIST", data);
        return data
    },
    async getMainBrand({ commit }, payload) {
        let url = payload ? `/api/brand-main-banner?locale=${payload}&populate=*` : `/api/brand-main-banner?populate=*`;
        const { data } = await this.$axios.get(url);
        return data.data
    }
};
