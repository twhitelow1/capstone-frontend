<template>
  <mdb-row class="home m-0 grey lighten-2" style="min-height:inherit;">
    <mdb-col sm="3" class="p-0">
      <LeftNavigation v-bind:currentUser="currentUser" />
    </mdb-col>
    <mdb-col sm="9" class="pt-5">
      <mdb-row>
        <pure-vue-chart
          :points="[
            { label: currentUser.first_name, value: currentUser.points },
            { label: currentUser.housemates[0].first_name, value: currentUser.housemates[0].points },
            { label: currentUser.housemates[1].first_name, value: currentUser.housemates[1].points },
          ]"
          :width="500"
          :height="300"
          :show-y-axis="true"
          :show-x-axis="true"
          :show-values="true"
          class="my-5 mx-auto"
        />
      </mdb-row>
      <mdb-row>
        <mdb-col>
          <div class="pt-5">
            <div class="card card-cascade narrower">
              <div class="px-4">
                <div class="table-wrapper">
                  <!--Table-->
                  <mdb-tbl class="table table-hover mb-0" responsive>
                    <mdb-tbl-head>
                      <tr>
                        <th class="th-lg assignment-row"><h4 class="h4">Name</h4></th>
                        <th class="th-lg"><h4 class="h4">Points</h4></th>
                      </tr>
                    </mdb-tbl-head>
                    <mdb-tbl-body>
                      <tr>
                        <td class="align-middle user-row">{{ currentUser.first_name }}</td>
                        <td class="align-middle user-row">{{ currentUser.points }}</td>
                      </tr>
                      <tr
                        v-for="user in currentUser.housemates"
                        :key="`assign-${user.id}`"
                        scope="row"
                        class="text-center user-row"
                      >
                        <td class="align-middle user-row">
                          <p>{{ user.first_name }}</p>
                        </td>
                        <td class="align-middle user-row">
                          <p>{{ user.points }}</p>
                        </td>
                      </tr>
                    </mdb-tbl-body>
                  </mdb-tbl>
                </div>
              </div>
            </div>
          </div>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col class="col-xl-6">
          <!-- <ChoresList v-bind:chores="chores" />
        </mdb-col>
        <mdb-col class="col-xl-6">
          <ChoresList v-bind:chores="chores" /> -->
        </mdb-col>
      </mdb-row>
    </mdb-col>
  </mdb-row>
</template>

<style>
body {
  font-family: "Nunito", sans-serif;
}
.col {
  padding: 0;
}
.main-container {
  padding: 50px 0px 0px 0px;
  width: 100%;
  max-width: 100vw;
  margin: 0;
  min-height: 100vh;
}
.chart {
  margin: 80px auto;
  display: block;
  color: black;
}
</style>

<script>
import axios from "axios";
import LeftNavigation from "../components/LeftNavigation";
import { mdbCol, mdbRow, mdbTbl, mdbTblHead, mdbTblBody } from "mdbvue";
// import BarChart from "../components/BarChart";
import PureVueChart from "pure-vue-chart";

export default {
  components: {
    mdbCol,
    PureVueChart,
    mdbRow,
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    LeftNavigation,
  },
  data: function () {
    return {
      users: [],
      currentUser: {},
    };
  },
  created: function () {
    this.indexUsers();
    this.getCurrentUser();
  },
  methods: {
    indexUsers: function () {
      axios.get("/api/users").then((response) => {
        console.log("users index", response);
        this.users = response.data;
      });
    },
    getCurrentUser: function () {
      axios.get("/api/users/current").then((response) => {
        console.log("current user", response);
        this.$store.commit("setCurrentUser", response.data);
        this.currentUser = response.data;
      });
    },
  },
};
</script>
