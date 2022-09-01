<template>
  <div class="row pe-0" v-if="type !== 'add'">
    <div class="card mx-0">
      <div class="card-body">
        <b-row>
          <b-col cols="3">
            <b-row>
              <b-col cols="4">
                <b-button
                  variant="outline-primary"
                  block
                  :class="{'active' : selected === 'en'}"
                  @click="selectLocaled('en')"
                  :disabled="disabled"
                >EN</b-button>
              </b-col>
              <b-col cols="4">
                <b-button
                  variant="outline-primary"
                  block
                  :class="{'active' : selected === 'ja'}"
                  @click="selectLocaled('ja')"
                  :disabled="disabled"
                >JP</b-button>
              </b-col>
              <b-col cols="4">
                <b-button
                  variant="outline-primary"
                  block
                  :class="{'active' : selected === 'th'}"
                  @click="selectLocaled('th')"
                  :disabled="disabled"
                >TH</b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String },
  },
  data() {
    return {
      selected: "en",
      disabled: false,
    };
  },
  methods: {
    selectLocaled(locale) {
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 200);
      this.selected = locale;
      this.$emit("locale", locale);
    },
  },
};
</script>

<style>
</style>