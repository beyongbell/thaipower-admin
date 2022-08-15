<script>
import { mapState } from "vuex";

import Vertical from "./vertical";
import Horizontal from "./horizontal";

export default {
  components: {
    Vertical,
    Horizontal,
  },
  computed: mapState(["layout"]),
  mounted() {
    document.body.classList.remove("authentication-bg");
  },
};
</script>

<template>
  <div>
    <!-- Begin page -->
    <Vertical
      v-if="layout.layoutType === 'vertical'"
      :layout="layout.layoutType"
    >
      <Nuxt />
    </Vertical>
    <!-- END layout-wrapper -->
  </div>
</template>
