<template>
  <mdb-navbar color="teal" class="lighten-4 top-nav" hamburger navIconClass="dark-teal-text" expand="xl" position="top">
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
