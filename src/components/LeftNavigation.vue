<template>
  <div class="left-navigation pt-3 grey lighten-5">
    <div>
      <img
        src="https://todd.whitelow.tech/img/todd-face-square.png"
        alt="user profile image"
        class="img-fluid z-index mb-3 rounded-circle profile hoverable
        "
      />
      <h2>Todd Whitelow</h2>
      <p>Points: 5000</p>
    </div>
    <br />
    <div id="home-info">
      <h4 class="h4">Home Information</h4>
      <mdb-row class="py-2 px-3">
        <mdb-col col="2">
          <i class="fas fa-location-arrow fa-2x" alt="Address Icon" />
        </mdb-col>
        <mdb-col col="10">
          <p>
            2801 Basingdale
            <br />
            Vail, Co 81657
          </p>
        </mdb-col>
      </mdb-row>
      <div class="px-4">
        <h6 class="h6">Household Memebers</h6>
        <ul class="text-left">
          <li>Kiya</li>
          <li>Jason</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
import { mdbRow, mdbCol } from "mdbvue";

export default {
  components: {
    mdbRow,
    mdbCol,
  },
};
</script>