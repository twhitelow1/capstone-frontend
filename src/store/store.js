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
  },
  getters: {
    assignments: state => state.assignments,
  },
});
