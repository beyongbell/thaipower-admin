<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <template v-if="loaded">
              <div class="row text-center">
                <div class="cols-12 col-sm-12 col-md-12">
                  <b-img :src="mainBrand.attributes.image.data.attributes.url" alt="craft banner image" fluid></b-img>
                </div>
              </div>
              <div class="row text-center mt-3">
                <div class="cols-12 col-sm-12 col-md-12">
                  <nuxt-link :to="{name: 'brand-mainbrand-type-id', params: {type: 'edit', id: mainBrand.id}}">
                    <b-button variant="warning" block>Edit</b-button>
                  </nuxt-link>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="text-center text-danger my-2">
                <b-spinner variant="primary" label="Spinning"></b-spinner>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Main Brand",
      items: [
        {
          text: "Brand Center",
        },
        {
          text: "Main Brand",
          active: true,
        },
      ],
      loaded: false,
      mainBrand: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      fields: [
        {
          key: "id",
        },
        {
          key: "image",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "action",
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
    };
  },
  mounted() {
    this.hostImage = this.$store.state.hostImage;
    this.getMainBanner();
  },
  methods: {
    getMainBanner() {
      this.$store.dispatch("brand/getMainBrand").then((response) => {
        this.mainBrand = response;
        this.loaded = true;
      });
    },
  },
};
</script>

<style>
</style>