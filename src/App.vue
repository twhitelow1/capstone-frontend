<template>
  <div id="app">
    <mdb-navbar color="teal" class="mt-2 lighten-4" hamburger navIconClass="dark-teal-text" expand="xl">
      <mdb-navbar-brand href="/">Chore Tracker</mdb-navbar-brand>
      <mdb-navbar-toggler target="nav-collapse">
        <mdb-navbar-nav right>
          <mdb-nav-item href="/" waves-fixed>Home</mdb-nav-item>
          <mdb-nav-item href="/about" waves-fixed>About</mdb-nav-item>
          <mdb-nav-item href="/signup" waves-fixed>Signup</mdb-nav-item>
          <mdb-nav-item href="/login" waves-fixed>Login</mdb-nav-item>
          <mdb-nav-item href="/logout" waves-fixed>Logout</mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <router-view />
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
import { mdbNavbar, mdbNavItem, mdbNavbarNav, mdbNavbarToggler, mdbNavbarBrand } from "mdbvue";

export default {
  components: {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbNavbarBrand,
  },
};
</script>
