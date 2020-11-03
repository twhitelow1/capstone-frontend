<template>
  <div class="home">
    <h1>To Do List</h1>
    <div v-for="assignment in assignments" :key="`assign-${assignment.id}`">
      <p>Assigned To: {{ assignment.user.first_name }}</p>
      <p>Chore: {{ assignment.chore.title }}</p>
      <p>Date Due: {{ assignment.due_date }}</p>
      <p>Assigned By: {{ assignment.assigner_id }}</p>
      <button>Complete</button>
      <button v-on:click="showAssignment(assignment)">More Info</button>
      <p>-----------------------------------------</p>
    </div>
    <dialog id="assignment-details">
      <form method="dialog">
        <h1>Assignment Info</h1>
        <p>Assigned To: {{ currentAssignment.user.first_name }}</p>
        <p>Chore: {{ currentAssignment.chore.title }}</p>
        <p>Date Due: {{ currentAssignment.due_date }}</p>
        <p>Assigned By: {{ currentAssignment.assigner_id }}</p>
        <button>Close</button>
      </form>
    </dialog>
    <h2>Assign A Chore</h2>
    <div v-for="(chore, index) in chores" :key="index">
      <p>Chore Name: {{ chore.title }}</p>
      <p>Description: {{ chore.desc }}</p>
      <p>How often does the chore need to be done: {{ chore.frequency }} day(s)</p>
      <p>Last Time Completed: {{ chore.last_completed }}</p>
      <p>Earn: {{ chore.points_gain }} points</p>
      <p>Cost To Get Someone Else To Do It: {{ chore.points_price }} points</p>
      <p>Room: {{ chore.room.name }}</p>
      <button>Assign Chore</button>
      <button>More Info</button>
      <br />
      <p>-----------------------------------------</p>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import { fromUnixTime } from "date-fns";

export default {
  data: function() {
    return {
      chores: [],
      assignments: [],
      newChoreDesc: "",
      newChoreTitle: "",
      newChoreFrequency: "",
      newChoreLastCompleted: "",
      newChorePointsGain: "",
      newChorePointsPrice: "",
      newChoreRoomId: "",
      fromUnixTime,
      currentAssignment: {},
    };
  },
  created: function() {
    this.indexChores();
    this.indexAssignments();
  },
  methods: {
    indexChores: function() {
      axios.get("/api/chores").then(response => {
        console.log("chores index", response);
        this.chores = response.data;
      });
    },
    showAssignment: function(assignment) {
      this.currentAssignment = assignment;
      console.log("current assignment", this.currentAssignment);
      document.querySelector("#assignment-details").showModal();
    },
    indexAssignments: function() {
      axios.get("/api/assignments").then(response => {
        console.log("asignments index", response);
        this.assignments = response.data;
      });
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
  },
};
</script>
