<template>
  <div id="app">
    <TopNav />
    <div class="main-container">
      <mdb-row>
        <router-view />
      </mdb-row>
    </div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

$image-path: "~@/../mdb/mdbvue/img";
@import "~@/../mdb/mdbvue/scss/mdb-free.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  max-width: 100vw;
}

.component-title {
  font-size: 2em;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import TopNav from "./components/TopNav";
import { mdbRow } from "mdbvue";

export default {
  components: {
    TopNav,
    mdbRow,
  },
};
</script>
