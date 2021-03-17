<template>
  <BasicLayout>
    <h2>Estamos en Categorías</h2>
  </BasicLayout>
</template>

<script>
import BasicLayout from "../Layouts/BasicLayout";

export default {
  name: "Category",

  components: {
    BasicLayout,
  },

  watch: {
    $route(to, from) {
      console.log(to);
    },
  },
};
</script>

<style></style>
