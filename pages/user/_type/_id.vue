<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div v-if="!loaded" class="text-center text-danger my-2">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
        </div>
        <div v-else class="card px-5">
          <div class="card-body">
            <div class="row">
              <div class="cols-12 col-sm-6 col-md-6">
                <div class="form-group">
                  <label for="username">First Name<span class="text-danger">*</span></label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.firstname"
                    :class="{ 'is-invalid': $v.form.firstname.$error }"
                    placeholder="First Name"
                    :readonly="readonly"
                  />
                  <div v-if="$v.form.firstname.$error" class="text-danger">
                    <span v-if="!$v.form.firstname.required">This field is required.</span>
                  </div>
                </div>
              </div>
              <div class="cols-12 col-sm-6 col-md-6">
                <div class="form-group">
                  <label for="username">Last Name<span class="text-danger">*</span></label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.lastname"
                    :class="{ 'is-invalid': $v.form.lastname.$error }"
                    placeholder="Last Name"
                    :readonly="readonly"
                  />
                  <div v-if="$v.form.lastname.$error" class="text-danger">
                    <span v-if="!$v.form.lastname.required">This field is required.</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="cols-12 col-sm-6 col-md-6">
                <div class="form-group">
                  <label for="username">Username<span class="text-danger">*</span></label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.username"
                    :class="{ 'is-invalid': $v.form.username.$error }"
                    placeholder="Username"
                    :readonly="readonly"
                  />
                  <div v-if="$v.form.username.$error" class="text-danger">
                    <span v-if="!$v.form.username.required">This field is required.</span>
                  </div>
                </div>
              </div>
              <div class="cols-12 col-sm-6 col-md-6">
                <div class="form-group" v-if="$route.params.type === 'add'">
                  <label for="password">Password<span class="text-danger">*</span></label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="form.password"
                    :class="{ 'is-invalid': $v.form.password.$error }"
                    placeholder="Password"
                    :readonly="readonly"
                  />
                  <div v-if="$v.form.password.$error" class="text-danger">
                    <span v-if="!$v.form.password.required">This field is required.</span>
                    <span v-if="!$v.form.password.minLength">Password must be at least 8 characters.</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="cols-12 col-sm-6 col-md-6">
                <div class="form-group">
                  <label for="email">Email<span class="text-danger">*</span></label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="form.email"
                    :class="{ 'is-invalid': $v.form.email.$error }"
                    placeholder="Email"
                    :readonly="readonly"
                  />
                  <div v-if="$v.form.email.$error" class="text-danger">
                    <span v-if="!$v.form.email.required">This field is required.</span>
                    <span v-if="!$v.form.email.email">Email format is invalid.</span>
                  </div>
                </div>
              </div>
              <div class="cols-12 col-sm-6 col-md-6">
                <div class="form-group">
                  <label for="phone">Phone<span class="text-danger">*</span></label>
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    v-model="form.phone"
                    :class="{ 'is-invalid': $v.form.phone.$error }"
                    placeholder="Phone"
                    :readonly="readonly"
                  />
                  <div v-if="$v.form.phone.$error" class="text-danger">
                    <span v-if="!$v.form.phone.required">This field is required.</span>
                    <span v-if="!$v.form.phone.minLength">Phone must be at least 10 characters.</span>
                    <span v-if="!$v.form.phone.maxLength">Phone must not exceed 10 characters.</span>
                    <span v-if="!$v.form.phone.numeric">Phone must be number.</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-3" v-if="readonly">
              <div class="cols-12 col-sm-6 col-md-6">
                <div class="form-group">
                  <label for="role">Role</label>
                  <input
                    type="text"
                    class="form-control"
                    id="role"
                    v-model="view.role"
                    placeholder="Role"
                    :readonly="readonly"
                  />
                </div>
              </div>
              <div class="cols-12 col-sm-6 col-md-6">
                <div class="form-group">
                  <label for="status">Status</label>
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    v-model="view.status"
                    placeholder="Phone"
                    :readonly="readonly"
                  />
                </div>
              </div>
            </div>
            <div class="row mt-3" v-else>
              <div class="cols-12 col-sm-6 col-md-6">
                <div class="form-group">
                  <label for="email">Role<span class="text-danger">*</span></label>
                  <multiselect
                    v-model="form.role"
                    :options="roleList"
                    class="helo"
                    :class="{ 'invalid-select': $v.form.role.$error }"
                    label="name"
                    track-by="name"
                    :disabled="readonly"
                  ></multiselect>
                  <div v-if="$v.form.role.$error" class="text-danger">
                    <span v-if="!$v.form.role.required">This field is required.</span>
                  </div>
                </div>
              </div>
              <div class="cols-12 col-sm-6 col-md-6">
                <div class="form-group">
                  <label for="phone">Status</label>
                  <multiselect
                    v-model="form.status"
                    class="helo"
                    :options="statusList"
                    :searchable="false"
                    :close-on-select="true"
                    :class="{ 'invalid-select': $v.form.status.$error }"
                    label="name"
                    track-by="name"
                    :disabled="readonly"
                  ></multiselect>
                  <div v-if="$v.form.status.$error" class="text-danger">
                    <span v-if="!$v.form.status.required">This field is required.</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-3" v-if="!readonly">
              <div class="cols-12 col-sm-12 col-md-12">
                <div class="float-end">
                  <button v-if="$route.params.type === 'add'" class="btn btn-primary" @click="save">Save</button>
                  <button v-else class="btn btn-primary" @click="update">Update</button>
                  <button class="btn btn-danger" @click="cancel">Cancel</button>
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
import multiselect from "vue-multiselect";
import "vue2-datepicker/index.css";
import "vue-multiselect/dist/vue-multiselect.min.css";
import Swal from "sweetalert2";
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
  requiredIf,
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  components: {
    multiselect,
  },
  data() {
    return {
      title: "Create New User",
      items: [
        {
          text: "Setting",
        },
        {
          text: "User & Role",
          href: "/user",
        },
        {
          text: "Create",
          active: true,
        },
      ],
      loaded: true,
      readonly: false,
      roleList: [],
      statusList: [
        { name: "Active (Default)", value: true },
        { name: "Inactive", value: false },
      ],
      form: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        role: "",
        status: "",
      },
      view: {
        role: "",
        status: "",
      },
    };
  },
  middleware: ["rolepath"],
  mixins: [validationMixin],
  validations: {
    form: {
      firstname: {
        required,
      },
      lastname: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
        numeric,
      },
      username: {
        required,
      },
      password: {
        required: requiredIf(function () {
          return this.$route.params.type == "add";
        }),
        minLength: minLength(8),
      },
      role: {
        required,
      },
      status: {
        required,
      },
    },
  },
  mounted() {
    if (this.$route.params.type == "edit") {
      this.loaded = false;
      this.title = "Edit User";
      this.getUser(this.$route.params.id);
    } else if (this.$route.params.type == "add") {
      this.form.status = this.statusList.find(
        (option) => option.name === "Active (Default)"
      );
    } else if (this.$route.params.type == "view") {
      this.readonly = true;
      this.title = "User Detail";
      this.loaded = false;
      this.getUser(this.$route.params.id);
    }
    this.getRoleList();
  },
  methods: {
    getRoleList() {
      this.$store.dispatch("userManagement/getRoleList").then((response) => {
        this.roleList = response.roles.map((item) => ({
          name: item.name,
          value: item.id,
        }));
      });
    },
    getUser(id) {
      this.$axios.get(`/api/users/${id}?populate=role`).then((response) => {
        this.form = response.data;
        this.view.role = response.data.role.name;
        this.view.status = response.data.status === true ? "Active (Default)" : "Inactive";
        this.form.status = this.statusList.find(
          (option) => option.value === response.data.status
        );
        this.loaded = true;
      });
    },
    async save() {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        let data = {
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          email: this.form.email,
          phone: this.form.phone,
          username: this.form.username,
          password: this.form.password,
          role: this.form.role.value,
          status: this.form.status.value,
        };
        try {
          await this.$axios.post("/api/users", data);
          Swal.fire({
            title: "Success",
            text: "User has been created",
            icon: "success",
            button: "Ok",
          }).then((result) => {
            if (result) {
              this.$router.push("/user");
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    update() {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        let data = {
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          email: this.form.email,
          phone: this.form.phone,
          username: this.form.username,
          role: this.form.role.value,
          status: this.form.status.value,
        };
        this.$axios.put(`/api/users/${this.form.id}`, data).then(() => {
          Swal.fire({
            title: "Success",
            text: "User has been updated",
            icon: "success",
            button: "Ok",
          }).then((result) => {
            if (result) {
              this.$router.push("/user");
            }
          });
        });
      }
    },
    cancel() {
      this.$router.push("/user");
    },
  },
};
</script>

<style>
</style>