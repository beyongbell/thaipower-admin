export const state = () => ({
    brandList: [],
    mainbrand: null,

});

export const mutations = {
};

export const actions = {
    async getMainStory({ commit }, payload) {
        let url = payload ? `/api/story-main-banner?locale=${payload}&populate=*` : `/api/story-main-banner?populate=*`;
        const { data } = await this.$axios.get(url);
        return data.data
    },
    async getStoryHilight({ commit }, payload) {
        let url = payload ? `/api/story-highlight?locale=${payload}&populate=*` : `/api/story-highlight?populate=*`;
        const { data } = await this.$axios.get(url);
        return data.data
    },
    async getStoryList({ commit }) {
        const { data } = await this.$axios.get("/api/stories?populate=*");
        return data
    }
};
