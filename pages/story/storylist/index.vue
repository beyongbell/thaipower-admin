<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row mt-4 justify-content-center">
              <div class="col-sm-6 col-md-2">
                <div id="tickets-table_length" class="dataTables_length float-end">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-6 col-md-2">
                <form class="app-search pt-0 ms-0">
                  <div class="position-relative">
                    <b-form-input type="text" size="sm" class="form-control" placeholder="search..."></b-form-input>
                    <span class="uil-search"></span>
                  </div>
                </form>
              </div>
              <!-- End search -->
              <div class="col-sm-6 col-md-3">
                <nuxt-link
                  :to="{name: 'story-storylist-type-id', params: {type: 'add'}}"
                  class="btn btn-primary btn-sm"
                >
                  <i class="uil uil-plus-circle"></i>
                  Create story
                </nuxt-link>
              </div>
            </div>
            <b-table
              class="table table-centered table-nowrap"
              :items="storyList"
              :fields="fields"
              :busy="!loaded"
              responsive="sm"
              :per-page="perPage"
              :current-page="currentPage"
              show-empty
            >
              <b-spinner variant="primary" label="Spinning"></b-spinner>
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner variant="primary" label="Spinning"></b-spinner>
                </div>
              </template>
              <template #empty>
                <div class="text-center my-2">
                  <span>No Data</span>
                </div>
              </template>
              <template #cell(name)="data">
                <span class="text-body">{{ data.item.attributes.name }}</span>
              </template>
              <template #cell(caption)="data">
                <span class="text-body">{{ data.item.attributes.caption }}</span>
              </template>
              <template #cell(category)="data">
                <span class="text-body">{{ data.item.attributes.category }}</span>
              </template>
              <template v-slot:cell(update_at)="data">
                <span class="text-body">{{ formatUpdateDate(data.item.attributes.updatedAt) }}</span>
              </template>
              <template v-slot:cell(action)="data">
                <ul class="list-inline mb-0">
                  <li class="list-inline-item">
                    <nuxt-link
                      :to="{name: 'story-storylist-type-id', params: {type: 'view', id: data.item.id}}"
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
                        :to="{name: 'story-storylist-type-id', params: {type: 'edit', id: data.item.id}}"
                        class="px-2 text-warning"
                        v-b-tooltip.hover
                        title="Edit"
                      >
                        <i class="uil uil-pen font-size-18"></i>
                      </nuxt-link>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="px-2 text-danger"
                        v-b-tooltip.hover
                        title="Delete"
                        @click="deleteStory(data.item.id)"
                      >
                        <i class="uil uil-trash-alt font-size-18"></i>
                      </a>
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
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      title: "Story List",
      items: [
        {
          text: "CMS I Story",
        },
        {
          text: "Story List",
          active: true,
        },
      ],
      loaded: false,
      storyList: [],
      userList: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      fields: [
        {
          key: "id",
          sortable: true,
        },
        {
          key: "name",
          sortable: true,
        },
        {
          key: "caption",
          sortable: true,
        },
        {
          key: "category",
          sortable: true,
        },
        {
          key: "update_at",
          label: "Last Updated",
          sortable: true,
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
    this.getStoryList();
  },
  methods: {
    getStoryList() {
      this.loaded = false;
      this.$store.dispatch("story/getStoryList").then((response) => {
        console.log(response);
        this.storyList = response.data;
        this.loaded = true;
      });
    },
    formatUpdateDate(date) {
      return moment(date).format("DD/MM/YYYY HH:mm:ss");
    },
    deleteStory(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.value) {
          this.loaded = false;
          this.$axios.delete(`/api/stories/${id}`).then((response) => {
            this.getStoryList();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          });
        }
      });
    },
  },
};
</script>

<style>
</style>