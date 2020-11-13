<template>
  <div class="assignments-list pt-5">
    <div class="card card-cascade narrower">
      <AssignmentsTableHeader
        v-bind:chores="chores"
        v-bind:assignments="assignments"
        v-bind:currentUser="currentUser"
        v-bind:selected="selected"
      />
      <div class="px-4">
        <div class="table-wrapper">
          <!--Table-->
          <mdb-tbl class="table table-hover mb-0" responsive>
            <mdb-tbl-head>
              <tr>
                <th>
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input align-middle"
                      id="tableDefaultCheck1"
                      v-model="selectAll"
                    />
                    <label class="custom-control-label" for="tableDefaultCheck1"></label>
                  </div>
                </th>
                <th class="th-lg assignment-row"><h4 class="h4">Chore Title</h4></th>
                <th class="th-lg">
                  <h4 class="h4">Assigned To</h4>
                </th>
                <th class="th-lg"><h4 class="h4">Room</h4></th>
                <th class="th-lg"><h4 class="h4">Date Due</h4></th>
                <th class="th-lg"></th>
              </tr>
            </mdb-tbl-head>

            <mdb-tbl-body>
              <tr
                v-for="assignment in this.$store.state.filteredAssignments"
                :key="`assign-${assignment.id}`"
                scope="row"
                class="text-center assingment-row"
              >
                <th scope="row" class="align-middle">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      :id="`ck${assignment.id}`"
                      :value="assignment.id"
                      v-model="selected"
                      number
                    />
                    <label class="custom-control-label" :for="`ck${assignment.id}`"></label>
                  </div>
                </th>
                <td class="align-middle assignment-row">
                  <p>{{ assignment.choreTitle }}</p>
                </td>
                <td class="align-middle assignment-row">
                  <p>{{ assignment.first_name }}</p>
                </td>
                <td class="align-middle assignment-row">
                  <p>{{ assignment.room }}</p>
                </td>
                <td class="align-middle assignment-row">
                  <p>{{ format(new Date(assignment.jsDate), "MM/dd/yyyy") }}</p>
                </td>
                <td class="align-middle">
                  <button
                    @click="showAssignment(assignment)"
                    type="button"
                    class="btn btn-outline-dark btn-rounded btn-sm px-2"
                  >
                    <i class="fas fa-pencil-alt mt-0"></i>
                  </button>
                </td>
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
        <mdb-col class="d-flex justify-content-end p-0">
          <select class="custom-select" name="select-user" id="select-user" v-model="currentAssignment.user.id">
            <option disabled>Assigned To</option>
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
        <mdb-row class="align-items-center justify-content-between mb-2">
          <mdb-col class="d-flex justify-content-start">
            <label for="select-user">Chore:</label>
          </mdb-col>
          <mdb-col class="d-flex justify-content-end p-0">
            <select class="custom-select" name="select-chore" id="select-chore" v-model="currentAssignment.chore_id">
              <option disabled value="none">Select Chore</option>
              <option v-for="(chore, index) in chores" :key="`m-${index}`" :value="`${chore.id}`">
                {{ chore.title }}
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
              v-model="currentAssignment.due_date"
              id="due-date"
            ></datepicker>
          </mdb-col>
        </mdb-row>
        <p class="capitalize">Assigned By: {{ currentAssignment.assigner.first_name }}</p>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="modal = false">Close</mdb-btn>
        <mdb-btn color="primary" @click.native="updateAssignment(currentAssignment)">Save changes</mdb-btn>
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
.assignment-row p {
  font-size: 1.3em;
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
.table th,
.table td {
  vertical-align: middle;
}
</style>

<script>
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { parseISO, parseJSON, format } from "date-fns";
import AssignmentsTableHeader from "./AssignmentsTableHeader";
import Datepicker from "vuejs-datepicker";

import {
  mdbModal,
  mdbModalHeader,
  mdbRow,
  mdbCol,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbBtn,
  mdbTbl,
  mdbTblHead,
  mdbTblBody,
} from "mdbvue";

export default {
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    Datepicker,
    AssignmentsTableHeader,
  },
  props: {
    chores: Array,
    currentUser: { home: { users: {} } },
  },
  data: function () {
    return {
      assignments: this.$store.state.assignments,
      currentAssignment: { user: {}, chore: {}, assigner: {} },
      parseISO,
      grabbedUser: {},
      format,
      completedAssignments: {},
      visibility: "active",
      modal: false,
      addNewModal: false,
      selected: [],
      currentAssignmentModal: false,
    };
  },
  created: function () {
    this.indexAssignments();
  },
  computed: {
    selectAll: {
      get: function () {
        return this.assignments ? this.selected.length == this.assignments.length : false;
      },
      set: function (value) {
        let selected = [];

        if (value) {
          this.assignments.forEach(function (assignment) {
            selected.push(assignment.id);
          });
        }

        this.selected = selected;
      },
    },
  },
  methods: {
    getCompletedAssignments: function () {
      this.indexAssignments();
    },
    changeVisibility: function (handle) {
      this.$store.commit("changeVisibility", handle);
    },
    showAssignment: function (assignment) {
      this.currentAssignment = assignment;
      this.modal = true;
    },
    indexAssignments: function () {
      axios.get("/api/assignments").then((response) => {
        console.log("asignments index", response);
        this.assignments = response.data;
        this.$store.commit("loadAssignments", response.data);
        this.$store.commit("filterAssignments");
        console.log(`store assignments ${this.$store.state.assignments}`);
      });
    },
    updateAssignment: function (assignment) {
      const params = {
        user_id: assignment.user_id,
        chore_id: assignment.chore_id,
        due_date: assignment.due_date,
        assigner_id: this.currentUser.id,
      };
      console.log(`params: ${params}`);
      axios
        .patch("/api/assignments/" + assignment.id, params)
        .then((response) => {
          this.modal = false;
          console.log("assignments create", response);
          this.$store.commit("updateAssignment", response.data);
          this.$store.commit("filterAssignments");
          console.log(this.$store.state.assignments);
        })
        .catch((error) => {
          console.log("assignments create error", error.response);
        });
    },
  },
};
</script>
