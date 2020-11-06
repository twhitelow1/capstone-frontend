<template>
  <div class="home">
    <h1>To Do List</h1>
    <a href="?completed=true">Completed</a>
    <ul class="todo-list">
      <li v-for="assignment in filteredAssignments" class="todo" :key="`assign-${assignment.id}`">
        <input class="toggle" type="checkbox" v-model="assignment.completed" />
        <label @click="showAssignment(assignment)">{{ `${assignment.chore.title} ` }}</label>
        | Assigned To: {{ assignment.user.first_name }}
        <p>-----------------------------------------</p>
      </li>
    </ul>
    <dialog id="assignment-details">
      <form method="dialog">
        <h1>Assignment Info</h1>
        <p>Assigned To: {{ currentAssignment.user.first_name }}</p>
        <p>Chore: {{ currentAssignment.chore.title }}</p>
        <p>Date Due: {{ parseISO(currentAssignment.due_date) }}</p>
        <p>Assigned By: {{ currentAssignment.assigner_id }}</p>
        <button>Close</button>
      </form>
    </dialog>
    <h2>Assign A Chore</h2>
    <div v-for="(chore, index) in chores" :key="index">
      <p>Chore Name: {{ chore.title }}</p>
      <p>Last Time Completed: {{ chore.last_completed }}</p>
      <p>Room: {{ chore.room.name }}</p>
      <button>Assign Chore</button>
      <button v-on:click="showChore(chore)">More Info</button>
      <br />
      <dialog id="chore-details">
        <form method="dialog">
          <h1>Chore Info</h1>
          <p>Chore Name: {{ chore.title }}</p>
          <p>Description: {{ chore.desc }}</p>
          <p>How often does the chore need to be done: {{ chore.frequency }} day(s)</p>
          <p>Last Time Completed: {{ chore.last_completed }}</p>
          <p>Earn: {{ chore.points_gain }} points</p>
          <p>Cost To Get Someone Else To Do It: {{ chore.points_price }} points</p>
          <p>Room: {{ chore.room.name }}</p>
          <button>Close</button>
        </form>
      </dialog>
    </div>
  </div>
</template>

<style>
li {
  list-style: none;
  border: 1px solid rgb(126, 126, 126);
  background-color: rgb(240, 240, 240);
  margin: auto;
  max-width: 1000px;
}
</style>

<script>
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { fromUnixTime, parseISO, format, parseJSON } from "date-fns";

const filters = {
  all: assignments => assignments,
  active: assignments => assignments.filter(assignment => !assignment.completed),
  completed: assignments => assignments.filter(assignment => assignment.completed),
};

export default {
  data: function() {
    return {
      chores: [],
      users: [],
      assignments: [],
      newChoreDesc: "",
      newChoreTitle: "",
      newChoreFrequency: "",
      newChoreLastCompleted: "",
      newChorePointsGain: "",
      newChorePointsPrice: "",
      newChoreRoomId: "",
      fromUnixTime,
      currentAssignment: { user: {}, chore: {} },
      currentChore: { room: {} },
      parseISO,
      format,
      grabbedUser: {},
      completedAssignments: {},
      visibility: "active",
    };
  },
  created: function() {
    this.indexChores();
    this.indexAssignments();
    this.indexUsers();
  },
  computed: {
    filteredAssignments: function() {
      return filters[this.visibility](this.assignments);
    },
  },
  methods: {
    indexChores: function() {
      axios.get("/api/chores").then(response => {
        console.log("chores index", response);
        this.chores = response.data;
      });
    },
    showChore: function(chore) {
      this.currentChore = chore;
      document.querySelector("#chore-details").showModal();
    },
    getCompletedAssignments: function() {
      this.indexAssignments();
    },
    createChore: function() {
      var params = {
        title: this.newChoreTitle,
        desc: this.newChoreDesc,
        frequency: this.newChoreFrequency,
        last_completed: this.newChoreLastCompleted,
        points_gain: this.newChorePointsGain,
        points_price: this.newChorePointsPrice,
        room_id: this.newChoreRoomId,
      };
      axios
        .post("/api/chores", params)
        .then(response => {
          this.$router.push("/chores");
          console.log("chores create", response);
        })
        .catch(error => {
          console.log("chores create error", error.response);
        });
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
