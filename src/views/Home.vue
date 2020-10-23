<template>
  <div class="home">
    <h1>Chores</h1>
    <h2>Add Chore</h2>
        Title: <input type="text" v-model="newChoreTitle" />
        Desc: <input type="text" v-model="newChoreDesc" />
        Frequency: <input type="text" v-model="newChoreFrequency" />
        Points You Can Earn: <input type="text" v-model="newChorePointsGain" />
        Points It Cost: <input type="text" v-model="newChorePointsPrice" />
        Room Id: <input type="text" v-model="newChoreRoomId" />
        <button v-on:click="createChore()">Create Chore</button>
    <h2>All Chores</h2>
    <div v-for="chore in chores" :key="chore.id">
      <p>Title: {{ chore.title }}</p>
      <p>desc: {{ chore.desc }}</p>
      <p>frequency: {{ chore.frequency }}</p>
      <p>last_completed: {{ chore.last_completed }}</p>
      <p>points_gain: {{ chore.points_gain }}</p>
      <p>points_price: {{ chore.points_price }}</p>
      <p>room_id: {{ chore.room_id }}</p>
      <br>
      <p>-----------------------------------------</p>
    </div>
    <h1>To Do List</h1>
    <div v-for="assignment in assignments" :key="assignment.id">
      <p>ID: {{ assignment.id }}</p>
      <p>user: {{ assignment.user.first_name }}</p>
      <p>chore: {{ assignment.chore.title }}</p>
      <p>-----------------------------------------</p>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      chores: [],
      assignments: [],
      newChoreDesc: "",
      newChoreTitle: "",
      newChoreFrequency: "",
      newChorePointsGain: "",
      newChorePointsPrice: "",
      newChoreRoomId: "",
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
        points_gain: this.newChorePointsGain,
        points_price: this.newChorePointsPrice,
        room_id: this.newChoreRoomId,
      };
      axios
        .post("/api/chores", params)
        .then(response => {
          console.log("chores create", response);
          this.chores.push(response.data);
          this.newChoreRoomId = "";
          this.newChoreDesc = "";
          this.newChoreTitle = "";
          this.newChoreFrequency = "";
          this.newChorePointsGain = "";
          this.newChorePointsPrice = "";
        })
        .catch(error => {
          console.log("chores create error", error.response);
        });
    },
  },
};
</script>
