<template>
  <div class="left-navigation pt-3 grey lighten-5">
    <div>
      <img
        v-bind:src="currentUser.profile_img_url"
        alt="user profile image"
        class="img-fluid z-index mb-3 rounded-circle profile hoverable"
        style="max-width:70%"
      />
      <h2 class="h2-responsive pb-2">{{ currentUser.first_name }} {{ currentUser.last_name }}</h2>
      <h3 class="h3-responsive ">
        Points:
        <span class="text-dark">{{ currentUser.points }}</span>
      </h3>
    </div>
    <br />
    <div id="home-info">
      <div class="px-4">
        <mdb-card class="my-3">
          <h3 class="h3-responsive py-3">Home Information</h3>
          <mdb-row class="py-2 px-xl-4 px-lg-3 px-md-2 justify-content-center">
            <mdb-col col="1">
              <i style="font-size: 2.3vw; font-weight: bold;" class="fas fa-location-arrow fa-2x" alt="Address Icon" />
            </mdb-col>
            <mdb-col col="9">
              <p style="font-weight: bold; font-size:18px;">
                {{ currentUser.home.addr_street }} {{ currentUser.home.addr_unit }}
                <br />
                {{ currentUser.home.addr_city }} {{ currentUser.home.addr_state }} {{ currentUser.home.addr_zip }}
              </p>
            </mdb-col>
          </mdb-row>
        </mdb-card>
      </div>
      <div class="px-4">
        <div class="text-left flex-row">
          <mdb-card class="my-3">
            <h3 class="h3-responsive text-center py-3 px-2">Household Memebers</h3>
            <div v-for="(housemate, index) in currentUser.housemates" :key="index" class="row p-2 align-items-center">
              <div class="col">
                <img
                  :src="housemate.profile_img_url"
                  :alt="`${housemate.first_name}'s profile picture`"
                  class="img-fluid justify-content-center z-index mb-3 rounded-circle profile hoverable"
                  style="max-width:100%;"
                />
              </div>
              <div class="col-8">
                <h4 class="h4-responsive mb-1" id="housemate-name">
                  {{ housemate.first_name }} {{ housemate.last_name }}
                </h4>
                <h6 class="h6-responsive">(555) 555 - 5555</h6>
                <h6 class="h6-responsive">{{ housemate.points }} Points</h6>
              </div>
            </div>
          </mdb-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#housemate-name {
  text-transform: capitalize;
}
i {
  color: #00695c;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #00695c;
  font-weight: 600;
}
.left-navigation {
  height: 100%;
  margin: 0;
}

img.profile {
  max-width: 70%;
}

.left-navigation p {
  text-align: left;
  padding: 0.2em 1.2em;
}
</style>

<script>
import { mdbRow, mdbCol, mdbCard } from "mdbvue";

export default {
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
  },
  props: {
    currentUser: Object,
  },
};
</script>
