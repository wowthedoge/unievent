<template>
  <header class="app-header">
    <h1 class="logo-text"><span class="font-light">UNI</span><span class="font-bold">EVENT</span></h1>  </header>
</template>

<script setup>
// Script setup area is used for Composition API setup, importing components, etc.
import '../assets/theme.css'
</script>

<style scoped>
/* Scoped CSS for your header */
.app-header {
  background-color: var(--color-dark);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: 50px;
  padding-left: 40px;
}

.app-header .logo-text {
  color: var(--color-light);
  margin: 0; /* Removes default margins from the h1 element */
  line-height: 50px;
}

.app-header .logo-text {
  color: var(--color-light);
  margin: 0; /* Removes default margins from the h1 element */
  font-size: 24px; /* Fixed font size */
}

.font-light {
  font-weight: 300; /* Lighter font weight for "uni" */
}

.font-bold {
  font-weight: 700; /* Bolder font weight for "event" */
  color: var(--color-yellow);

}
</style>
