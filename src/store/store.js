import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    assignments: [],
    filteredAssignments: [],
    visibility: "all",
    filters: {
      all: assignments => assignments.filter(assignments => !assignments.completed),
      you: assignments =>
        assignments.filter(assignment => !assignment.completed).filter(assignment => assignment.user_id === 1),
      completed: assignments =>
        assignments.filter(assignment => assignment.completed).filter(assignment => assignment.user_id !== 1),
    },
  },
  mutations: {
    addAssignment(state, assignment) {
      state.assignments.push(assignment);
    },
    loadAssignments(state, assignments) {
      state.assignments = assignments;
    },
    completeAssignments(state, assignments) {
      assignments.forEach(assignmentId => {
        console.log(`show assignment id: ${assignmentId}`);
        state.assignments.forEach(assignment => {
          if (assignment.id === assignmentId) {
            assignment.completed = true;
            assignment.completed_date = new Date();
          }
        });
      });
    },
    filterAssignments: function (state) {
      state.filteredAssignments = state.filters[state.visibility](state.assignments);
    },
    changeVisibility(state, visibility) {
      state.visibility = visibility;
    },
  },
  getters: {
    assignments: state => state.assignments,
    visibility: state => state.visibility,
  },
});
