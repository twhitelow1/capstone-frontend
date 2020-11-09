<template>
  <div class="assignments-list pt-5">
    <h1>To Do List</h1>
    <a class="filter-link" @click="changeVisibility('all')">All</a>
    |
    <a class="filter-link" @click="changeVisibility('active')">Active</a>
    |
    <a class="filter-link" @click="changeVisibility('completed')">Completed</a>

    <mdb-datatable :data="tableData" striped bordered />

    <ul class="assignment-list">
      <li v-for="assignment in filteredAssignments" class="assignment" :key="`assign-${assignment.id}`">
        <label class="container">
          <input class="toggle" type="checkbox" v-model="assignment.completed" />
          <span class="checkmark"></span>
        </label>
        <label @click="modal = true" class="complete-box">
          Assigned To: {{ assignment.user.first_name }} | Chore: {{ assignment.chore.title }}
        </label>
      </li>
    </ul>
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
import { parseISO, parseJSON } from "date-fns";
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbDatatable } from "mdbvue";

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
    mdbDatatable,
  },
  data: function() {
    return {
      users: [],
      assignments: [],
      currentAssignment: { user: {}, chore: {} },
      currentChore: { room: {} },
      parseISO,
      grabbedUser: {},
      completedAssignments: {},
      visibility: "active",
      modal: false,
      tableData: {
        columns: [
          {
            label: "name",
            field: "user",
            sort: "asc",
          },
        ],
        rows: this.assignments,
      },
    };
  },
  created: function() {
    this.indexAssignments();
    this.indexUsers();
    console.log(this.assignments);
  },
  computed: {
    filteredAssignments: function() {
      return filters[this.visibility](this.assignments);
    },
  },
  methods: {
    tableAssignments: function() {
      const result = [];
      this.assignments.each(assignment => {
        result.push(assignment.user.first_name);
      });
      result;
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
    indexUsers: function() {
      axios.get("/api/users").then(response => {
        console.log("users index", response);
        this.users = response.data;
      });
    },
  },
};
</script>
