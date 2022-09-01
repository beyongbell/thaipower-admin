<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive mb-0">
              <b-table
                class="table table-centered table-nowrap"
                :items="storyHilight"
                :fields="fields"
                :busy="!loaded"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
              >
                <b-spinner variant="primary" label="Spinning"></b-spinner>
                <template #table-busy>
                  <div class="text-center text-danger my-2">
                    <b-spinner variant="primary" label="Spinning"></b-spinner>
                  </div>
                </template>
                  <template v-slot:cell(name)="data">
                  <span class="text-body">{{ data.item.attributes.name }}</span>
                </template>
                  <template v-slot:cell(caption)="data">
                  <span class="text-body">{{ data.item.attributes.caption }}</span>
                </template>
                <template v-slot:cell(id)="data">
                  <span class="text-body">{{ data.item.id }}</span>
                </template>
                <template v-slot:cell(image)="data">
                  <b-img
                    :src="data.item.attributes.image.data.attributes.url"
                    alt="craft banner image"
                    width="150"
                    height="100"
                  ></b-img>
                </template>
                <template v-slot:cell(action)="data">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <nuxt-link
                        :to="{name: 'story-storyhilight-type-id', params: {type: 'view', id: data.item.id}}"
                        class="px-2 text-primary"
                        v-b-tooltip.hover
                        title="View"
                      >
                        <i class="uil uil-eye font-size-18"></i>
                      </nuxt-link>
                    </li>
                    <template>
                      <li class="list-inline-item">
                        <nuxt-link
                          :to="{name: 'story-storyhilight-type-id', params: {type: 'edit', id: data.item.id}}"
                          class="px-2 text-warning"
                          v-b-tooltip.hover
                          title="Edit"
                        >
                          <i class="uil uil-pen font-size-18"></i>
                        </nuxt-link>
                      </li>
                    </template>
                  </ul>
                </template>
              </b-table>
            </div>
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
      title: "Story Hilight",
      items: [
        {
          text: "CMS I Story",
        },
        {
          text: "Story Hilight",
          active: true,
        },
      ],
      loaded: false,
      storyHilight: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      fields: [
        {
          key: "name",
        },
          {
          key: "caption",
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
    this.getMainBanner();
  },
  methods: {
    getMainBanner() {
      this.$store.dispatch("story/getStoryHilight").then((response) => {
        console.log(response)
        this.storyHilight.push(response);
        this.loaded = true;
      });
    },
  },
};
</script>

<style>
</style>