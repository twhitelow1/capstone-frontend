<template>
  <div class="home">
    <div class="main-container">
      <mdb-row>
        <mdb-col>
          <LeftNavigation />
        </mdb-col>
        <mdb-col sm="8">
          <AssignmentsList />
        </mdb-col>
        <mdb-col>
          <ChoresList />
        </mdb-col>
      </mdb-row>
    </div>
  </div>
</template>

<style>
body {
  font-family: "Nunito", sans-serif;
}

.main-container {
  padding: 50px 0px;
  width: 100%;
  margin: 0;
}
</style>

<script>
import { parseISO, format } from "date-fns";
import AssignmentsList from "../components/AssignmentsList";
import ChoresList from "../components/ChoresList";
import LeftNavigation from "../components/LeftNavigation";
import { mdbRow, mdbCol } from "mdbvue";

const filters = {
  all: assignments => assignments,
  active: assignments => assignments.filter(assignment => !assignment.completed),
  completed: assignments => assignments.filter(assignment => assignment.completed),
};

export default {
  components: {
    AssignmentsList,
    ChoresList,
    // mdbContainer,
    mdbRow,
    mdbCol,
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
      console.log(`my params: ${this.$route.query.visibility}`);
      if (this.$route.query.visibility) {
        this.visibility = this.$route.query.visibility;
      }
      console.log(`set visibility: ${this.visibility}`);
    },
  },
};
</script>
