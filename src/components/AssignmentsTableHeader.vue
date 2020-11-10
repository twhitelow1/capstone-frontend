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
        <mdb-row class="align-items-center justify-content-between mb-2">
          <mdb-col class="d-flex justify-content-start">
            <label for="select-user">Chore:</label>
          </mdb-col>
          <mdb-col class="d-flex justify-content-end p-0">
            <select class="custom-select" name="select-chore" id="select-chore" v-model="newAssignmentChoreId">
              <option disabled value="none">Select Chore</option>
              <option v-for="(chore, index) in chores" :key="`m-${index}`" value="`${chore.id}`">
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
              <option v-for="(member, index) in houseMembers" :key="`mem${index}`">{{ member }}</option>
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
        <mdb-btn color="secondary" @click.native="addNewModal = false">Close</mdb-btn>
        <mdb-btn color="primary">Save changes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <!--Card image-->
    <div
      class="view view-cascade default-color-dark narrower w-100 p-3 mx-0 mb-3 d-flex justify-content-between align-items-center"
      style="border-radius:5px 5px 0 0;"
    >
      <div>
        <mdb-tooltip trigger="hover" :options="{ placement: 'right' }">
          <span slot="tip">Add A New Assignment</span>
          <button
            @click="addNewModal = true"
            slot="reference"
            type="button"
            class="btn btn-outline-white btn-rounded btn-sm px-2"
          >
            <i class="fas fa-plus mt-0"></i>
          </button>
        </mdb-tooltip>
        <!-- <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
            <i class="fas fa-columns mt-0"></i>
          </button> -->
      </div>
      <div class="flex-column text-white">
        <a href="" class="white-text mx-3 h4">Current Chores Assigned</a>
        <br />
        <a class="filter-link" @click="changeVisibility('all')">All Assignments</a>
        |
        <a class="filter-link" @click="changeVisibility('you')">Assigned To You</a>
        |
        <a class="filter-link" @click="changeVisibility('completed')">Finished</a>
      </div>
      <div>
        <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
          <i class="fas fa-pencil-alt mt-0"></i>
        </button>
        <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
          <i class="fas fa-times mt-0"></i>
        </button>
        <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
          <i class="fas fa-info-circle mt-0"></i>
        </button>
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

const filters = {
  all: assignments => !assignments.completed,
  you: assignments =>
    assignments
      .filter(assignment => !assignment.completed)
      .filter(assignment => assignment.user_id === this.currentUserId),
  completed: assignments =>
    assignments
      .filter(assignment => assignment.completed)
      .filter(assignment => assignment.user_id !== this.currentUserId),
};

export default {
  components: {
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
  },
  data: function() {
    return {
      assignments: [],
      houseMembers: ["Todd", "Kiya"],
      newAssignmentUserId: 0,
      newAssignmentChoreId: 0,
      newAssignmentAssignerId: this.currentUserId,
      newAssignmentDueDate: new Date(),
      format,
      completedAssignments: {},
      visibility: "active",
      modal: false,
      addNewModal: false,
      currentUserId: 1,
    };
  },
  computed: {
    filteredAssignments: function() {
      return filters[this.visibility](this.assignments);
    },
  },
  methods: {
    changeVisibility: function(handle) {
      return (this.visibility = handle);
    },
    createAssignments: function() {
      var params = {
        user_id: this.newAssignmentUserId,
        chore_id: this.newAssignmentId,
        due_date: this.newAssignmentDueDate,
        assigner_id: this.newAssignmentAssignerId,
      };
      axios
        .post("/api/assignments", params)
        .then(response => {
          this.$router.push("/");
          console.log("assignments create", response);
        })
        .catch(error => {
          console.log("assignments create error", error.response);
        });
    },
  },
};
</script>
