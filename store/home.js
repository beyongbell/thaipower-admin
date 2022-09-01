export const state = () => ({
    brandList: [],
    mainbrand: null,

});

export const mutations = {
};

export const actions = {
    async getHomeBanner({ commit }, payload) {
        let url = payload ? `/api/home-banner?locale=${payload}&populate=*` : `/api/home-banner?populate=*`;
        const { data } = await this.$axios.get(url);
        return data.data
    },
};
