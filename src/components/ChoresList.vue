<template>
  <div class="assignments-list pt-5">
    <div class="card card-cascade narrower">
      <!-- <AssignmentsTableHeader v-bind:chores="chores" /> -->
      <!--Card image-->
      <div
        class="view view-cascade default-color-dark narrower w-100 p-3 mx-0 mb-3 d-flex justify-content-between align-items-center"
        style="border-radius:5px 5px 0 0;"
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
        </div>
        <div class="flex-column text-white">
          <a href="" class="white-text mx-3 h4">Chores Manager</a>
        </div>
        <div>
          <div>
            <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
              <i class="fas fa-pencil-alt mt-0"></i>
            </button>
            <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
              <i class="fas fa-times mt-0"></i>
            </button>
          </div>
        </div>
      </div>
      <!--/Card image-->
      <div class="px-4">
        <div class="table-wrapper">
          <!--Table-->
          <table class="table table-hover mb-0" responsive>
            <thead>
              <tr>
                <th class="th-lg">Chore</th>
                <th class="th-lg">Frequency</th>
                <th class="th-lg">Points Earn</th>
                <th class="th-lg">Points Cost</th>
                <th class="th-lg">Room</th>
                <th class="th-lg">Assigned?</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="chore in chores" :key="`chore-${chore.id}`" scope="row" @click="modal = true">
                <td>{{ chore.title }}</td>
                <td>{{ chore.frequency }} hours</td>
                <td>{{ chore.points_gain }}</td>
                <td>{{ chore.points_price }}</td>
                <td>{{ chore.room_name }}</td>
                <td>{{ chore.assigned }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chores-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.chore-col {
  padding: 0;
}
.chores-list .card {
  padding: 0.5em;
  margin: 1em;
}
.chores-list h2 {
  text-align: center;
}
</style>

<script>
import axios from "axios";
import { mdbTooltip } from "mdbvue";

export default {
  components: {
    // mdbModal,
    // mdbModalHeader,
    // mdbModalTitle,
    // mdbModalBody,
    // mdbModalFooter,
    // mdbBtn,
    mdbTooltip,
  },
  data: function() {
    return {
      chores: [],
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
      this.modal = true;
    },
    getCompletedAssignments: function() {
      this.indexAssignments();
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
