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
                  <label>
                    Name
                    <span class="text-danger">*</span>
                  </label>
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
                  <label>
                    Caption
                    <span class="text-danger">*</span>
                  </label>
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
                  <ckeditor-nuxt v-model="form.description" :config="editorConfig" :disabled="readonly"></ckeditor-nuxt>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="cols-12 col-sm-6 col-md-6">
                <div class="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.category"
                    placeholder="Category"
                    :readonly="readonly"
                  />
                </div>
              </div>
              <div class="cols-12 col-sm-6 col-md-6 mt-3 mt-sm-0 mt-md-0">
                <div class="form-group">
                  <label>Facebook Link</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.facebook_link"
                    placeholder="Facebook link"
                    :readonly="readonly"
                  />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="cols-12 col-sm-6 col-md-6">
                <div class="form-group">
                  <label>Instagram Link</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.instagram_link"
                    placeholder="Instagram Link"
                    :readonly="readonly"
                  />
                </div>
              </div>
              <div class="cols-12 col-sm-6 col-md-6 mt-3 mt-sm-0 mt-md-0">
                <div class="form-group">
                  <label>Twitter Link</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.twitter_link"
                    placeholder="Twitter Link"
                    :readonly="readonly"
                  />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="cols-12 col-sm-6 col-md-6">
                <div class="form-group">
                  <label>Youtube Link</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.youtube_link"
                    placeholder="Youtube Link"
                    :readonly="readonly"
                  />
                </div>
              </div>
              <div class="cols-12 col-sm-6 col-md-6 mt-3 mt-sm-0 mt-md-0">
                <div class="form-group">
                  <label>Line Link</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.line_link"
                    placeholder="Line Link"
                    :readonly="readonly"
                  />
                </div>
              </div>
            </div>
            <div class="row mt-3" v-if="$route.params.type === 'add' || !hasData">
              <div class="cols-12 col-sm-12 col-md-4 mt-3 mt-sm-3 mt-md-0">
                <label for="media_file">
                  Media
                  <span class="text-danger">*</span>
                </label>
                <br />
                <b-form-file type="file" plain @change="media_file" id="media_file"></b-form-file>
              </div>
            </div>
            <!-- Start Edit media -->
            <div class="row mt-3" v-else>
              <div class="cols-12 col-sm-12 col-md-4 col-lg-4 mt-3 mt-sm-3 mt-md-0">
                <div class="d-flex align-items-center justify-content-between">
                  <label>Media</label>
                  <label
                    v-if="this.$route.params.type === 'edit'"
                    for="media_file"
                    class="custom-file-upload"
                    :class="{ 'd-none' : story_media_file != null }"
                  >Edit</label>
                </div>
                <b-form-file
                  type="file"
                  plain
                  @change="media_file"
                  id="media_file"
                  :class="{ 'd-none' : story_media_file === null }"
                ></b-form-file>
                <b-img
                  v-if="story_media_detail.type === 'image'"
                  :src="story_media_detail.url"
                  fluid
                  alt="Fluid image"
                  :class="{ 'd-none' : story_media_file != null }"
                  width="500"
                  height="313"
                ></b-img>
                <b-embed v-else type="iframe" aspect="1by1" :src="story_media_detail.url" allowfullscreen></b-embed>
              </div>
            </div>
            <!-- End Edit media -->
            <hr />
            <h4>Story Detail</h4>
            <div v-for="(item, index) in storyDetail" :key="index">
              <div class="row mt-3">
                <div class="cols-12 col-sm-12 col-md-7 mt-3 mt-sm-0 mt-md-0">
                  <div class="form-group">
                    <label>Description</label>
                       <b-form-textarea
                        class="form-control"
                        v-model="storyDetail[index].description"
                        placeholder="description"
                        rows="5"
                        max-rows="10"
                        :readonly="readonly"
                      ></b-form-textarea>
                    <!-- <input v-model="storyDetail[index]" type="text" class="form-control" placeholder="Description" :readonly="readonly" /> -->
                  </div>
                </div>
                <div class="cols-12 col-sm-12 col-md-4 mt-3 mt-sm-3 mt-md-0 align-self-start">
                  <label for="image_file">
                    Media
                    <span class="text-danger">*</span>
                    (Max 3 images)
                  </label>
                  <br />
                  <b-form-file type="file" plain @change="image_file($event, index)" id="image_file" multiple></b-form-file>
                </div>
                 <div class="cols-2 col-sm-2 col-md-1 mt-3 mt-sm-3 mt-md-2 px-0" v-if="lastPost > index">
                   <br>
                  <b-button variant="danger" @click="removeDetail(index)">
                    <i class="fas fa-minus"></i>
                  </b-button>
                </div>
                <div class="cols-2 col-sm-2 col-md-1 mt-3 mt-sm-3 mt-md-2 px-0" v-else>
                  <br>
                  <b-button v-if="index > 0" variant="danger" @click="removeDetail(index)">
                    <i class="fas fa-minus"></i>
                  </b-button>
                  <b-button v-if="index < 4" variant="success" @click="addDetail(index)">
                    <i class="fas fa-plus"></i>
                  </b-button>
                </div>
              </div>
            </div>
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
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import Swal from "sweetalert2";

export default {
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  data() {
    return {
      title: "Add Story List",
      items: [
        {
          text: "CMS I Story",
        },
        {
          text: "Story List",
          href: "/story/storylist",
        },
        {
          text: "Add Story List",
          active: true,
        },
      ],
      loaded: false,
      hasData: false,
      readonly: false,
      lastPost: 0,
      form: {
        name: null,
        caption: null,
        description: null,
        category: null,
        facebook_link: null,
        instagram_link: null,
        twitter_link: null,
        youtube_link: null,
        line_link: null,
        locale: "en",
      },
      storyDetail: [],
      story_detail_file: [],
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
      story_media_file: null,
      story_media_detail: { id: null, url: null, type: null },
      editorConfig: {
        // fontSize: {
        //   options: [9, 10, 11, 12, 13, 14, 15],
        // },
        removePlugins: ["Title"],
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            // "link",
            "underline",
            "Strikethrough",
            "|",
            "numberedList",
            "bulletedList",
            "|",
            "|",
            "Alignment",
            "|",
            // "FontSize",
            "FontColor",
            "FontBackgroundColor",
            "|",
            "undo",
            "redo",
          ],
        },
      },
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
      //   description: {
      //     required,
      //   },
    },
  },
  mounted() {
    if (this.$route.params.type == "edit") {
      this.title = "Edit Story";
      this.localeId.en = this.$route.params.id;
      this.getStory();
    } else if (this.$route.params.type == "view") {
      this.readonly = true;
      this.title = "Story Detail";
      this.localeId.en = this.$route.params.id;
      this.getStory();
    } else {
      this.storyDetail.push({description: ""});
      this.story_detail_file.push([])
      this.loaded = true;
    }
  },
  methods: {
    async save(type) {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        if (!this.story_media_file) {
          Swal.fire("Warning", "Please upload all file", "warning");
        } else {
          // this.loaded = false;
          const formData = new FormData();
          const detailimages = new FormData();
          let details = [{description: "2222"}, {description: "2222"}]
          let obj = {
            name: this.form.name,
            caption: this.form.caption,
            description: this.form.description,
            category: this.form.category,
            facebook_link: this.form.facebook_link,
            instagram_link: this.form.instagram_link,
            twitter_link: this.form.twitter_link,
            youtube_link: this.form.youtube_link,
            line_link: this.form.line_link,
            details: this.storyDetail,
            locale: this.form.locale,
          };
          console.log(JSON.stringify(details))
          console.log('obj', JSON.stringify(obj.details))
          formData.append("files.media", this.story_media_file);
          formData.append("data", JSON.stringify(obj));
          for (const [i, item] of this.story_detail_file.entries()) {
             detailimages.append(`files.details[${i}]`, item);
          }
          try {
            let url = type ? `/api/stories/${this.$route.params.id}/localizations` : "/api/stories";
            // let response = await this.$axios.post(url, formData)
            // let story_id = response.data.data.id;
            await this.$axios.put(`/api/stories/15?populate[details][populate]=%2A'`, { data: detailimages });
            Swal.fire("Success", "Story has been created", "success").then(() => {  this.$router.push("/story/storylist")});
          } catch (error) {
             if (error.message === "This attribute must be unique") {
                Swal.fire("Warning", "Story name already exist", "warning");
              } else {
                Swal.fire(`"Error", ${error.message}, "error"`);
              }
            this.loaded = true;
          }
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
            category: this.form.category,
            facebook_link: this.form.facebook_link,
            instagram_link: this.form.instagram_link,
            twitter_link: this.form.twitter_link,
            youtube_link: this.form.youtube_link,
            line_link: this.form.line_link,
            locale: this.form.locale,
          };
          if (this.story_media_file) {
            await this.deletefile(this.story_media_detail.id);
            formData.append("files.media", this.story_media_detail);
          }
          formData.append("data", JSON.stringify(obj));
          this.$axios.put(`/api/stories/${id}`, formData).then(() => {
              Swal.fire("Success", "Story has been updated", "success").then(
                () => {
                  this.$router.push("/story/storylist");
                }
              );
            }).catch((error) => {
              if (error.message === "This attribute must be unique") {
                Swal.fire("Warning", "Story name already exist", "warning");
              } else {
                Swal.fire(`"Error", ${error.message}, "error"`);
              }
            });
        } else {
          this.save("localizations");
        }
      }
    },
    cancel() {
      this.$router.push("/story/storylist");
    },
    media_file(event) {
      let file = event.target.files[0];
      if (
        !file ||
        (file.type.indexOf("image/") !== 0 && file.type.indexOf("video/") !== 0)
      ) {
        Swal.fire("Warning", "Please upload image or video file", "warning");
        document.getElementById("media_file").value = null;
      } else {
        if (file.type.indexOf("image/") == 0) {
          this.image.size = file.size;
          this.checkImagesize(file, "media_file", "story_media_file");
        } else {
          this.story_media_file = file;
        }
      }
    },
    image_file(event, index) {
      let files = event.target.files;
      for (const item of files) {
        if (!item || item.type.indexOf("image/") !== 0) {
          Swal.fire("Warning", "Please upload image file", "warning");
          document.getElementById("image_file").value = null;
        } else {
          this.image.size = item.size;
          this.checkImagesize(item, "image_file", "story_detail_file", index);
        }
      }
    },
    checkImagesize(file, id, name, index) {
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
            if(index != undefined) {
              this[name][index].push(file);
            } else {
              this[name] = file;
            }
          }
        };
        img.src = evt.target.result;
      };
    },
    getStory() {
      this.loaded = false;
      this.localeId.en = this.$route.params.id;
      let id =
        this.form.locale === "en"
          ? this.localeId.en
          : this.form.locale === "ja"
          ? this.localeId.ja
          : this.localeId.th;
      if (id) {
        this.$axios
          .get(`/api/stories/${id}?populate=*`)
          .then((response) => {
            this.form.name = response.data.data.attributes.name;
            this.form.caption = response.data.data.attributes.caption;
            this.form.category = response.data.data.attributes.category;
            this.form.facebook_link =
              response.data.data.attributes.facebook_link;
            this.form.instagram_link =
              response.data.data.attributes.instagram_link;
            this.form.twitter_link = response.data.data.attributes.twitter_link;
            this.form.youtube_link = response.data.data.attributes.youtube_link;
            this.form.line_link = response.data.data.attributes.line_link;
            this.form.description = response.data.data.attributes.description;
            this.story_media_detail.url =
              response.data.data.attributes.media.data.attributes.url;
            this.story_media_detail.id =
              response.data.data.attributes.media.data.id;
            this.story_media_detail.type =
              response.data.data.attributes.media.data.attributes.mime.indexOf(
                "image/"
              ) == 0
                ? "image"
                : "video";
            this.hasData = true;
            if (this.form.locale === "en") {
              let localizations =
                response.data.data.attributes?.localizations.data;
              this.localeId.en = response.data.data.id;
              this.localeId.th =
                localizations.length > 0
                  ? localizations.find(
                      (item) => item.attributes.locale === "th"
                    )?.id
                  : null;
              this.localeId.ja =
                localizations.length > 0
                  ? localizations.find(
                      (item) => item.attributes.locale === "ja"
                    )?.id
                  : null;
            }
            this.loaded = true;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.form.name = null;
        this.form.caption = null;
        this.form.category = null;
        this.form.facebook_link = null;
        this.form.instagram_link = null;
        this.form.twitter_link = null;
        this.form.youtube_link = null;
        this.form.line_link = null;
        this.form.description = null;
        this.story_media_file = null;
        this.story_media_detail.url = null;
        this.story_media_detail.id = null;
        this.hasData = false;
        this.loaded = true;
      }
    },
    async deletefile(id) {
      let response = await this.$axios.delete(`/api/upload/files/${id}`);
      return response;
    },
    addDetail() {
      this.storyDetail.push({description: ""});
      this.story_detail_file.push([])
      let count = this.lastPost + 1;
      this.lastPost = count;
    },
    removeDetail(index) {
      this.storyDetail.splice(index, 1);
      let count = this.lastPost - 1;
      this.lastPost = count;
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

.add-btn {
  margin-top: 1rem;
}
</style>