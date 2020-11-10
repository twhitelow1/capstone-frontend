<template>
  <mdb-row class="home m-0 grey lighten-3" style="min-height:inherit;">
    <mdb-col lg="2" class="p-0">
      <LeftNavigation />
    </mdb-col>
    <mdb-col lg="9">
      <AssignmentsList v-bind:chores="chores" />
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
// import ChoresList from "../components/ChoresList";
import LeftNavigation from "../components/LeftNavigation";
import { mdbCol, mdbRow } from "mdbvue";

const filters = {
  all: assignments => assignments,
  active: assignments => assignments.filter(assignment => !assignment.completed),
  completed: assignments => assignments.filter(assignment => assignment.completed),
};

export default {
  components: {
    AssignmentsList,
    mdbCol,
    mdbRow,
    LeftNavigation,
  },
  data: function() {
    return {
      chores: [],
      users: [],
      assignments: [],
      currentAssignment: { user: {}, chore: {} },
      currentChore: { room: {} },
      parseISO,
      format,
      grabbedUser: {},
      completedAssignments: {},
      visibility: this.checkVisibility(),
    };
  },
  created: function() {
    this.checkVisibility();
    this.indexChores();
  },
  mounted: function() {
    this.checkVisibility();
  },
  computed: {
    filteredAssignments: function() {
      return filters[this.visibility](this.assignments);
    },
  },
  methods: {
    checkVisibility: function() {
      if (this.$route.query.visibility) {
        this.visibility = this.$route.query.visibility;
      }
    },
    indexChores: function() {
      axios.get("/api/chores").then(response => {
        console.log("chores index", response);
        this.chores = response.data;
      });
    },
  },
};
</script>
