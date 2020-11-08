<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col>
          <AssignmentsList />
        </b-col>
        <b-col>
          <ChoresList />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style>
body {
  font-family: "Nunito", sans-serif;
}
</style>

<script>
import { parseISO, format } from "date-fns";
import AssignmentsList from "../components/AssignmentsList";
import ChoresList from "../components/ChoresList";

const filters = {
  all: assignments => assignments,
  active: assignments => assignments.filter(assignment => !assignment.completed),
  completed: assignments => assignments.filter(assignment => assignment.completed),
};

export default {
  components: {
    AssignmentsList,
    ChoresList,
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
