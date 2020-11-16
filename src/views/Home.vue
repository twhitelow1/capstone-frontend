<template>
  <mdb-row class="home m-0 grey lighten-2" style="min-height:inherit;">
    <mdb-col sm="3" class="p-0">
      <LeftNavigation v-bind:currentUser="currentUser" />
    </mdb-col>
    <mdb-col sm="9">
      <mdb-row>
        <mdb-col>
          <AssignmentsList v-bind:chores="chores" v-bind:currentUser="currentUser" v-bind:visibility="visibility" />
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col class="col-xl-6">
          <!-- <ChoresList v-bind:chores="chores" />
        </mdb-col>
        <mdb-col class="col-xl-6">
          <ChoresList v-bind:chores="chores" /> -->
        </mdb-col>
      </mdb-row>
    </mdb-col>
  </mdb-row>
</template>

<style>
body {
  font-family: "Nunito", sans-serif;
}
.col {
  padding: 0;
}
.main-container {
  padding: 50px 0px 0px 0px;
  width: 100%;
  max-width: 100vw;
  margin: 0;
  min-height: 100vh;
}
</style>

<script>
import axios from "axios";
import { parseISO, format } from "date-fns";
import AssignmentsList from "../components/AssignmentsList";
import LeftNavigation from "../components/LeftNavigation";
import { mdbCol, mdbRow } from "mdbvue";

export default {
  components: {
    AssignmentsList,
    mdbCol,
    mdbRow,
    LeftNavigation,
  },
  data: function () {
    return {
      chores: [],
      users: [],
      currentUser: {},
      assignments: [],
      currentAssignment: { user: {}, chore: {} },
      currentChore: { room: {} },
      parseISO,
      format,
      grabbedUser: {},
      completedAssignments: {},
      visibility: "",
    };
  },
  created: function () {
    this.checkVisibility();
    this.indexChores();
    this.getCurrentUser();
  },
  mounted: function () {
    this.checkVisibility();
  },
  methods: {
    checkVisibility: function () {
      if (this.$route.query.visibility) {
        this.visibility = this.$route.query.visibility;
        console.log(`visibility: ${this.visibility}`);
      }
    },
    indexChores: function () {
      axios.get("/api/chores").then((response) => {
        console.log("chores index", response);
        this.chores = response.data;
      });
    },
    getCurrentUser: function () {
      axios.get("/api/users/current").then((response) => {
        console.log("current user", response);
        this.$store.commit("setCurrentUser", response.data);
        this.currentUser = response.data;
      });
    },
  },
};
</script>
