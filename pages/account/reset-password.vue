<template>
  <div>
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div>
              <div class="card">
                <div class="card-body p-4">
                  <div class="text-center mt-2">
                    <h5 class="text-primary">Reset Password</h5>
                  </div>
                  <div class="p-2 mt-4">
                    <form @submit.prevent="tryToReset">
                      <div class="mb-3">
                        <label for="useremail">Password</label>
                        <input
                          type="password"
                          v-model="password"
                          class="form-control"
                          id="useremail"
                          placeholder="Enter email"
                          :class="{
                            'is-invalid': submitted && $v.password.$error,
                          }"
                        />
                        <div v-if="submitted && $v.password.$error" class="invalid-feedback">
                          <span v-if="!$v.password.required">Email is required.</span>
                          <span
                            v-if="!$v.password.minLength"
                          >Password must have at least {{ $v.password.$params.minLength.min }} letters.</span>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="useremail">Confirm New Password</label>
                        <input
                          type="password"
                          v-model="passwordConfirmation"
                          class="form-control"
                          id="useremail"
                          placeholder="Enter email"
                          :class="{
                            'is-invalid': submitted && $v.passwordConfirmation.$error,
                          }"
                        />
                        <div v-if="submitted && $v.passwordConfirmation.$error" class="invalid-feedback">
                          <span v-if="!$v.passwordConfirmation.required">Email is required.</span>
                          <span v-if="!$v.passwordConfirmation.sameAsPassword">Password not match.</span>
                        </div>
                      </div>
                      <div class="form-group row mb-0">
                        <div class="col-12 text-end">
                          <button class="btn btn-primary w-sm" type="submit">Confirm</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <!-- end card-body -->
              </div>
              <!-- end card -->
            </div>
            <!-- end col -->
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>
<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";

/**
 * Forgot Password component
 */
export default {
  layout: "auth",
  head() {
    return {
      title: `Forgot Password | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
    };
  },
  data() {
    return {
      password: "",
      passwordConfirmation: "",
      submitted: false,
      error: null,
      title: "Recoverpwd",
    };
  },
  auth: false,
  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
    passwordConfirmation: {
      sameAsPassword: sameAs("password"),
    },
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    // Try to register the user in with the email, fullname
    // and password they provided.
    async tryToReset() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        try {
          let response = await this.$axios.post("/api/auth/reset-password", {
            code: this.$route.query.code,
            password: this.password,
            passwordConfirmation: this.passwordConfirmation,
          });
          if(response.status == 200) {
            this.$router.push("/account/login");
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>

<style lang="scss" module></style>
