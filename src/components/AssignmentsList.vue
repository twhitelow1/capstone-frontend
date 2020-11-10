<template>
  <div class="assignments-list pt-5">
    <div class="card card-cascade narrower">
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
      <div class="px-4">
        <div class="table-wrapper">
          <!--Table-->
          <mdb-tbl class="table table-hover mb-0" responsive>
            <mdb-tbl-head>
              <tr>
                <th>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="tableDefaultCheck1" />
                    <label class="custom-control-label" for="tableDefaultCheck1"></label>
                  </div>
                </th>
                <th class="th-lg">Chore Title</th>
                <th class="th-lg">Assigned To</th>
                <th class="th-lg">Room</th>
                <th class="th-lg">Date Due</th>
              </tr>
            </mdb-tbl-head>

            <mdb-tbl-body>
              <tr v-for="assignment in filteredAssignments" :key="`assign-${assignment.id}`" scope="row">
                <th scope="row">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" :id="`ck${assignment.id}`" />
                    <label class="custom-control-label" :for="`ck${assignment.id}`"></label>
                  </div>
                </th>
                <td>{{ assignment.choreTitle }}</td>
                <td>{{ assignment.first_name }}</td>
                <td>{{ assignment.room }}</td>
                <td>{{ format(new Date(assignment.jsDate), "MM/dd/yyyy") }}</td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </div>
      </div>
    </div>
    <mdb-modal :show="modal" @close="modal = false">
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
        <mdb-btn color="secondary" @click.native="modal = false">Close</mdb-btn>
        <mdb-btn color="primary">Save changes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

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
  </div>
</template>

<style>
.assignment-list {
  /* max-width: 800px; */
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
}
h1 {
  font-size: 2em;
}
a.filter-link {
  cursor: pointer;
  color: rgb(70, 130, 180);
  font-size: 1.2em;
}
.assignment {
  display: flex;
  margin-bottom: 0.2em;
  padding: 1em;
  justify-content: space-between;
  background-color: rgb(70, 130, 180);
  color: rgb(245, 245, 245);
  font-weight: 500;
}
/* The container */
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
li {
  list-style-type: none;
}
</style>

<script>
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { parseISO, parseJSON, format } from "date-fns";
import {
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbBtn,
  mdbTbl,
  mdbTblHead,
  mdbTblBody,
  mdbTooltip,
} from "mdbvue";

const filters = {
  all: assignments => assignments,
  active: assignments => assignments.filter(assignment => !assignment.completed),
  completed: assignments => assignments.filter(assignment => assignment.completed),
};

export default {
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbTooltip,
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
