<template>
  <mdb-navbar
    color="white"
    class="lighten-4 blue-grey-text top-nav"
    hamburger
    navIconClass="blue-grey-text"
    expand="xl"
    position="top"
    light
  >
    <mdb-navbar-brand>Chore Tracker</mdb-navbar-brand>
    <mdb-navbar-toggler target="nav-collapse">
      <mdb-navbar-nav right>
        <mdb-nav-item href="/" waves-fixed>Dashboard</mdb-nav-item>
        <mdb-nav-item href="/signup" waves-fixed>Signup</mdb-nav-item>
        <mdb-nav-item href="/login" waves-fixed>Login</mdb-nav-item>
        <mdb-nav-item href="/logout" waves-fixed>Logout</mdb-nav-item>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>
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
