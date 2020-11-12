import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// const filters = {
//   all: (assignments) => !assignments.completed,
//   you: (assignments) =>
//     assignments.filter((assignment) => !assignment.completed).filter((assignment) => assignment.user_id === 1),
//   completed: (assignments) =>
//     assignments.filter((assignment) => assignment.completed).filter((assignment) => assignment.user_id !== 1),
// };

export const store = new Vuex.Store({
  state: {
    assignments: [],
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
  },
  getters: {
    assignments: state => state.assignments,
  },
});
