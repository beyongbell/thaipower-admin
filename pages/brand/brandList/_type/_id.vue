<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <Locale @locale="localeSelect" :type="$route.params.type" />
    <div class="row">
       <div v-if="!loaded" class="text-center text-danger my-2">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
      </div>
      <template v-else>
      <div class="card px-5">
        <div class="card-body">
          <div class="row">
            <div class="cols-12 col-sm-6 col-md-6">
              <div class="form-group">
                <label>Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.name"
                  :class="{ 'is-invalid': $v.form.name.$error }"
                  placeholder="name"
                  :readonly="readonly"
                />
                <div v-if="$v.form.name.$error" class="text-danger">
                  <span v-if="!$v.form.name.required">This field is required.</span>
                </div>
              </div>
            </div>
            <div class="cols-12 col-sm-6 col-md-6 mt-3 mt-sm-0 mt-md-0">
              <div class="form-group">
                <label>Caption</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.caption"
                  :class="{ 'is-invalid': $v.form.caption.$error }"
                  placeholder="caption"
                  :readonly="readonly"
                />
                <div v-if="$v.form.caption.$error" class="text-danger">
                  <span v-if="!$v.form.caption.required">This field is required.</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="cols-12 col-sm-12 col-md-12">
              <div class="form-group">
                <label>Description</label>
                <b-form-textarea
                  class="form-control"
                  v-model="form.description"
                  :class="{ 'is-invalid': $v.form.description.$error }"
                  placeholder="description"
                  rows="5"
                  max-rows="10"
                  :readonly="readonly"
                ></b-form-textarea>
                <div v-if="$v.form.description.$error" class="text-danger">
                  <span v-if="!$v.form.description.required">This field is required.</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3" v-if="$route.params.type === 'add' || !hasData">
            <div class="cols-12 col-sm-12 col-md-4 mt-3 mt-sm-3 mt-md-0">
              <label for="craft_file">Craft Banner</label>
              <br />
              <b-form-file
                type="file"
                accept="image/png, image/gif, image/jpeg"
                plain
                @change="craft_file"
                id="craft_file"
              ></b-form-file>
            </div>
            <div class="cols-12 col-sm-12 col-md-4 mt-3 mt-sm-3 mt-md-0">
              <label for="product_file">Product Banner</label>
              <br />
              <b-form-file
                type="file"
                accept="image/png, image/gif, image/jpeg"
                plain
                @change="product_file"
                id="product_file"
              ></b-form-file>
            </div>
            <div class="cols-12 col-sm-12 col-md-4 mt-3 mt-sm-3 mt-md-0">
              <label for="hilight_file">Hilight Banner</label>
              <br />
              <b-form-file
                type="file"
                accept="image/png, image/gif, image/jpeg"
                plain
                @change="hilight_file"
                id="hilight_file"
              ></b-form-file>
            </div>
          </div>

          <!-- Start Edit pic -->
          <div class="row mt-3" v-else>
            <div class="cols-12 col-sm-12 col-md-4 mt-3 mt-sm-3 mt-md-0">
              <div class="d-flex align-items-center justify-content-between">
                <label>Craft Banner</label>
                <label
                  v-if="this.$route.params.type === 'edit'"
                  for="craft_file"
                  class="custom-file-upload"
                  :class="{ 'd-none' : craft_banner_file != null }"
                >Edit</label>
              </div>
              <b-form-file
                type="file"
                accept="image/png, image/gif, image/jpeg"
                plain
                @change="craft_file"
                id="craft_file"
                :class="{ 'd-none' : craft_banner_file === null }"
              ></b-form-file>
              <b-img
                :src="craft_detail.url"
                fluid
                alt="Fluid image"
                :class="{ 'd-none' : craft_banner_file != null }"
                width="500"
                height="313"
              ></b-img>
            </div>
            <div class="cols-12 col-sm-12 col-md-4 mt-3 mt-sm-3 mt-md-0">
              <div class="d-flex align-items-center justify-content-between">
                <label>Product Banner</label>
                <label
                  v-if="this.$route.params.type === 'edit'"
                  for="product_file"
                  class="custom-file-upload"
                  :class="{ 'd-none' : product_portait_file != null }"
                >Edit</label>
              </div>
              <b-form-file
                type="file"
                accept="image/png, image/gif, image/jpeg"
                plain
                @change="product_file"
                id="product_file"
                :class="{ 'd-none' : product_portait_file === null }"
              ></b-form-file>
              <b-img
                :src="product_detail.url"
                fluid
                alt="Fluid image"
                :class="{ 'd-none' : product_portait_file != null }"
                width="500"
                height="313"
              ></b-img>
            </div>
            <div class="cols-12 col-sm-12 col-md-4 mt-3 mt-sm-3 mt-md-0">
              <div class="d-flex align-items-center justify-content-between">
                <label>Hilight Banner</label>
                <label
                  v-if="this.$route.params.type === 'edit'"
                  for="hilight_file"
                  class="custom-file-upload"
                  :class="{ 'd-none' : hilight_product_file != null }"
                >Edit</label>
              </div>
              <b-form-file
                type="file"
                accept="image/png, image/gif, image/jpeg"
                plain
                @change="hilight_file"
                id="hilight_file"
                :class="{ 'd-none' : hilight_product_file === null }"
              ></b-form-file>
              <b-img
                :src="hilight_detail.url"
                fluid
                alt="Fluid image"
                :class="{ 'd-none' : hilight_product_file != null }"
                width="500"
                height="313"
              ></b-img>
            </div>
          </div>
          <!-- End Edit pic -->
          <div class="row mt-3">
            <div class="cols-12 col-sm-12 col-md-12">
              <div class="float-end">
                <button v-if="$route.params.type === 'add'" class="btn btn-primary" @click="save()">Save</button>
                <button v-else class="btn btn-primary" @click="update">Update</button>
                <button class="btn btn-danger" @click="cancel">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </template>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import Swal from "sweetalert2";

export default {
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      title: "Create New Brand",
      items: [
        {
          text: "Brand Center",
        },
        {
          text: "Brand List",
          href: "/brand",
        },
        {
          text: "Create Brand",
          active: true,
        },
      ],
      readonly: false,
      hasData: true,
      loaded: true,
      form: {
        name: "",
        caption: "",
        description: "",
        locale: "en",
      },
      image: {
        size: "",
        height: "",
        width: "",
      },
      localeId: {
        en: null,
        ja: null,
        th: null,
      },
      craft_banner_file: null,
      product_portait_file: null,
      hilight_product_file: null,
      craft_detail: { id: null, url: null },
      product_detail: { id: null, url: null },
      hilight_detail: { id: null, url: null },
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required,
      },
      caption: {
        required,
      },
      description: {
        required,
      },
    },
  },
  mounted() {
    if (this.$route.params.type == "edit") {
      this.title = "Edit Brand";
      this.localeId.en = this.$route.params.id;
      this.getBrand();
    } else if (this.$route.params.type == "view") {
      this.readonly = true;
      this.title = "Brand Detail";
      this.localeId.en = this.$route.params.id;
      this.getBrand();
    } else {
      this.loaded = true
    }
  },
  methods: {
    async save(type) {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        if (!this.craft_banner_file || !this.product_portait_file || !this.hilight_product_file) {
          Swal.fire("Warning", "Please upload all file", "warning");
        } else {
          this.loaded = false;
          const formData = new FormData();
          let obj = {
            name: this.form.name,
            caption: this.form.caption,
            description: this.form.description,
            locale: this.form.locale,
          };
          formData.append("files.craft_banner_image", this.craft_banner_file);
          formData.append("files.product_portait_image", this.product_portait_file);
          formData.append("files.hilight_product_image", this.hilight_product_file);
          formData.append("data", JSON.stringify(obj));
          let url = type ? `/api/brands/${this.$route.params.id}/localizations` : "/api/brands";
          this.$axios.post(url, formData).then(() => {
              Swal.fire("Success", "Brand has been created", "success").then(
                () => {
                  this.$router.push("/brand/brandList");
                }
              );
            })
            .catch((error) => {
              if (error.message === "This attribute must be unique") {
                Swal.fire("Warning", "Brand name already exist", "warning");
              } else {
                Swal.fire(`"Error", ${error.message}, "error"`);
              }
            });
        }
      }
    },
    async update() {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        this.loaded = false;
        let id = this.form.locale === "en" ? this.localeId.en : this.form.locale === "jp" ? this.localeId.jp : this.localeId.th;
        if (id) {
          const formData = new FormData();
          let obj = {
            name: this.form.name,
            caption: this.form.caption,
            description: this.form.description,
          };
          if (this.craft_banner_file) {
            await this.deletefile(this.craft_detail.id);
            formData.append("files.craft_banner_image", this.craft_banner_file);
          }
          if (this.product_portait_file) {
            await this.deletefile(this.product_detail.id);
            formData.append("files.product_portait_image", this.product_portait_file);
          }
          if (this.hilight_product_file) {
            await this.deletefile(this.hilight_detail.id);
            formData.append("files.hilight_product_image", this.hilight_product_file);
          }
          formData.append("data", JSON.stringify(obj));
          this.$axios.put(`/api/brands/${id}`, formData)
            .then(() => {
              Swal.fire("Success", "Brand has been updated", "success").then(
                () => {
                  this.$router.push("/brand/brandList");
                }
              );
            })
            .catch((error) => {
              if (error.message === "This attribute must be unique") {
                Swal.fire("Warning", "Brand name already exist", "warning");
              } else {
                Swal.fire(`"Error", ${error.message}, "error"`);
              }
            });
        } else {
          this.save('localizations');
        }
      }
    },
    async deletefile(id) {
      let response = await this.$axios.delete(`/api/upload/files/${id}`);
      return response;
    },
    craft_file(event) {
      let file = event.target.files[0];
      if (!file || file.type.indexOf("image/") !== 0) {
        Swal.fire("Warning", "Please upload image file", "warning");
        document.getElementById("craft_file").value = null;
      } else {
        this.image.size = file.size;
        this.checkImagesize(file, "craft_file", "craft_banner_file");
      }
    },
    product_file(event) {
      console.log(event.target.files);
      let file = event.target.files[0];
      if (!file || file.type.indexOf("image/") !== 0) {
        Swal.fire("Warning", "Please upload image file", "warning");
        document.getElementById("product_file").value = null;
      } else {
        this.image.size = file.size;
        this.checkImagesize(file, "product_file", "product_portait_file");
      }
    },
    hilight_file(event) {
      let file = event.target.files[0];
      if (!file || file.type.indexOf("image/") !== 0) {
        Swal.fire("Warning", "Please upload image file", "warning");
        document.getElementById("hilight_file").value = null;
      } else {
        this.image.size = file.size;
        this.checkImagesize(file, "hilight_file", "hilight_product_file");
      }
    },
    checkImagesize(file, id, name) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (evt) => {
        let img = new Image();
        img.onload = async () => {
          this.image.width = img.width;
          this.image.height = img.height;
          if (this.image.width !== 1280 || this.image.height !== 800) {
            Swal.fire("Warning", "Image size must be 1280 * 800", "warning");
            document.getElementById(`${id}`).value = null; //clear the file input
          } else {
            this[name] = file;
          }
        };
        img.src = evt.target.result;
      };
    },
    cancel() {
      this.$router.push("/brand/brandList");
    },
    getBrand() {
      this.loaded = false;
      this.localeId.en = this.$route.params.id;
      let id = this.form.locale === "en" ? this.localeId.en : this.form.locale === "ja" ? this.localeId.ja : this.localeId.th;
      if (id) {
        this.$axios .get(`/api/brands/${id}?populate=*`)
          .then((response) => {
            this.form.name = response.data.data.attributes.name;
            this.form.caption = response.data.data.attributes.caption;
            this.form.description = response.data.data.attributes.description;
            this.craft_detail.url = response.data.data.attributes.craft_banner_image.data.attributes.url;
            this.craft_detail.id = response.data.data.attributes.craft_banner_image.data.id;
            this.product_detail.url = response.data.data.attributes.product_portait_image.data.attributes.url;
            this.product_detail.id = response.data.data.attributes.product_portait_image.data.id;
            this.hilight_detail.url = response.data.data.attributes.hilight_product_image.data.attributes.url;
            this.hilight_detail.id = response.data.data.attributes.hilight_product_image.data.id;
            this.hasData = true;
            if (this.form.locale === "en") {
              let localizations = response.data.data.attributes?.localizations.data;
              this.localeId.en = response.data.data.id;
              this.localeId.th = localizations.length > 0 ? localizations.find((item) => item.attributes.locale === "th")?.id: null;
              this.localeId.ja = localizations.length > 0 ? localizations.find((item) => item.attributes.locale === "ja")?.id: null;
              console.log('id', this.localeId);
            }
            this.loaded = true;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.form.name = null;
        this.form.caption = null;
        this.form.description = null;
        this.craft_banner_file = null;
        this.product_portait_file = null;
        this.hilight_product_file = null;
        this.craft_detail.url = null;
        this.craft_detail.id = null;
        this.product_detail.url = null;
        this.product_detail.id = null;
        this.hilight_detail.url = null;
        this.hilight_detail.id = null;
        this.hasData = false;
        this.loaded = true;
      }
    },
    localeSelect(locale) {
      this.form.locale = locale;
      this.getBrand();
    },
  },
};
</script>

<style scoped>
* >>> input[type="file"] {
  border-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  width: 100%;
}

input::file-selector-button {
  padding: 0.4rem;
  border: none;
  border-right: 1px solid #ccc;
  cursor: pointer;
  border-radius: 2px;
}

.custom-file-upload {
  border-radius: 5px;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  color: #ffffff;
  background: #ffc107;
}
</style>