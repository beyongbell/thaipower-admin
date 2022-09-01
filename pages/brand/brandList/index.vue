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
                <nuxt-link :to="{name: 'brand-brandList-type-id', params: {type: 'add'}}" class="btn btn-primary btn-sm">
                  <i class="uil uil-plus-circle"></i>
                  Create Brand
                </nuxt-link>
                <!-- <button type="button" class="btn btn-danger btn-sm">
                  <i class="uil uil-trash-alt"></i>
                </button> -->
              </div>
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                class="table table-centered table-nowrap"
                :items="brandList"
                :fields="fields"
                :busy="!loaded"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :filter="filter"
                :filter-included-fields="filterOn"
              >
                <b-spinner variant="primary" label="Spinning"></b-spinner>
                <template #table-busy>
                  <div class="text-center text-danger my-2">
                    <b-spinner variant="primary" label="Spinning"></b-spinner>
                  </div>
                </template>
                <!-- <template v-slot:cell(check)="data">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      :id="`contacusercheck${data.item.id}`"
                      @click="selectedUser(data.item.id)"
                    />
                    <label class="custom-control-label" :for="`contacusercheck${data.item.id}`"></label>
                  </div>
                </template>-->
                <template v-slot:cell(name)="data">
                  <span class="text-body">{{ data.item.attributes.name }}</span>
                </template>
                <template v-slot:cell(caption)="data">
                  <span class="text-body">{{ data.item.attributes.caption }}</span>
                </template>
                <template v-slot:cell(description)="data">
                  <span class="text-body">{{ data.item.attributes.description }}</span>
                </template>
                <template v-slot:cell(craft_banner_image)="data">
                  <b-img
                    :src="data.item.attributes.craft_banner_image.data.attributes.url"
                    alt="craft banner image"
                    width="150"
                    height="100"
                  ></b-img>
                </template>
                <template v-slot:cell(product_portait_image)="data">
                  <b-img
                    :src="data.item.attributes.product_portait_image.data.attributes.url"
                    alt="product portait image"
                    width="150"
                    height="100"
                  ></b-img>
                </template>
                <template v-slot:cell(hilight_product_image)="data">
                  <b-img
                    :src="data.item.attributes.hilight_product_image.data.attributes.url"
                    alt="hilight product image"
                    width="150"
                    height="100"
                  ></b-img>
                </template>
                <template v-slot:cell(update_at)="data">
                  <span class="text-body">{{ formatUpdateDate(data.item.attributes.updatedAt) }}</span>
                </template>
                <template v-slot:cell(action)="data">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <nuxt-link
                        :to="{name: 'brand-brandList-type-id', params: {type: 'view', id: data.item.id}}"
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
                          :to="{name: 'brand-brandList-type-id', params: {type: 'edit', id: data.item.id}}"
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
                          @click="deleteBrand(data.item.id)"
                        >
                          <i class="uil uil-trash-alt font-size-18"></i>
                        </a>
                      </li>
                    </template>
                    <!-- <b-dropdown
                      class="list-inline-item"
                      variant="white"
                      right
                      toggle-class="text-muted font-size-18 px-2"
                    >
                      <template v-slot:button-content>
                        <i class="uil uil-ellipsis-v"></i>
                      </template>

                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </b-dropdown>-->
                  </ul>
                </template>
              </b-table>
            </div>
            <div class="row mt-5">
              <div class="col">
                <div class="dataTables_paginate paging_simple_numbers float-end">
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination v-model="currentPage" :total-rows="1" :per-page="perPage"></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
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
      title: "Brand List",
      items: [
        {
          text: "Brand Center",
        },
        {
          text: "Brand List",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      selectRole: null,
      selectStatus: null,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      brandList: [],
      loaded: false,
      fields: [
        {
          key: "check",
          label: "",
        },
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
          key: "description",
          sortable: true,
        },
        {
          key: "craft_banner_image",
          label: "Craft Banner Image",
          sortable: true,
        },
        {
          key: "product_portait_image",
          label: "Product Portait Image",
          sortable: true,
        },
        {
          key: "hilight_product_image",
          label: "Hilight Product Image",
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
      roleList: [],
      statusList: [
        { value: null, name: "Select status", disabled: true },
        { value: true, name: "Active" },
        { value: false, name: "Inactive" },
      ],
    };
  },
  computed: {},
  mounted() {
    this.getBrandList();
  },
  methods: {
    async getBrandList() {
      await this.$store.dispatch("brand/getBrandList").then((res) => {
        this.brandList = res.data;
        this.loaded = true;
        console.log(res);
      });
    },
    formatUpdateDate(date) {
      return moment(date).format("DD/MM/YYYY HH:mm:ss");
    },
    deleteBrand(id) {
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
          this.loaded = false
          this.$axios.delete(`/api/brands/${id}`).then((response) => {
            this.getBrandList();
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