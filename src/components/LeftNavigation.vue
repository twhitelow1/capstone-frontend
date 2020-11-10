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
      <p>2801 Basingdale</p>
      <p>Vail, Co 81657</p>
      <br />
      <div>
        <h5 class="h5">Household Memebers</h5>
        <ul>
          <li>Kiya</li>
          <li>Jason</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
