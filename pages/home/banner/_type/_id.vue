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
              <div class="row mt-3 justify-content-center">
                <div class="cols-12 col-sm-12 col-md-4 mt-3 mt-sm-3 mt-md-0">
                  <div class="d-flex align-items-center justify-content-between">
                    <label>Story Banner</label>
                    <label
                      for="main_file"
                      class="custom-file-upload"
                      :class="{ 'd-none' : story_banner_file != null }"
                    >Edit</label>
                  </div>
                  <b-form-file
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    plain
                    @change="banner_file"
                    id="main_file"
                    :class="{ 'd-none' : story_banner_file === null }"
                  ></b-form-file>
                  <b-img
                    :src="banner_detail.url"
                    fluid
                    alt="Fluid image"
                    :class="{ 'd-none' : story_banner_file != null }"
                    width="500"
                    height="313"
                  ></b-img>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="cols-12 col-sm-12 col-md-12">
                <div class="float-end">
                  <button class="btn btn-primary"  @click="update">Update</button>
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
import Swal from "sweetalert2";

export default {
  data() {
    return {
      title: "Edit Home Banner",
      items: [
        {
          text: "CMS I Website",
        },
        {
          text: "Home Banner",
          href: "/home/banner",
        },
        {
          text: "Edit Home Banner",
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
        locale: "en",
      },
      story_banner_file: null,
      banner_detail: { id: null, url: null },
    };
  },
  mounted() {
    this.getMainStory();
  },
  methods: {
    getMainStory() {
      this.loaded = false;
      this.localeId.en = this.$route.params.id;
      let id = this.form.locale === "en" ? this.localeId.en : this.form.locale === "ja" ? this.localeId.ja : this.localeId.th;
      if (id) {
          this.$store.dispatch("home/getHomeBanner", this.form.locale).then((response) => {
            this.banner_detail.id = response.attributes?.media?.data[0]?.id;
            this.banner_detail.url = response.attributes.media?.data[0]?.attributes?.url;
            this.localeId.en = this.$route.params.id;
            if (this.form.locale === "en") {
              let localizations = response.attributes?.localizations.data;
              this.localeId.en = response.id;
              this.localeId.th = localizations.length > 0 ? localizations.find((item) => item.attributes.locale === "th")?.id: null;
              this.localeId.ja = localizations.length > 0 ? localizations.find((item) => item.attributes.locale === "ja")?.id: null;
            }
            this.loaded = true;
          });
      } else {
            this.story_banner_file = null;
            this.banner_detail.id = null;
            this.banner_detail.url = null;
            this.loaded = true;
      }
    },
    async update() {
        this.loaded = false;
        let id = this.form.locale === "en" ? this.localeId.en : this.form.locale === "jp" ? this.localeId.jp : this.localeId.th;
        if (id) {
          const formData = new FormData();
            let obj = {
            name: "Story banner"
          };
          if (this.story_banner_file) {
            await this.deletefile(this.banner_detail.id);
            formData.append("files.image", this.story_banner_file);
          }
          formData.append("data", JSON.stringify(obj));
          this.$axios.put(`/api/getHomeBanner`, formData)
            .then(() => {
              Swal.fire("Success", "Story Brandnner has been updated", "success").then(
                () => {
                  this.$router.push("/home/banner");
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
    },
    async save() {
        if (!this.story_banner_file) {
          Swal.fire("Warning", "Please upload all file", "warning");
          this.loaded = true;
        } else {
          this.loaded = false;
          const formData = new FormData();
           let obj = {
            name: "Story banner",
            locale: this.form.locale,
          };
          formData.append("files.image", this.story_banner_file);
          formData.append("data", JSON.stringify(obj));
          let url = `/api/getHomeBanner/localizations`;
          this.$axios.post(url, formData).then(() => {
              Swal.fire("Success", "Story Banner has been update", "success").then(
                () => {
                  this.$router.push("/home/banner");
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
    },
    banner_file(event) {
      let file = event.target.files[0];
      if (!file || file.type.indexOf("image/") !== 0) {
        Swal.fire("Warning", "Please upload image file", "warning");
        document.getElementById("main_file").value = null;
      } else {
        this.image.size = file.size;
        this.checkImagesize(file, "main_file", "story_banner_file");
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
      this.getMainStory();
    },
    cancel() {
      this.$router.push("/home/banner");
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