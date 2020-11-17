<template>
  <div>
    <!-- Add  modal form from mdb here instead -->
    <mdb-modal :show="addNewModal" @close="addNewModal = false" cascade>
      <mdb-modal-header class="default-color-dark white-text">
        <h4 class="title">
          <i class="fas fa-plus" />
          Assign A Chore
        </h4>
      </mdb-modal-header>
      <mdb-modal-body class="grey-text">
        <!-- Chore Name -->
        <mdb-row class="align-items-center justify-content-between mb-2">
          <mdb-col class="d-flex justify-content-start">
            <label for="select-user">Chore:</label>
          </mdb-col>
          <mdb-col class="d-flex justify-content-end p-0">
            <select class="custom-select" name="select-chore" id="select-chore" v-model="newAssignmentChoreId">
              <option disabled value="none">Select Chore</option>
              <option v-for="(chore, index) in chores" :key="`m-${index}`" :value="`${chore.id}`">
                {{ chore.title }}
              </option>
            </select>
          </mdb-col>
        </mdb-row>
        <mdb-row class="align-items-center justify-content-between mb-2">
          <mdb-col class="d-flex justify-content-start">
            <label for="select-user">Assign To:</label>
          </mdb-col>
          <mdb-col class="d-flex justify-content-end p-0">
            <select class="custom-select" name="select-user" id="select-user" v-model="newAssignmentUserId">
              <option disabled>Select House Member</option>
              <option :value="`${currentUser.id}`">{{ currentUser.first_name }}</option>
              <option
                v-for="(housemate, index) in currentUser.housemates"
                :key="`mem${index}`"
                :value="`${housemate.id}`"
              >
                {{ housemate.first_name }}
              </option>
            </select>
          </mdb-col>
        </mdb-row>
        <mdb-row class="align-items-center justify-content-between">
          <mdb-col class="d-flex justify-content-start">
            <label for="due-date ">Date Due:</label>
          </mdb-col>
          <mdb-col class="d-flex justify-content-end p-0">
            <datepicker
              placeholder="Select Date"
              input-class="custom-select"
              v-model="newAssignmentDueDate"
              id="due-date"
            ></datepicker>
          </mdb-col>
        </mdb-row>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click="addNewModal = false">Close</mdb-btn>
        <mdb-btn color="primary" @click="createAssignments">Assign Chore</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <!--Card image-->
    <div
      class="view view-cascade default-color-dark narrower w-100 py-3 px-2 mx-0 mb-3 d-flex flex-wrap justify-content-between align-items-center"
      style="border-radius:5px 5px 0 0;"
    >
      <div class="">
        <mdb-tooltip trigger="hover" :options="{ placement: 'right' }">
          <span slot="tip">Add A New Assignment</span>
          <button
            @click="addNewModal = true"
            slot="reference"
            type="button"
            class="btn btn-outline-white btn-rounded btn-sm px-2"
          >
            <i class="fas fa-plus mt-0 fa-2x"></i>
            <show-at breakpoint="medium">
              <b class="h6" vertical-align> ASSIGNMENT</b>
            </show-at>
          </button>
        </mdb-tooltip>
      </div>
      <div class="text-white">
        <a href="" class="white-text mx-3 h4">Assigned Chores</a>
        <br />
        <br />
        <show-at breakpoint="large">
          <div style="line-height:1.5em;">
            <a class="filter-link" href="?visibility=all">All Assignments</a>
            |
            <a class="filter-link" href="?visibility=you">Assigned To You</a>
            |
            <a class="filter-link" href="?visibility=finished">Finished</a>
          </div>
        </show-at>
      </div>
      <div class="">
        <mdb-tooltip trigger="hover" :options="{ placement: 'left' }">
          <span slot="tip">Complete Assignment</span>
          <button
            @click="completeAssignment(selected)"
            type="button"
            class="btn btn-outline-white btn-rounded btn-sm px-2"
            slot="reference"
          >
            <i class="fas fa-times mt-0 fa-2x vertical-align"></i>
          </button>
        </mdb-tooltip>
      </div>
    </div>
    <!--/Card image-->
  </div>
</template>

<style scoped>
.custom-select {
  margin-left: 0.5em;
  width: 80%;
}
</style>

<script>
import axios from "axios";
import Datepicker from "vuejs-datepicker";
import { format } from "date-fns";
import { mdbTooltip, mdbBtn, mdbModal, mdbModalHeader, mdbCol, mdbModalBody, mdbModalFooter, mdbRow } from "mdbvue";
import { showAt } from "vue-breakpoints";

export default {
  components: {
    showAt,
    mdbTooltip,
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalBody,
    mdbModalFooter,
    mdbCol,
    Datepicker,
    mdbRow,
  },
  props: {
    chores: Array,
    currentUser: Object,
    selected: Array,
    assignments: Array,
  },
  data: function () {
    return {
      users: [],
      houseMembers: ["Todd", "Kiya"],
      newAssignmentUserId: 0,
      newAssignmentChoreId: 0,
      newAssignmentAssignerId: this.currentUser.id,
      newAssignmentDueDate: new Date(),
      format,
      completedAssignments: {},
      visibility: "you",
      modal: false,
      addNewModal: false,
    };
  },
  created: function () {
    this.indexUsers();
  },
  methods: {
    changeVisibility: function (handle) {
      this.$store.commit("changeVisibility", handle);
      this.$store.commit("filterAssignments");
    },
    indexUsers: function () {
      axios.get("/api/users").then((response) => {
        console.log("users index", response);
        this.users = response.data;
      });
    },
    createAssignments: function () {
      const params = {
        user_id: this.newAssignmentUserId,
        chore_id: this.newAssignmentChoreId,
        due_date: this.newAssignmentDueDate,
        assigner_id: this.currentUser.id,
      };
      console.log(`params: ${params}`);
      axios
        .post("/api/assignments", params)
        .then((response) => {
          this.addNewModal = false;
          console.log("assignments create", response);
          this.$store.commit("addAssignment", response.data);
          this.$store.commit("filterAssignments");

          console.log(this.$store.state.assignments);
        })
        .catch((error) => {
          console.log("assignments create error", error.response);
        });
    },
    addAssignment: function (event) {
      alert(event.target.value);
    },
    addPoints: function (user_id, points) {
      const params = { points };
      axios
        .patch("/api/users/" + user_id, params)
        .then((response) => {
          console.log("add user points completed", response);
          this.$store.commit("updatePoints", user_id, points);
        })
        .catch((error) => {
          console.log("add points error", error.response);
        });
    },
    indexAssignments: function () {
      axios.get("/api/assignments/?visibility=" + this.$store.state.visibility).then((response) => {
        console.log("asignments index", response);
        this.assignments = response.data;
        this.$store.commit("loadAssignments", response.data);
        this.$store.commit("filterAssignments");
        console.log(`store assignments ${this.$store.state.assignments}`);
      });
    },
    completeAssignment: function (assignments) {
      const params = {
        assignments,
      };
      const doneAssignments = [];
      // eslint-disable-next-line prettier/prettier
      this.selected.forEach((assignment_id) => {
        // eslint-disable-next-line prettier/prettier
        this.assignments.forEach((assignment) => {
          if (assignment.id === assignment_id) {
            doneAssignments.push(assignment);
            console.log(`added: ${assignment}`);
          }
        });
      });
      console.log(doneAssignments);
      doneAssignments.forEach((assignment) => {
        console.log(`user id who earned: ${assignment.user.id}`);
        console.log(`current points: ${assignment.user.points}`);
        console.log(`points earned: ${assignment.chore.points_gain}`);
        const totalPoints = assignment.user.points + assignment.chore.points_gain;
        this.addPoints(assignment.user.id, totalPoints);
      });
      axios
        .patch("/api/assignments/completed", params)
        .then((response) => {
          console.log("assignment completed", response);
          this.$store.commit("completeAssignments", assignments);
          this.indexAssignments();
        })
        .catch((error) => {
          console.log("assignments create error", error.response);
        });
    },
  },
};
</script>
