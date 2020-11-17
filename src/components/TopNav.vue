<template>
  <mdb-navbar
    color="default-color-dark"
    class="darken-4 top-nav"
    hamburger
    navIconClass="blue-grey-text"
    expand="xl"
    position="top"
    dark
  >
    <mdb-navbar-brand class="h1"><b style="font-size:1.5em;">Chore Tracker</b></mdb-navbar-brand>
    <mdb-navbar-toggler target="nav-collapse">
      <mdb-navbar-nav right>
        <mdb-nav-item href="/" waves-fixed>Dashboard</mdb-nav-item>
        <mdb-nav-item href="/leaderboard" waves-fixed>Leaderboard</mdb-nav-item>
        <mdb-nav-item v-if="!isLoggedIn()" href="/signup" waves-fixed>Signup</mdb-nav-item>
        <mdb-nav-item v-if="!isLoggedIn()" href="/login" waves-fixed>Login</mdb-nav-item>
        <mdb-nav-item v-if="isLoggedIn()" href="/logout" waves-fixed>Logout</mdb-nav-item>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>
<script>
import { mdbNavbar, mdbNavItem, mdbNavbarNav, mdbNavbarToggler, mdbNavbarBrand } from "mdbvue";

export default {
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
  },
  components: {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbNavbarBrand,
  },
};
</script>
