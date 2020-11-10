<template>
  <div class="left-navigation pt-3 grey lighten-5">
    <div>
      <img
        src="https://todd.whitelow.tech/img/todd-face-square.png"
        alt="user profile image"
        class="img-fluid z-index mb-3 rounded-circle profile hoverable"
        style="max-width:70%"
      />
      <h2 class="h2-responsive pb-2">Todd Whitelow</h2>
      <h3 class="h3-responsive ">
        Points:
        <span class="text-dark">5000</span>
      </h3>
    </div>
    <br />
    <div id="home-info">
      <h4 class="h4-responsive">Home Information</h4>
      <mdb-row class="py-2 justify-content-md-center">
        <mdb-col col="1">
          <i class="fas fa-location-arrow fa-2x pl-2" alt="Address Icon" />
        </mdb-col>
        <mdb-col col="11">
          <p class="h5-responsive">
            2801 Basingdale
            <br />
            Vail, Co 81657
          </p>
        </mdb-col>
      </mdb-row>
      <div class="px-4">
        <h4 class="h4-responsive">Household Memebers</h4>
        <div class="text-left flex-row">
          <mdb-card class="my-3">
            <div class="row p-2 align-items-center">
              <div class="col">
                <img
                  src="https://todd.whitelow.tech/img/todd-face-square.png"
                  class="img-fluid justify-content-center z-index mb-3 rounded-circle profile hoverable"
                  style="max-width:100%;"
                />
              </div>
              <div class="col-8">
                <h4 class="h4-responsive mb-1">Kiya Law</h4>
                <h6 class="h6-responsive">(555) 555 - 5555</h6>
                <h6 class="h6-responsive">2300 Points</h6>
              </div>
            </div>
          </mdb-card>
          <mdb-card class="my-3">
            <div class="row p-2 align-items-center">
              <div class="col">
                <img
                  src="https://todd.whitelow.tech/img/todd-face-square.png"
                  class="img-fluid justify-content-center mt-2 z-index mb-3 rounded-circle profile hoverable"
                  style="max-width:100%;"
                />
              </div>
              <div class="col-8">
                <h4 class="h4-responsive mb-1">Jason Grant</h4>
                <h6 class="h6-responsive">(555) 555 - 5555</h6>
                <h6 class="h6-responsive">4000 Points</h6>

              </div>
            </div>
          </mdb-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
};
</script>