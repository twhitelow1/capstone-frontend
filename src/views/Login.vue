<template>
  <mdb-row class="justify-content-md-center">
    <div class="card m-5 p-4 w-responsive justify-content-center" cols="4">
      <!-- Material form login -->
      <form>
        <ul>
          <li class="text-danger" :key="error" v-for="error in errors">{{ error }}</li>
        </ul>
        <p class="h3 text-center mb-4">Log in</p>
        <div class="grey-text">
          <mdb-input icon="envelope" label="Your email" type="email" v-model="email" />
          <mdb-input icon="lock" label="Your password" type="password" v-model="password" />
        </div>
        <div class="text-center">
          <mdb-btn @click.native="submit" color="primary" rounded>Login</mdb-btn>
        </div>
      </form>
      <!-- Material form login -->
    </div>
  </mdb-row>
</template>

<style scoped>
.card {
  max-width: 500px;
}

.login {
  width: 90%;
  max-width: 500px;
  margin: auto;
}
</style>

<script>
import axios from "axios";
import { mdbRow, mdbInput, mdbBtn } from "mdbvue";

export default {
  components: {
    mdbRow,
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
          console.log(response.data.jwt);
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
