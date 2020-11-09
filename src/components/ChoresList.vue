<template>
  <div class="chores-list">
    <h2>Assign A Chore</h2>
    <mdb-container fluid>
      <mdb-row align-h="center">
        <mdb-col>
          <mdb-card v-for="(chore, index) in chores" :key="index">
            <p>Chore Name: {{ chore.title }}</p>
            <p>Last Time Completed: {{ chore.last_completed }}</p>
            <p>Room: {{ chore.room.name }}</p>
            <mdb-btn>Assign Chore</mdb-btn>
            <mdb-btn @click="modal = true">More Info</mdb-btn>

            <mdb-modal :show="modal" @close="modal = false">
              <mdb-modal-header>
                <mdb-modal-title>Chore Info</mdb-modal-title>
              </mdb-modal-header>
              <mdb-modal-body>
                <p>Chore Name: {{ chore.title }}</p>
                <p>Description: {{ chore.desc }}</p>
                <p>How often does the chore need to be done: {{ chore.frequency }} day(s)</p>
                <p>Last Time Completed: {{ chore.last_completed }}</p>
                <p>Earn: {{ chore.points_gain }} points</p>
                <p>Cost To Get Someone Else To Do It: {{ chore.points_price }} points</p>
                <p>Room: {{ chore.room.name }}</p>
              </mdb-modal-body>
              <mdb-modal-footer>
                <mdb-btn color="secondary" @click="modal = false">Close</mdb-btn>
                <mdb-btn color="primary">Save changes</mdb-btn>
              </mdb-modal-footer>
            </mdb-modal>
            <!-- <dialog id="chore-details">
              <form method="dialog">
                <h1>Chore Info</h1>
                <p>Chore Name: {{ chore.title }}</p>
                <p>Description: {{ chore.desc }}</p>
                <p>How often does the chore need to be done: {{ chore.frequency }} day(s)</p>
                <p>Last Time Completed: {{ chore.last_completed }}</p>
                <p>Earn: {{ chore.points_gain }} points</p>
                <p>Cost To Get Someone Else To Do It: {{ chore.points_price }} points</p>
                <p>Room: {{ chore.room.name }}</p>
                <b-button>Close</b-button>
              </form>
            </dialog> -->
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<style scoped>
.chores-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.chores-list .card {
  margin: 0.5em;
}
.chores-list h2 {
  text-align: center;
}
</style>

<script>
import axios from "axios";
import {
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbBtn,
  mdbCard,
  mdbContainer,
  mdbRow,
  mdbCol,
} from "mdbvue";

export default {
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
    mdbCard,
    mdbContainer,
    mdbRow,
    mdbCol,
  },
  data: function() {
    return {
      chores: [],
      users: [],
      currentAssignment: { user: {}, chore: {} },
      currentChore: { room: {} },
      grabbedUser: {},
      visibility: "active",
      modal: false,
    };
  },
  created: function() {
    this.indexChores();
    this.indexUsers();
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
    indexUsers: function() {
      axios.get("/api/users").then(response => {
        console.log("users index", response);
        this.users = response.data;
      });
    },
  },
};
</script>
