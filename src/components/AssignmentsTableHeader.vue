<template>
  <div>
    <mdb-modal :show="addNewModal" @close="addNewModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Assignment Info</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <p>Assigned To: {{ currentAssignment.user.first_name }}</p>
        <p>Chore: {{ currentAssignment.chore.title }}</p>
        <p>Date Due: {{ parseISO(currentAssignment.due_date) }}</p>
        <p>Is Completed?: {{ currentAssignment.completed }}</p>
        <p>Assigned By: {{ currentAssignment.assigner_id }}</p>
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
import { parseISO, parseJSON, format } from "date-fns";
import { mdbTooltip, mdbBtn, mdbModal } from "mdbvue";

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
  },
  data: function() {
    return {
      assignments: [],
      currentAssignment: { user: {}, chore: {} },
      parseISO,
      grabbedUser: {},
      format,
      completedAssignments: {},
      visibility: "active",
      modal: false,
      addNewModal: false,
    };
  },
  created: function() {
    this.indexAssignments();
  },
  computed: {
    filteredAssignments: function() {
      return filters[this.visibility](this.assignments);
    },
  },
  methods: {
    tableAssignments: function(assignments) {
      const results = [];
      assignments.each(assignment => {
        results.push({ name: assignment.user.id });
      });
      console.log("tableAssignments results:" + results);
      return results;
    },
    getCompletedAssignments: function() {
      this.indexAssignments();
    },
    changeVisibility: function(handle) {
      return (this.visibility = handle);
    },
    showAssignment: function(assignment) {
      this.currentAssignment = assignment;
      document.querySelector("#assignment-details").showModal();
    },
    indexAssignments: function() {
      axios.get("/api/assignments").then(response => {
        console.log("asignments index", response);
        this.assignments = response.data;
      });
    },
  },
};
</script>
