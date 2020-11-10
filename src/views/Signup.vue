<template>
  <mdb-row class="justify-content-md-center">
    <div class="card m-5 p-4 w-responsive justify-content-center" cols="4">
      <!-- Material form register -->
      <form>
        <p class="h4 text-center mb-4">Sign up</p>
        <div class="grey-text">
          <mdb-input label="Your name" icon="user" type="text" />
          <mdb-input label="Your email" icon="envelope" type="email" />
          <mdb-input label="Your password" icon="lock" type="password" />
          <mdb-input label="Confirm your password" icon="exclamation-triangle" type="password" />
        </div>
        <div class="text-center">
          <mdb-btn @click.native="submit" color="primary" rounded>Register</mdb-btn>
        </div>
      </form>
      <!-- Material form register -->
    </div>
  </mdb-row>
</template>
<style scoped>
.card {
  max-width: 500px;
}
</style>

<script>
import axios from "axios";
import { mdbInput, mdbBtn, mdbRow } from "mdbvue";

export default {
  components: {
    mdbInput,
    mdbBtn,
    mdbRow,
  },
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then(response => {
          console.log(response);
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
