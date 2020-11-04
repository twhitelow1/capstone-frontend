<template>
  <div class="assignments-show">
    <h1>Assignment Info</h1>
    <p>Assigned To: {{ assignment }}</p>
    <p>Chore: {{ assignment }}</p>
    <p>Date Due: {{ assignment }}</p>
    <p>Assigned By: {{ assignment }}</p>
    <button>Back</button>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      assignment: {},
    };
  },
  created: function() {
    axios.get("/api/assignments/" + this.$route.params.id).then(response => {
      console.log("assignments show", response);
      this.assignment = response.data;
    });
  },
};
</script>
