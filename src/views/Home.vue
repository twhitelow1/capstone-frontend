<template>
  <div class="home">
    <h1>To Do List</h1>
    <div v-for="assignment in assignments" :key="`assign-${assignment.id}`">
      <p>ID: {{ assignment.id }}</p>
      <p>user: {{ assignment.user.first_name }}</p>
      <p>chore: {{ assignment.chore.title }}</p>
      <p>Date Due: {{ assignment.due_date }} </p>
      <button>Complete</button>
      <p>-----------------------------------------</p>
    </div>
    <h2>Assign A Chore</h2>
    <div v-for="(chore, index) in chores" :key="index">
      <p>Title: {{ chore.title }}</p>
      <p>desc: {{ chore.desc }}</p>
      <p>frequency: {{ chore.frequency }} days</p>
      <p>last_completed: {{ chore.last_completed }}</p>
      <p>points_gain: {{ chore.points_gain }}</p>
      <p>points_price: {{ chore.points_price }}</p>
      <p>room_id: {{ chore.room_id }}</p>
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
