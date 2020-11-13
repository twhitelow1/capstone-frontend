import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentUser: {},
    assignments: [],
    filteredAssignments: [],
    visibility: "you",
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    addAssignment(state, assignment) {
      state.assignments.push(assignment);
    },
    updateAssignment(state, assignment) {
      state.assignments.forEach(assign => {
        if (assign.id === assignment.id) {
          assign = assignment;
        }
      });
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
      const filters = {
        all: assignments => assignments.filter(assignments => !assignments.completed),
        you: assignments =>
          assignments
            .filter(assignment => !assignment.completed)
            .filter(assignment => assignment.user.id === state.currentUser.id),
        completed: assignments =>
          assignments.filter(assignment => assignment.completed).filter(assignment => assignment.user.id !== 1),
      };

      state.filteredAssignments = filters[state.visibility](state.assignments);
    },
    changeVisibility(state, visibility) {
      state.visibility = visibility;
    },
  },
  getters: {
    assignments: state => state.assignments,
    visibility: state => state.visibility,
    currentUser: state => state.currentUser,
  },
});
