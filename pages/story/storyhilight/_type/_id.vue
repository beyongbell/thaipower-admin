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
              <div class="row mt-3">
                <div class="cols-12 col-sm-6 col-md-6">
                  <div class="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.name"
                      :class="{ 'is-invalid': $v.form.name.$error }"
                      placeholder="name"
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
                    />
                    <div v-if="$v.form.caption.$error" class="text-danger">
                      <span v-if="!$v.form.caption.required">This field is required.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="cols-12 col-sm-12 col-md-4 mt-3 mt-sm-3 mt-md-0">
                  <div class="d-flex align-items-center justify-content-between">
                    <label>Story Hilight</label>
                    <label
                      for="main_file"
                      class="custom-file-upload"
                      :class="{ 'd-none' : story_hilight_file != null }"
                    >Edit</label>
                  </div>
                  <b-form-file
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    plain
                    @change="banner_file"
                    id="main_file"
                    :class="{ 'd-none' : story_hilight_file === null }"
                  ></b-form-file>
                  <b-img
                    :src="hilight_detail.url"
                    fluid
                    alt="Fluid image"
                    :class="{ 'd-none' : story_hilight_file != null }"
                    width="500"
                    height="313"
                  ></b-img>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="cols-12 col-sm-12 col-md-12">
                <div class="float-end">
                  <button class="btn btn-primary" @click="update">Update</button>
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
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      title: "Edit Story Hilight",
      items: [
        {
          text: "CMS I Story",
        },
        {
          text: "Story Hilight",
          href: "/story/storyhilight",
        },
        {
          text: "Edit Story Hilight",
          active: true,
        },
      ],
      loaded: false,
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
      form: {
        name: "",
        caption: "",
        locale: "en",
      },
      story_hilight_file: null,
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
    },
  },
  mounted() {
    this.getStoryHilight();
  },
  methods: {
    getStoryHilight() {
      this.loaded = false;
      this.localeId.en = this.$route.params.id;
      let id = this.form.locale === "en" ? this.localeId.en : this.form.locale === "ja" ? this.localeId.ja : this.localeId.th;
      console.log(id)
      if (id) {
        this.$store.dispatch("story/getStoryHilight", this.form.locale).then((response) => {
            this.form.name = response.attributes.name;
            this.form.caption = response.attributes.caption;
            this.hilight_detail.id = response.attributes?.image?.data?.id;
            this.hilight_detail.url = response.attributes.image?.data?.attributes?.url;
            this.localeId.en = this.$route.params.id;
            if (this.form.locale === "en") {
              let localizations = response.attributes?.localizations.data;
              this.localeId.en = response.id;
              this.localeId.th = localizations.length > 0 ? localizations.find((item) => item.attributes.locale === "th")?.id : null;
              this.localeId.ja = localizations.length > 0 ? localizations.find((item) => item.attributes.locale === "ja")?.id : null;
            }
            this.loaded = true;
          });
      } else {
        this.form.name = null
        this.form.caption = null
        this.story_hilight_file = null;
        this.hilight_detail.id = null;
        this.hilight_detail.url = null;
        this.loaded = true;
      }
    },
    async update() {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        this.loaded = false;
        let id =
          this.form.locale === "en" ? this.localeId.en : this.form.locale === "jp" ? this.localeId.jp : this.localeId.th;
        if (id) {
          const formData = new FormData();
          let obj = {
            name: this.form.name,
            caption: this.form.caption,
            locale: this.form.locale,
          };
          if (this.story_hilight_file) {
            await this.deletefile(this.hilight_detail.id);
            formData.append("files.image", this.story_hilight_file);
          }
          formData.append("data", JSON.stringify(obj));
          this.$axios
            .put(`/api/story-highlight`, formData)
            .then(() => {
              Swal.fire(
                "Success",
                "Story Brandnner has been updated",
                "success"
              ).then(() => {
                this.$router.push("/story/storyhilight");
              });
            })
            .catch((error) => {
              if (error.message === "This attribute must be unique") {
                Swal.fire("Warning", "Brand name already exist", "warning");
              } else {
                Swal.fire(`"Error", ${error.message}, "error"`);
              }
            });
        } else {
          this.save("localizations");
        }
      }
    },
    async save() {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        if (!this.story_hilight_file) {
          Swal.fire("Warning", "Please upload all file", "warning");
          this.loaded = true;
        } else {
          this.loaded = false;
          const formData = new FormData();
          let obj = {
            name: this.form.name,
            caption: this.form.caption,
            locale: this.form.locale,
          };
          formData.append("files.image", this.story_hilight_file);
          formData.append("data", JSON.stringify(obj));
          let url = `/api/story-highlight/localizations`;
          this.$axios
            .post(url, formData)
            .then(() => {
              Swal.fire(
                "Success",
                "Story Banner has been update",
                "success"
              ).then(() => {
                this.$router.push("/story/storyhilight");
              });
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
    banner_file(event) {
      let file = event.target.files[0];
      if (!file || file.type.indexOf("image/") !== 0) {
        Swal.fire("Warning", "Please upload image file", "warning");
        document.getElementById("main_file").value = null;
      } else {
        this.image.size = file.size;
        this.checkImagesize(file, "main_file", "story_hilight_file");
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
          if (this.image.width !== 2560 || this.image.height !== 1600) {
            Swal.fire("Warning", "Image size must be 2560 * 1600", "warning");
            document.getElementById(`${id}`).value = null; //clear the file input
          } else {
            this[name] = file;
          }
        };
        img.src = evt.target.result;
      };
    },
    async deletefile(id) {
      let response = await this.$axios.delete(`/api/upload/files/${id}`);
      return response;
    },
    localeSelect(locale) {
      this.form.locale = locale;
      this.getStoryHilight();
    },
    cancel() {
      this.$router.push("/story/storyhilight");
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