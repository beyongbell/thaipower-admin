<template>
  <div>
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row align-items-center justify-content-center mx-5">
          <div class="col-12">
            <b-card no-body>
              <div class="row align-items-center justify-content-center">
                <b-col md="6">
                  <b-card-img
                    src="~/assets/images/login-brand.jpg"
                    alt="Image"
                    class="rounded-0"
                    style="border-right: #f2f2f2 solid 1px"
                  ></b-card-img>
                </b-col>
                <b-col md="6">
                  <b-card-body>
                    <div class="text-center mt-2">
                      <h5 class="text-primary">Welcome Back !</h5>
                      <p class="text-muted">Sign in to continue.</p>
                    </div>
                    <div class="p-2 mt-4">
                      <b-alert v-model="isAuthError" variant="danger" class="mt-3" dismissible>{{ authError }}</b-alert>
                      <b-form @submit.prevent="tryToLogIn">
                        <b-form-group id="input-group-1" label="Username" label-for="input-1" class="mb-3">
                          <b-form-input
                            id="input-1"
                            v-model="username"
                            type="text"
                            placeholder="Enter username"
                            :class="{ 'is-invalid': submitted && $v.username.$error }"
                          ></b-form-input>
                          <div v-if="submitted && $v.username.$error" class="invalid-feedback">
                            <span v-if="!$v.username.required">Username is required.</span>
                          </div>
                        </b-form-group>

                        <b-form-group id="input-group-2" class="mb-3">
                          <div class="float-end">
                            <nuxt-link to="/account/forgot-password" class="text-muted">Forgot password?</nuxt-link>
                          </div>
                          <label for="input-2">Password</label>
                          <b-form-input
                            id="input-2"
                            v-model="password"
                            type="password"
                            placeholder="Enter password"
                            :class="{
                          'is-invalid': submitted && $v.password.$error,
                        }"
                          ></b-form-input>
                          <div v-if="submitted && !$v.password.required" class="invalid-feedback">Password is required.</div>
                        </b-form-group>
                        <div class="form-check">
                          <input type="checkbox" class="form-check-input" id="auth-remember-check" />
                          <label class="form-check-label" for="auth-remember-check">Remember me</label>
                        </div>
                        <div class="mt-3 text-end">
                          <b-button type="submit" variant="success" class="w-sm btn-block">Sign In</b-button>
                        </div>
                      </b-form>
                    </div>
                  </b-card-body>
                </b-col>
              </div>
            </b-card>
          </div>
        </div>
        <!-- end row -->
      </div>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";

/**
 * Login component
 */
export default {
  layout: "auth",
  head() {
    return {
      title: `Login | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
    };
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    // Try to log the user in with the username
    // and password they provided.
    async tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        try {
          await this.$auth.loginWith("local", {
            data: { identifier: this.username, password: this.password },
          });
          this.$router.push({ path: "/" });
        } catch (err) {
          this.isAuthError = true;
          this.authError = err.response.data.error.message;
        }
      }
    },
  },
};
</script>

<style lang="scss" module>
hr .horizontal-line {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
