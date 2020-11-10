<template>
  <div>
    <!-- Add  modal form from mdb here instead -->
    <mdb-modal :show="addNewModal" @close="addNewModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Assign A Chore</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <label for="select-user">Assign To:</label>
        <select class="custom-select " name="select-user" id="select-user" v-model="newAssignmentUserId">
          <option selected>Select House Member</option>
          <option v-for="member in houseMembers" :key="`m-${member}`">{{ member }}</option>
        </select>
        <p>Date Due:</p>
        <p>Is Completed?:</p>
        <p>Assigned By:</p>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="addNewModal = false">Close</mdb-btn>
        <mdb-btn color="primary">Save changes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <!--Card image-->
    <div
      class="view view-cascade gradient-card-header unique-color-dark narrower p-3 mx-0 mb-3 d-flex justify-content-between align-items-center"
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
        <a class="filter-link" @click="changeVisibility('all')">All</a>
        |
        <a class="filter-link" @click="changeVisibility('active')">Active</a>
        |
        <a class="filter-link" @click="changeVisibility('completed')">Completed</a>
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
<script>
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { parseJSON, format } from "date-fns";
import {
  mdbTooltip,
  mdbBtn,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbAutocomplete,
} from "mdbvue";

const filters = {
  all: assignments => assignments,
  active: assignments => assignments.filter(assignment => !assignment.completed),
  completed: assignments => assignments.filter(assignment => assignment.completed),
};

export default {
  components: {
    mdbTooltip,
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbAutocomplete,
  },
  data: function() {
    return {
      assignments: [],
      houseMembers: ["Todd", "Kiya"],
      newAssignmentUserId: "",
      newAssignmentChoreId: "",
      newAssignmentAssignerId: "",
      format,
      completedAssignments: {},
      visibility: "active",
      modal: false,
      addNewModal: false,
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
