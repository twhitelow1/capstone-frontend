<template>
  <div class="login">
    <mdb-col sm="12">
      <div class="card p-3 m-5">
        <!-- Material form login -->
        <form>
          <ul>
            <li class="text-danger" :key="error" v-for="error in errors">{{ error }}</li>
          </ul>
          <p class="h3 text-center mb-4">Sign in</p>
          <div class="grey-text">
            <mdb-input label="Your email" type="email" v-model="email" />
            <mdb-input label="Your password" type="password" v-model="password" />
          </div>
          <div class="text-center">
            <mdb-btn>Login</mdb-btn>
          </div>
        </form>
        <!-- Material form login -->
      </div>
    </mdb-col>
  </div>
</template>

<style scoped>
.login {
  width: 90%;
  max-width: 500px;
  margin: auto;
}
</style>

<script>
import axios from "axios";
import { mdbCol, mdbInput, mdbBtn } from "mdbvue";

export default {
  components: {
    mdbCol,
    mdbInput,
    mdbBtn,
  },
  data: function() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/");
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
