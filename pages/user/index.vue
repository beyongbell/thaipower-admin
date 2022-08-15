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
              <div class="col-sm-6 col-md-2">
                <b-form-select
                  v-model="selectRole"
                  :options="roleList"
                  class="mb-3 form-control"
                  value-field="value"
                  text-field="name"
                  disabled-field="notEnabled"
                  @change="filterUser()"
                ></b-form-select>
              </div>
              <div class="col-sm-6 col-md-2">
                <b-form-select
                  v-model="selectStatus"
                  :options="statusList"
                  class="mb-3 form-control"
                  value-field="value"
                  text-field="name"
                  disabled-field="notEnabled"
                  @change="filterUser()"
                ></b-form-select>
              </div>
              <div class="col-sm-6 col-md-3" v-if="isShow">
                <b-dropdown size="sm" variant="primary">
                  <template #button-content>
                    <i class="uil uil-plus-circle"></i>
                    Create User
                  </template>
                  <nuxt-link class="text-dark" :to="{name: 'user-type-id', params: {type: 'add'}}">
                    <b-dropdown-item-button style="font-weight: 500;">&nbsp;Create New User</b-dropdown-item-button>
                  </nuxt-link>
                  <b-dropdown-item-button>
                    <input type="file" id="file" @change="changeToJSON($event)" />
                    <label for="file" class="text-dark">Import New User</label>
                  </b-dropdown-item-button>
                </b-dropdown>
                <JsonCSV type="button" :data="json_data" name="users.csv" class="btn btn-warning btn-sm">
                  <i class="bx bx-export"></i>
                  Eport
                </JsonCSV>
                <button type="button" class="btn btn-danger btn-sm" @click="deleteSelectedUser">
                  <i class="uil uil-trash-alt"></i>
                </button>
              </div>
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                class="table table-centered table-nowrap"
                :items="userList"
                :fields="fields"
                :busy="!loaded"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <b-spinner variant="primary" label="Spinning"></b-spinner>
                <template #table-busy>
                  <div class="text-center text-danger my-2">
                    <b-spinner variant="primary" label="Spinning"></b-spinner>
                  </div>
                </template>
                <template v-slot:cell(check)="data">
                  <div class="custom-control custom-checkbox" v-if="isShow">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      :id="`contacusercheck${data.item.id}`"
                      @click="selectedUser(data.item.id)"
                    />
                    <label class="custom-control-label" :for="`contacusercheck${data.item.id}`"></label>
                  </div>
                </template>
                <template v-slot:cell(role)="data">
                  <span class="text-body">{{ data.item.role.name }}</span>
                </template>
                <template v-slot:cell(update_at)="data">
                  <span class="text-body">{{ formatUpdateDate(data.item.updatedAt) }}</span>
                </template>
                <template v-slot:cell(status)="data">
                  <div v-if="data.item.status" class="badge badge-pill bg-soft-success font-size-8">Active</div>
                  <div v-else class="badge badge-pill bg-soft-warning font-size-8">Inactive</div>
                </template>
                <template v-slot:cell(action)="data">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <nuxt-link 
                        :to="{name: 'user-type-id', params: {type: 'view', id: data.item.id}}" 
                        class="px-2 text-primary" 
                        v-b-tooltip.hover title="View"
                        >
                        <i class="uil uil-eye font-size-18"></i>
                      </nuxt-link>
                    </li>
                    <template v-if="isShow">
                      <li class="list-inline-item">
                        <nuxt-link
                          :to="{name: 'user-type-id', params: {type: 'edit', id: data.item.id}}"
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
                          @click="deleteUser(data.item.id)"
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
                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
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
import Swal from "sweetalert2";
import moment from "moment";
import Switches from "vue-switches";
import JsonCSV from "vue-json-csv";

export default {
  head() {
    return {
      title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  components: {
    Switches,
    JsonCSV,
  },
  data() {
    return {
      title: "User List",
      isShow: false,
      items: [
        {
          text: "Contacts",
        },
        {
          text: "User List",
          active: true,
        },
      ],
      // switch1: true,
      // switch2: false,
      loaded: false,
      userList: [],
      totalRows: 1,
      currentPage: 1,
      selectRole: null,
      selectStatus: null,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      json_data: [
        {
          id: 1,
          fname: "Jesse",
          lname: "Simmons",
          date: "2016-10-15 13:43:27",
          gender: "Male",
        },
        {
          id: 2,
          fname: "John",
          lname: "Jacobs",
          date: "2016-12-15 06:00:53",
          gender: "Male",
        },
        {
          id: 3,
          fname: "Tina",
          lname: "Gilbert",
          date: "2016-04-26 06:26:28",
          gender: "Female",
        },
        {
          id: 4,
          fname: "Clarence",
          lname: "Flores",
          date: "2016-04-10 10:28:46",
          gender: "Male",
        },
        {
          id: 5,
          fname: "Anne",
          lname: "Lee",
          date: "2016-12-06 14:38:38",
          gender: "Female",
        },
        {
          id: 6,
          fname: "佟博",
          lname: "能娜",
          date: "2016-12-06 14:38:38",
          gender: "Male",
        },
        {
          id: 7,
          fname: "Širůčková",
          lname: "Tereza",
          date: "2019-12-06 14:38:38",
          gender: "Female",
        },
      ],
      import_list: [],
      selectedUserData: [],
      sortBy: "age",
      sortDesc: false,
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
          key: "firstname",
          sortable: true,
        },
        {
          key: "lastname",
          sortable: true,
        },
        {
          key: "username",
          sortable: true,
        },
        {
          key: "email",
          sortable: true,
        },
        {
          key: "role",
          sortable: true,
        },
        {
          key: "update_at",
          label: "Last Updated",
          sortable: true,
        },
        {
          key: "status",
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
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.userList.length;
    },
  },
  mounted() {
    this.isShow = this.$auth?.user?.role?.id === 3 ? true : false;
    this.getAlluser();
    this.getRoleList();
  },
  methods: {
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async getAlluser() {
      try {
        const response = await this.$axios.get("/api/users?populate=role");
        this.userList = response.data;
        this.json_data = this.userList.map((item) => {
          return {
            firstname: item.firstname,
            lastname: item.lastname,
            email: item.email,
            phone: item.phone,
            password: "",
            username: item.username,
            role: item.role.id,
            status: item.status,
          };
        });
        this.totalRows = this.userList.length;
        this.loaded = true;
      } catch (error) {
        console.log(error);
      }
    },
    getRoleList() {
      this.$store.dispatch("userManagement/getRoleList").then((response) => {
        this.roleList = response.roles.map((item) => ({
          name: item.name,
          value: item.id,
        }));
        this.roleList.unshift({
          name: "Select role",
          value: null,
          disabled: true,
        });
      });
    },
    deleteUser(data) {
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
          this.$axios.delete(`/api/users/${data}`).then((response) => {
            this.getAlluser();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          });
        }
      });
    },
    deleteSelectedUser() {
      if (this.selectedUserData.length > 0) {
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
            for (const [i, item] of this.selectedUserData.entries()) {
              this.$axios.delete(`/api/users/${item}`).then((response) => {
                if (i === this.selectedUserData.length - 1) {
                  this.getAlluser();
                  Swal.fire( "Deleted!", "Your file has been deleted.", "success");
                }
              });
            }
          }
        });
      }
    },
    formatUpdateDate(date) {
      return moment(date).format("DD/MM/YYYY HH:mm:ss");
    },
    async filterUser() {
      const response = await this.$axios.get("/api/users?populate=role");
      if (this.selectRole && this.selectStatus !== null) {
        this.userList = response.data.filter((item) => {
          return (
            item.status === this.selectStatus &&
            item.role.id === this.selectRole
          );
        });
      } else if (this.selectRole) {
        this.userList = response.data.filter((item) => {
          return item.role.id === this.selectRole;
        });
      } else if (this.selectStatus) {
        this.userList = response.data.filter((item) => {
          return item.status === this.selectStatus;
        });
      } else {
        this.userList = response.data;
      }
      console.log(this.userList);
    },
    changeToJSON(evt) {
      this.import_list = [];
      let reader = new FileReader();
      let result = [];
      let filePath = evt.target.value;
      let allowedtype = /(\.csv)$/i;
      if (!allowedtype.exec(filePath)) {
        Swal.fire( "Error!", "File must be .csv type.", "error");
      } else {
        this.loaded = false;
        reader.onload = async (e) => {
          let csv = e.target.result;
          let lines = csv.split("\n");
          let headers = lines[0].split(",");
          headers[0] = "firstname";
          headers[7] = "status";
          lines.forEach((line, index) => {
            if (index > 0) {
              let obj = {};
              let currentline = line.split(",");
              for (let i = 0; i < headers.length; i++) {
                obj[headers[i]] = currentline[i];
              }
              result.push(obj);
            }
          });
          for (const item of result) {
            if (item.firstname || item.lastname || item.email || item.phone || item.password || item.username || item.role || item.status) {
              let userList = await this.$axios.get("/api/users?populate=role");
              let check = userList.data.find((user) => {
                return ( user.email === item.email || user.username === item.username );
              });
              if (!check) {
                item.status = item.status.includes("false") ? false : true;
                item.phone = item.phone.length === 9 ? "0" + item.phone : item.phone;
                item.role = parseInt(item.role) > 5 ? "4" : parseInt(item.role) === 1 ? "4" : parseInt(item.role) === 2 ? "4" : item.role;
                this.import_list.push(item);
              }
            } else {
              this.loaded = true;
            }
          }
          for (const [i, item] of this.import_list.entries()) {
            this.loaded = false;
            this.$axios.post("/api/users", item).then(() => {
                if (i === this.import_list.length - 1) {
                  Swal.fire({
                    title: "Success",
                    text: "User has been created",
                    icon: "success",
                    button: "Ok",
                  }).then((result) => {
                    if (result) {
                      this.getAlluser();
                    }
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        };
      }
      reader.readAsBinaryString(evt.target.files[0]);
    },
    selectedUser(data) {
      if (!this.selectedUserData.includes(data)) {
        this.selectedUserData.push(data);
      } else {
        this.selectedUserData.splice(this.selectedUserData.indexOf(data), 1);
      }
    },
  },
};
</script>

<style>
input[type="file"] {
  height: 0;
  overflow: hidden;
  width: 0;
}

input[type="file"] label {
  background: transparent;
  margin: 0 0 0 0;
  cursor: pointer;
}
</style>