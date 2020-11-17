import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentUser: {},
    assignments: [],
    filteredAssignments: [],
    visibilityy: "all",
    users: [],
  },
  mutations: {
    getUsers(state, users) {
      state.user = users;
    },
    updatePoints(state, user_id, points) {
      state.users.forEach(user => {
        if (user.id === user_id) {
          user.points = points;
        }
      });
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    completeAssignment(state, assignmentIds) {
      assignmentIds.forEach(id => {
        state.assignments = state.assignments.filter(assignment => assignment.id !== id);
      });
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
        state.assignments.forEach(assignment => {
          if (assignment.id === assignmentId) {
            assignment.completed = true;
            assignment.completed_date = new Date();
          }
        });
      });
      state.assignments;
    },
    filterAssignments: function (state, assignments) {
      state.filteredAssignments = assignments;
    },
    changeVisibility(state, visibility) {
      state.visibility = visibility;
    },
  },
  getters: {
    assignments: state => state.assignments,
    visibility: state => state.visibility,
    currentUser: state => state.currentUser,
    users: state => state.users,
  },
});
